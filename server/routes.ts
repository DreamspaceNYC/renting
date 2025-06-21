import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertPropertySchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";

const searchParamsSchema = z.object({
  location: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  propertyType: z.string().optional(),
  borough: z.string().optional(),
  neighborhood: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  sortBy: z.enum(['price', 'newest', 'bedrooms']).default('newest'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  // Get all properties with search and filtering
  app.get("/api/properties", async (req, res) => {
    try {
      const params = searchParamsSchema.parse(req.query);
      const { page, limit, ...filters } = params;
      const offset = (page - 1) * limit;

      const [properties, total] = await Promise.all([
        storage.getProperties(filters, limit, offset),
        storage.getPropertiesCount(filters)
      ]);

      res.json({
        properties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(400).json({ error: "Invalid search parameters" });
    }
  });

  // Get single property
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid property ID" });
      }

      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create property inquiry
  app.post("/api/properties/:id/inquiries", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      if (isNaN(propertyId)) {
        return res.status(400).json({ error: "Invalid property ID" });
      }

      const property = await storage.getProperty(propertyId);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      const inquiryData = insertInquirySchema.parse({
        ...req.body,
        propertyId
      });

      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error('Error creating inquiry:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get neighborhoods
  app.get("/api/neighborhoods", async (req, res) => {
    try {
      const neighborhoods = await storage.getNeighborhoods();
      res.json(neighborhoods);
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get boroughs
  app.get("/api/boroughs", async (req, res) => {
    try {
      const boroughs = await storage.getBoroughs();
      res.json(boroughs);
    } catch (error) {
      console.error('Error fetching boroughs:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get amenities
  app.get("/api/amenities", async (req, res) => {
    try {
      const amenities = await storage.getAmenities();
      res.json(amenities);
    } catch (error) {
      console.error('Error fetching amenities:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create property (admin functionality)
  app.post("/api/properties", async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error('Error creating property:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
