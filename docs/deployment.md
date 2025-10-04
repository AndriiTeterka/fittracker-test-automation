# Deployment Guide - FitTracker

Complete deployment instructions for local development, staging, and production environments.

## 🚀 Quick Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git**
- **Supabase account**
- **Java 11+** (for API testing)
- **Docker** (optional, for containerized deployment)

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/AndriiTeterka/fittracker-test-automation.git
cd fittracker-test-automation

# Install dependencies
npm install
cd frontend && npm install && cd ..
```

### 2. Backend Setup (Supabase)

#### Create Supabase Project

1. Go to [Supabase](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: FitTracker Test Automation
   - **Database Password**: Generate a secure password
   - **Region**: Choose closest to your location
4. Wait for project creation (2-3 minutes)

#### Database Configuration

1. In Supabase Dashboard, go to **SQL Editor**
2. Execute the following scripts in order:
   ```bash
   # 1. Create tables and schema
   # Copy contents from backend/schema/01_create_tables.sql
   
   # 2. Enable Row Level Security
   # Copy contents from backend/schema/02_enable_rls.sql
   
   # 3. Create security policies
   # Copy contents from backend/schema/03_create_policies.sql
   
   # 4. Insert sample data
   # Copy contents from backend/schema/04_sample_data.sql
   ```

#### API Keys Configuration

1. Go to **Settings** > **API**
2. Copy the following keys:
   - **URL**: Your project URL
   - **anon/public key**: For client-side access
   - **service_role key**: For admin operations (keep secret!)

### 3. Frontend Configuration

```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# Replace with your actual Supabase values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Development settings
VITE_TEST_MODE=true
NEXT_PUBLIC_APP_ENV=development
```

### 4. Start Development Server

```bash
# Frontend
cd frontend
npm run dev

# Application will be available at:
# http://localhost:3000
```

## 🗺️ Environment Configurations

### Development Environment

```bash
# .env.local (Development)
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev_anon_key
NEXT_PUBLIC_APP_ENV=development
VITE_TEST_MODE=true
NEXT_PUBLIC_ENABLE_DEBUG_INFO=true
NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS=true
```

**Features:**
- Test mode indicators
- Debug information
- React Query DevTools
- Hot reload
- Detailed error messages

### Staging Environment

```bash
# .env.staging
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=staging_anon_key
NEXT_PUBLIC_APP_ENV=staging
VITE_TEST_MODE=true
NEXT_PUBLIC_ENABLE_DEBUG_INFO=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

**Features:**
- Production-like setup
- Test data available
- Performance monitoring
- Error tracking

### Production Environment

```bash
# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_anon_key
NEXT_PUBLIC_APP_ENV=production
VITE_TEST_MODE=false
NEXT_PUBLIC_ENABLE_DEBUG_INFO=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
```

**Features:**
- Optimized build
- Analytics enabled
- Error reporting
- Security hardened

## 📱 Docker Deployment

### Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    volumes:
      - ./frontend/.env.local:/app/.env.local:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
    restart: unless-stopped

volumes:
  ssl:
    driver: local
```

### Build and Deploy

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop services
docker-compose down
```

## ☁️ Cloud Deployment

### Vercel Deployment

1. **Connect Repository**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Select `frontend` as root directory

2. **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_APP_ENV=production
   ```

3. **Build Settings**:
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Netlify Deployment

1. **Site Configuration**:
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "frontend/dist"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables** in Netlify Dashboard:
   - Add all required environment variables
   - Enable build hooks for automatic deployments

### Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 📋 Testing Environment Setup

### Local Testing

```bash
# Install test dependencies
npm run test:install

# Run all tests
npm run test:all

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

### CI/CD Testing

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: |
          npm run test:unit
          npm run test:integration
          npm run test:e2e
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
```

### Test Data Setup

```bash
# Create test users
npm run setup:test-users

# Reset test data
npm run cleanup:test-data

# Seed sample data
npm run seed:sample-data
```

## 🔐 Security Configuration

### Environment Security

1. **Never commit `.env` files**
2. **Use different databases for each environment**
3. **Rotate API keys regularly**
4. **Enable database backups**
5. **Monitor API usage**

### Supabase Security

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Create security policies (see backend/schema/03_create_policies.sql)
```

### CORS Configuration

```typescript
// In Supabase Dashboard > Settings > API
// Add your domains to CORS origins:
{
  "origins": [
    "http://localhost:3000",
    "https://your-app.vercel.app",
    "https://your-domain.com"
  ]
}
```

## 📊 Monitoring and Logging

### Application Monitoring

```typescript
// utils/monitoring.ts
export const trackEvent = (event: string, properties?: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    analytics.track(event, properties)
  }
}

export const trackError = (error: Error, context?: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to error reporting service
    errorReporting.captureException(error, context)
  }
}
```

### Health Checks

```typescript
// pages/api/health.ts
export default function handler(req: Request, res: Response) {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.NEXT_PUBLIC_APP_VERSION,
    environment: process.env.NEXT_PUBLIC_APP_ENV
  }
  
  res.status(200).json(health)
}
```

### Database Monitoring

```sql
-- Monitor database performance in Supabase Dashboard
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public';
```

## 🚫 Troubleshooting

### Common Issues

**Issue**: `Module not found` errors
**Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Supabase connection errors
**Solution**: 
1. Check environment variables
2. Verify API keys
3. Check CORS settings
4. Ensure RLS policies allow access

**Issue**: Build failures
**Solution**:
1. Check TypeScript errors: `npm run type-check`
2. Check linting: `npm run lint`
3. Clear build cache: `npm run clean`

**Issue**: Test failures
**Solution**:
1. Reset test database: `npm run test:db:reset`
2. Check test data: `npm run test:data:verify`
3. Run tests in isolation: `npm run test:isolated`

### Debug Mode

```bash
# Enable debug logging
DEBUG=fittracker:* npm run dev

# Enable verbose test output
npm run test:verbose

# Enable performance profiling
npm run dev:profile
```

### Support

For deployment issues:
1. Check the [GitHub Issues](https://github.com/AndriiTeterka/fittracker-test-automation/issues)
2. Review the [API Documentation](./api.md)
3. Check [Testing Guide](./testing-guide.md)
4. Contact the development team

---

**Happy Deploying! 🎉**