# FitTracker - Test Automation Learning Platform

A comprehensive fitness tracking application designed specifically for test automation engineers to practice with Playwright, REST Assured, and Appium.

## 🎯 Purpose

This application serves as a realistic testing environment featuring:
- **Web UI Testing** with Playwright
- **API Testing** with REST Assured
- **Mobile Testing** with Appium
- **Cross-platform Testing** scenarios

## 🏗️ Architecture

```
FitTracker/
├── backend/           # Supabase configuration and API docs
├── frontend/          # React web application
├── mobile/           # React Native mobile app (future)
├── docs/             # API documentation and guides
├── test-data/        # Sample data for testing
└── deployment/       # Docker and deployment configs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/AndriiTeterka/fittracker-test-automation.git
cd fittracker-test-automation
```

### 2. Backend Setup (Supabase)
```bash
cd backend
npm install
# Follow backend/README.md for Supabase configuration
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application
- **Web App**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs
- **Supabase Dashboard**: https://app.supabase.com

## 🧪 Testing Features

### UI Testing Elements
- ✅ Forms with validation
- ✅ Dynamic tables with pagination
- ✅ Modal dialogs
- ✅ Dropdown menus
- ✅ Search and filters
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design

### API Testing Scenarios
- ✅ CRUD operations
- ✅ Authentication flows
- ✅ Data validation
- ✅ Error responses
- ✅ Pagination
- ✅ Search and filtering

### User Roles
- **Regular User**: Basic workout tracking
- **Admin**: User management and system settings

## 📱 Test Data

Pre-configured test users:
- **Admin**: admin@fittracker.com / Admin123!
- **User1**: john.doe@fittracker.com / User123!
- **User2**: jane.smith@fittracker.com / User123!

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Testing Guide](./docs/testing-guide.md)
- [Deployment Guide](./docs/deployment.md)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS
- React Query for API calls
- React Hook Form for form handling

**Backend:**
- Supabase (PostgreSQL + Auth + Storage)
- REST API with automatic documentation

**Testing Ready:**
- Playwright test selectors
- API endpoint documentation
- Mobile-responsive design
- Comprehensive error scenarios

## 🔄 Development Workflow

1. **Feature Development**: Create feature branch
2. **Testing**: Run automated tests
3. **Code Review**: Submit pull request
4. **Deployment**: Merge to main

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run unit tests

# Testing
npm run test:playwright  # Run Playwright tests
npm run test:api         # Run API tests
npm run test:mobile      # Run mobile tests
```

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features for testing
- Improve test scenarios
- Enhance documentation
- Report issues

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy Testing! 🚀**