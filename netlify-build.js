#!/usr/bin/env node

// Simple build script for Netlify deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building RentRushNYC for Netlify...');

// Build the client
console.log('Building client...');
execSync('npm run build:client', { stdio: 'inherit' });

// Create netlify functions directory
const functionsDir = path.join(__dirname, 'netlify', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Copy API routes as Netlify functions
const serverRoutes = `
const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

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
    
    if (path === '/properties') {
      // Return sample properties for demo
      const properties = [
        {
          id: 1,
          title: "Luxury 2BR in Midtown Manhattan",
          price: "4200.00",
          bedrooms: 2,
          bathrooms: "2.0",
          address: "350 W 42nd St, New York, NY 10036",
          neighborhood: "Midtown",
          borough: "Manhattan",
          propertyType: "apartment",
          imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          squareFeet: 1100,
          walkScore: 98,
          isActive: true
        }
      ];
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          properties,
          pagination: { page: 1, limit: 12, total: 1, pages: 1 }
        })
      };
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
`;

fs.writeFileSync(path.join(functionsDir, 'api.js'), serverRoutes);

console.log('Build complete! Ready for Netlify deployment.');