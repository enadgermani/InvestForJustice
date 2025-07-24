# InvestForJustice - Ethical Investment Database

A comprehensive web application that provides transparent and ethical investment insights into global tech companies and ETF holdings, helping users make informed financial decisions aligned with their values.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 🌟 Overview

InvestForJustice is a powerful platform that tracks Israeli tech companies and their presence in global ETFs, enabling ethical investment decisions. The platform provides:

- **Company Database**: Comprehensive listing of Israeli tech companies across 12 categories
- **ETF Analysis**: Real-time analysis of 36,000+ ETFs with Palestinian-related holdings data
- **Ethical Alternatives**: Suggested alternatives for companies and investments
- **Search & Filtering**: Advanced real-time search across companies, ETFs, and providers
- **Holdings Analysis**: Detailed breakdown of ETF holdings with ethical investment metrics

## 🚀 Features

### 📊 Data Coverage
- **36,552+ ETFs** tracked across global exchanges
- **400+ Asset Management Providers** monitored
- **8+ Major Exchanges** including NYSE, NASDAQ, LSE, TASE
- **Real-time API Integration** for up-to-date information

### 🔍 Advanced Search
- Real-time search with 300ms debouncing
- Filter by provider, exchange, and investment category
- Dynamic result updates as users type
- Smart API switching between default and search results

### 📱 Responsive Design
- Mobile-first responsive interface
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive Web App capabilities

### 🏗️ Modern Architecture
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and production builds

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible UI primitives
- **TanStack Query** - Powerful data synchronization
- **Wouter** - Minimalist routing library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon library

### Development & Build
- **Vite** - Lightning-fast build tool
- **ESBuild** - Ultra-fast bundler
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking
- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation

### Backend (Development)
- **Express.js** - Minimal server for development
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Reliable database (via Neon)

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/investforjustice.git
cd investforjustice
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9001`

## 📁 Project Structure

```
investforjustice/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   └── *.tsx     # Custom components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Route components
│   │   └── main.tsx      # Application entry point
│   └── index.html        # HTML template
├── server/               # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database interface
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Building
npm run build           # Build for production
npm run preview         # Preview production build

# Type Checking
npm run type-check      # Run TypeScript compiler

# Database
npm run db:generate     # Generate database migrations
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Drizzle Studio
```

## 🌐 API Integration

The application integrates with several external APIs:

### ETF Data APIs
- **Worst ETFs**: `GET /api/worst_etfs` - Default ETF listings
- **Search**: `GET /api/search?q={query}&provider={provider}&exchange={exchange}` - Real-time search
- **ETF Holdings**: `GET /api/etf/{ticker}` - Individual ETF analysis
- **Exchanges**: `GET /api/exchanges` - Available exchanges
- **Families**: `GET /api/families` - Asset management providers

### Company Data
- **GitHub Integration**: Direct fetching from TechForPalestine repository
- **Stock Information**: Client-side mappings for major companies

## 🎨 UI Components

The application uses a comprehensive design system built on:

### Core Components
- **Cards**: Responsive container components
- **Buttons**: Various styles and states
- **Badges**: Status and category indicators
- **Forms**: Validated input components
- **Modals**: Overlay dialogs and sheets
- **Navigation**: Routing and breadcrumbs

### Advanced Components
- **Data Tables**: Sortable and filterable tables
- **Search Interface**: Real-time search with filters
- **Charts**: Data visualization (Recharts)
- **Loading States**: Skeleton components and spinners

## 🔍 Search Functionality

The search system provides powerful filtering capabilities:

```typescript
// Real-time search with debouncing
const { data: searchResults } = useETFSearch({
  q: searchTerm,           // Text query
  provider: selectedProvider, // Asset manager filter
  exchange: selectedExchange  // Exchange filter
}, hasSearchCriteria);
```

### Search Features
- **300ms Debouncing**: Prevents excessive API calls
- **Smart Switching**: Default data vs search results
- **Multiple Filters**: Combine text, provider, and exchange filters
- **Real-time Updates**: Immediate visual feedback

## 📱 Responsive Design

The application follows a mobile-first approach:

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- Fluid grid layouts
- Touch-optimized interactions
- Adaptive navigation
- Optimized typography scaling

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates optimized static files in the `dist/` directory.

### Deployment Options

#### Static Hosting
- Vercel, Netlify, or GitHub Pages
- Deploy the `dist/` folder
- Configure environment variables

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 9001
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions from the community!

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Testing
```bash
npm run test           # Run test suite
npm run test:coverage  # Generate coverage report
npm run lint           # Check code quality
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions, issues, or contributions:

- **Email**: ??
- **Issues**: [GitHub Issues](https://github.com/yourusername/investforjustice/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/investforjustice/discussions)

## 🎯 Roadmap

### Upcoming Features
- [ ] Advanced portfolio analysis tools
- [ ] Historical performance tracking
- [ ] Email alerts for ETF changes
- [ ] Multi-language support
- [ ] API rate limiting and caching improvements
- [ ] Enhanced mobile app features

### Long-term Goals
- Expand to 50,000+ ETFs
- Add mutual fund analysis
- Implement user accounts and watchlists
- Develop API for third-party integrations

## 📊 Project Statistics

- **Lines of Code**: ~15,000+
- **Components**: 50+ reusable components
- **API Endpoints**: 6+ external integrations
- **Database Tables**: 5+ normalized tables
- **Test Coverage**: 80%+ (target)

---

<div align="center">
  <h3>✊ Built for Justice, Transparency, and Ethical Investing</h3>
  <p>Help us make investment decisions more transparent and ethical.</p>
</div>
