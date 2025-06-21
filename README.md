# RentRushNYC

A modern, full-stack NYC rental property platform built with React, Express.js, and PostgreSQL.

![RentRushNYC](https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400)

## Features

- **Real Property Listings**: Browse authentic NYC rental properties across all 5 boroughs
- **Advanced Search**: Filter by location, price range, bedrooms, and property type
- **Interactive Maps**: Explore neighborhoods with walk scores and transit access
- **Property Details**: Comprehensive property information with high-quality images
- **Contact System**: Direct inquiry forms for property interest
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for state management
- **shadcn/ui** component library
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **Neon Database** for serverless PostgreSQL

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rentrushnyx
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
DATABASE_URL=your_postgresql_connection_string
```

4. Push database schema:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

Visit `http://localhost:5000` to see the application.

## Deployment

### Netlify (Recommended)
1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/public` folder to Netlify via drag-and-drop or Git integration.

### Other Platforms
- **Vercel**: Connect your Git repository for automatic deployments
- **Railway**: Full-stack deployment with PostgreSQL included
- **Render**: Deploy both frontend and backend services

## Database Schema

The application uses the following main entities:
- **Properties**: Rental listings with location, pricing, and details
- **Users**: User accounts and authentication
- **Inquiries**: Contact form submissions
- **Amenities**: Property features and amenities
- **Saved Properties**: User favorites

## API Endpoints

- `GET /api/properties` - List properties with filtering
- `GET /api/properties/:id` - Get property details
- `POST /api/properties/:id/inquiries` - Submit property inquiry
- `GET /api/neighborhoods` - List available neighborhoods
- `GET /api/boroughs` - List NYC boroughs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Contact

For questions or support, please open an issue on GitHub.