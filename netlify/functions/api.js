const { Pool, neonConfig } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { eq, and, sql, desc, gte, lte } = require('drizzle-orm');

// Configure WebSocket for serverless
if (typeof WebSocket === 'undefined') {
  neonConfig.webSocketConstructor = require('ws');
}

let db;
if (process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool });
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    
    if (path === '/properties' && method === 'GET') {
      if (db) {
        // Use real database if available
        const rawQuery = `
          SELECT id, title, description, address, neighborhood, borough, price, 
                 bedrooms, bathrooms, square_feet as "squareFeet", property_type as "propertyType",
                 image_url as "imageUrl", available_date as "availableDate", walk_score as "walkScore",
                 transit_score as "transitScore", latitude, longitude, is_active as "isActive", 
                 created_at as "createdAt"
          FROM properties 
          WHERE is_active = true 
          ORDER BY created_at DESC 
          LIMIT 12
        `;
        
        const result = await db.execute(sql.raw(rawQuery));
        const properties = result.rows || [];
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            properties,
            pagination: { page: 1, limit: 12, total: properties.length, pages: 1 }
          })
        };
      }
    }
    
    if (path.startsWith('/properties/') && method === 'GET') {
      const id = path.split('/')[2];
      
      if (db) {
        const rawQuery = `
          SELECT id, title, description, address, neighborhood, borough, price, 
                 bedrooms, bathrooms, square_feet as "squareFeet", property_type as "propertyType",
                 image_url as "imageUrl", available_date as "availableDate", walk_score as "walkScore",
                 transit_score as "transitScore", latitude, longitude, is_active as "isActive", 
                 created_at as "createdAt"
          FROM properties 
          WHERE id = $1 AND is_active = true
        `;
        
        const result = await db.execute(sql.raw(rawQuery, [parseInt(id)]));
        const property = result.rows?.[0];
        
        if (property) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(property)
          };
        }
      }
      
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Property not found' })
      };
    }
    
    if (path === '/neighborhoods' && method === 'GET') {
      if (db) {
        const rawQuery = `
          SELECT DISTINCT neighborhood 
          FROM properties 
          WHERE is_active = true AND neighborhood IS NOT NULL
          ORDER BY neighborhood
        `;
        
        const result = await db.execute(sql.raw(rawQuery));
        const neighborhoods = result.rows?.map(row => row.neighborhood) || [];
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(neighborhoods)
        };
      }
    }
    
    if (path === '/boroughs' && method === 'GET') {
      if (db) {
        const rawQuery = `
          SELECT DISTINCT borough 
          FROM properties 
          WHERE is_active = true AND borough IS NOT NULL
          ORDER BY borough
        `;
        
        const result = await db.execute(sql.raw(rawQuery));
        const boroughs = result.rows?.map(row => row.borough) || [];
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(boroughs)
        };
      }
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };
    
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};