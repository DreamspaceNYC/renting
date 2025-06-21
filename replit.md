# RentRushNYC Application

## Overview

RentRushNYC is a full-stack NYC rental property platform built with a React frontend and Express.js backend. The application allows users to search, filter, and browse real rental properties across NYC's five boroughs. It features a modern UI built with shadcn/ui components and uses PostgreSQL for data persistence through Drizzle ORM with authentic NYC rental listings.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom NYC-themed color palette
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Uses connect-pg-simple for PostgreSQL-backed sessions
- **API**: RESTful API with structured error handling and logging

### Key Components

#### Database Schema
The application uses a well-structured PostgreSQL schema with the following main entities:
- **Users**: User accounts with authentication credentials
- **Properties**: Core rental property data including location, pricing, and features
- **Amenities**: Reusable amenity definitions with categories
- **Property Amenities**: Many-to-many relationship between properties and amenities
- **Inquiries**: Contact form submissions from potential renters
- **Saved Properties**: User favorites/bookmarks

#### Frontend Pages & Components
- **Home Page**: Main search interface with hero section, search bar, filters, and property grid
- **Property Detail**: Individual property pages with detailed information and contact forms
- **Search & Filter System**: Advanced filtering by location, price, bedrooms, property type, and amenities
- **Property Grid**: Responsive grid layout with card-based property displays
- **Contact Modal**: Inquiry form for property contact requests

#### API Endpoints
- `GET /api/properties` - Property search with filtering, sorting, and pagination
- `GET /api/properties/:id` - Individual property details
- `POST /api/properties/:id/inquiries` - Submit property inquiries
- `GET /api/neighborhoods` - List available neighborhoods

## Data Flow

1. **Property Search**: Users interact with search bar and filters → Frontend sends API request with query parameters → Backend queries database with Drizzle ORM → Returns paginated results
2. **Property Details**: User clicks property card → Navigate to detail page → Fetch individual property data → Display comprehensive property information
3. **Contact Inquiries**: User fills contact form → Submit inquiry via API → Store in database → Send confirmation to user

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Zod schema validation
- **UI Library**: Radix UI primitives via shadcn/ui
- **HTTP Client**: Native fetch API with TanStack Query
- **Styling**: Tailwind CSS with PostCSS

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Code Quality**: ESBuild for production builds

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

### Development Environment
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16 module
- **Development Server**: Runs on port 5000 with Vite dev server
- **Hot Reload**: Enabled for both frontend and backend development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets in production
- **Database Migrations**: Drizzle handles schema migrations

### Environment Configuration
- **Database**: Uses `DATABASE_URL` environment variable for PostgreSQL connection
- **Session Storage**: PostgreSQL-backed sessions for user state
- **File Structure**: Monorepo structure with shared schema between frontend and backend

## Changelog

```
Changelog:
- June 21, 2025: Initial setup of RentRushNYC
- June 21, 2025: Built complete rental platform with real NYC property data
- June 21, 2025: Added 16 authentic NYC rental listings across all boroughs
- June 21, 2025: Implemented search, filtering, and property detail functionality
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```