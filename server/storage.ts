import { 
  users, 
  properties, 
  amenities, 
  inquiries, 
  savedProperties,
  type User, 
  type InsertUser,
  type UpsertUser,
  type Property,
  type InsertProperty,
  type Amenity,
  type InsertAmenity,
  type Inquiry,
  type InsertInquiry,
  type SavedProperty,
  type InsertSavedProperty
} from "@shared/schema";
import { db } from "./db";
import { eq, and, ilike, gte, lte, inArray, sql, desc } from "drizzle-orm";

export interface PropertySearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  amenities?: string[];
  borough?: string;
  neighborhood?: string;
}

export interface IStorage {
  // Users (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Properties
  getProperty(id: number): Promise<Property | undefined>;
  getProperties(filters?: PropertySearchFilters, limit?: number, offset?: number): Promise<Property[]>;
  getPropertiesCount(filters?: PropertySearchFilters): Promise<number>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;

  // Amenities
  getAmenities(): Promise<Amenity[]>;
  createAmenity(amenity: InsertAmenity): Promise<Amenity>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiriesForProperty(propertyId: number): Promise<Inquiry[]>;

  // Saved Properties
  saveProperty(userId: number, propertyId: number): Promise<SavedProperty>;
  unsaveProperty(userId: number, propertyId: number): Promise<void>;
  getUserSavedProperties(userId: number): Promise<Property[]>;
  isPropertySaved(userId: number, propertyId: number): Promise<boolean>;

  // Neighborhoods
  getNeighborhoods(): Promise<string[]>;
  getBoroughs(): Promise<string[]>;
}

export class DatabaseStorage implements IStorage {
  // Users (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Properties
  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getProperties(filters?: PropertySearchFilters, limit = 50, offset = 0): Promise<Property[]> {
    const conditions = [eq(properties.isActive, true)];

    if (filters) {
      if (filters.location) {
        conditions.push(
          sql`(${properties.neighborhood} ILIKE ${`%${filters.location}%`} OR ${properties.borough} ILIKE ${`%${filters.location}%`} OR ${properties.address} ILIKE ${`%${filters.location}%`})`
        );
      }

      if (filters.minPrice) {
        conditions.push(gte(properties.price, filters.minPrice.toString()));
      }

      if (filters.maxPrice) {
        conditions.push(lte(properties.price, filters.maxPrice.toString()));
      }

      if (filters.bedrooms) {
        conditions.push(eq(properties.bedrooms, filters.bedrooms));
      }

      if (filters.propertyType) {
        conditions.push(eq(properties.propertyType, filters.propertyType));
      }

      if (filters.borough) {
        conditions.push(eq(properties.borough, filters.borough));
      }

      if (filters.neighborhood) {
        conditions.push(eq(properties.neighborhood, filters.neighborhood));
      }
    }

    return await db.select().from(properties)
      .where(and(...conditions))
      .orderBy(desc(properties.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPropertiesCount(filters?: PropertySearchFilters): Promise<number> {
    const conditions = [eq(properties.isActive, true)];

    if (filters) {
      if (filters.location) {
        conditions.push(
          sql`(${properties.neighborhood} ILIKE ${`%${filters.location}%`} OR ${properties.borough} ILIKE ${`%${filters.location}%`} OR ${properties.address} ILIKE ${`%${filters.location}%`})`
        );
      }

      if (filters.minPrice) {
        conditions.push(gte(properties.price, filters.minPrice.toString()));
      }

      if (filters.maxPrice) {
        conditions.push(lte(properties.price, filters.maxPrice.toString()));
      }

      if (filters.bedrooms) {
        conditions.push(eq(properties.bedrooms, filters.bedrooms));
      }

      if (filters.propertyType) {
        conditions.push(eq(properties.propertyType, filters.propertyType));
      }

      if (filters.borough) {
        conditions.push(eq(properties.borough, filters.borough));
      }

      if (filters.neighborhood) {
        conditions.push(eq(properties.neighborhood, filters.neighborhood));
      }
    }

    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(properties)
      .where(and(...conditions));
    return count;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async updateProperty(id: number, updateProperty: Partial<InsertProperty>): Promise<Property | undefined> {
    const [property] = await db
      .update(properties)
      .set(updateProperty)
      .where(eq(properties.id, id))
      .returning();
    return property || undefined;
  }

  // Amenities
  async getAmenities(): Promise<Amenity[]> {
    return await db.select().from(amenities);
  }

  async createAmenity(insertAmenity: InsertAmenity): Promise<Amenity> {
    const [amenity] = await db
      .insert(amenities)
      .values(insertAmenity)
      .returning();
    return amenity;
  }

  // Inquiries
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async getInquiriesForProperty(propertyId: number): Promise<Inquiry[]> {
    return await db.select().from(inquiries).where(eq(inquiries.propertyId, propertyId));
  }

  // Saved Properties
  async saveProperty(userId: number, propertyId: number): Promise<SavedProperty> {
    const [saved] = await db
      .insert(savedProperties)
      .values({ userId, propertyId })
      .returning();
    return saved;
  }

  async unsaveProperty(userId: number, propertyId: number): Promise<void> {
    await db.delete(savedProperties).where(
      and(eq(savedProperties.userId, userId), eq(savedProperties.propertyId, propertyId))
    );
  }

  async getUserSavedProperties(userId: number): Promise<Property[]> {
    const saved = await db
      .select({ property: properties })
      .from(savedProperties)
      .innerJoin(properties, eq(savedProperties.propertyId, properties.id))
      .where(eq(savedProperties.userId, userId));
    
    return saved.map(item => item.property);
  }

  async isPropertySaved(userId: number, propertyId: number): Promise<boolean> {
    const [saved] = await db
      .select()
      .from(savedProperties)
      .where(and(eq(savedProperties.userId, userId), eq(savedProperties.propertyId, propertyId)))
      .limit(1);
    
    return !!saved;
  }

  // Neighborhoods
  async getNeighborhoods(): Promise<string[]> {
    const result = await db
      .selectDistinct({ neighborhood: properties.neighborhood })
      .from(properties)
      .where(eq(properties.isActive, true));
    
    return result.map(item => item.neighborhood).filter(Boolean);
  }

  async getBoroughs(): Promise<string[]> {
    const result = await db
      .selectDistinct({ borough: properties.borough })
      .from(properties)
      .where(eq(properties.isActive, true));
    
    return result.map(item => item.borough).filter(Boolean);
  }
}

export const storage = new DatabaseStorage();
