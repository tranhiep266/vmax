# TechHub Mobile Store

## Overview

TechHub is a full-stack e-commerce web application built for selling mobile phones and accessories. The application provides a modern shopping experience with product browsing, cart management, and responsive design. It uses a monolithic architecture with separate client and server code, sharing type definitions through a common schema.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: Zustand for cart state with persistence
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for database operations
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Development**: Separate development and production environments with Vite integration for HMR
- **Session Management**: Session-based cart tracking using UUID

### Data Storage Solutions
- **Database Schema**: 
  - Products table with comprehensive product information (name, price, category, brand, specifications)
  - Cart items table with session-based tracking
  - Shared schema definitions using drizzle-zod for validation
- **In-Memory Storage**: Fallback storage implementation for development/testing
- **Data Validation**: Zod schemas for runtime type checking

### Authentication and Authorization
- **Session Management**: UUID-based session tracking stored in browser localStorage
- **Cart Persistence**: Session-based cart management without user accounts
- **No Authentication**: Current implementation uses anonymous sessions

### API Architecture
- **RESTful API**: Standard HTTP methods for CRUD operations
- **Endpoints**:
  - GET /api/products - Product listing with filtering
  - GET /api/products/:id - Individual product details
  - GET/POST/PATCH/DELETE /api/cart/* - Cart management
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Request Logging**: Development logging for API requests with response times

## External Dependencies

### Third-Party Services
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **Image Hosting**: Unsplash for product images
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)

### Key Libraries
- **UI Framework**: React + TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **State Management**: Zustand with persistence middleware
- **HTTP Client**: Native fetch with TanStack Query wrapper
- **Styling**: Tailwind CSS + Radix UI components
- **Development Tools**: Vite, ESBuild, PostCSS

### Build and Deployment
- **Build Tool**: Vite for frontend, ESBuild for backend
- **Package Manager**: npm with lock file for reproducible builds
- **Development Environment**: Replit-specific plugins and configurations
- **Production Build**: Separate build processes for client and server code