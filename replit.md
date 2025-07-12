# Replit.md

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) using TypeScript. The project implements a modern architecture with Drizzle ORM for database interactions, shadcn/ui components for the UI, and TanStack Query for state management. The application appears to be a content sharing tool that extracts and displays text from URL parameters.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Comprehensive set of accessible components from Radix UI

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with /api prefix

### Development Environment
- **Package Manager**: npm
- **Type Checking**: TypeScript with strict configuration
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Development Server**: Vite dev server with Express backend integration

## Key Components

### Database Schema
- **Users Table**: Basic user entity with id, username, and password fields
- **Drizzle Configuration**: Set up for PostgreSQL with migrations support
- **Type Safety**: Generated TypeScript types from schema

### Storage Layer
- **Interface**: IStorage interface defining CRUD operations
- **Implementation**: MemStorage class for in-memory storage (development)
- **Methods**: getUser, getUserByUsername, createUser

### Frontend Components
- **Home Page**: Content extraction and display functionality
- **UI Components**: Full suite of shadcn/ui components (buttons, cards, forms, etc.)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Built-in accessibility features via Radix UI

### API Infrastructure
- **Query Client**: Configured TanStack Query client with custom fetch functions
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Request Logging**: Middleware for API request logging

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle requests with /api prefix
3. **Storage Layer**: Controllers interact with storage interface
4. **Database**: Drizzle ORM manages PostgreSQL operations
5. **Response**: JSON responses sent back to client
6. **UI Updates**: TanStack Query manages cache and UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration tool

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Type Checking**: TypeScript compiler validates all code
4. **Database Migration**: Drizzle pushes schema changes

### Environment Configuration
- **Development**: Uses tsx for hot reloading and Vite dev server
- **Production**: Serves static files from Express server
- **Database**: Configured for Neon PostgreSQL with environment variables

### Scripts
- `npm run dev`: Start development server with hot reloading
- `npm run build`: Build both frontend and backend for production
- `npm run start`: Start production server
- `npm run db:push`: Push database schema changes