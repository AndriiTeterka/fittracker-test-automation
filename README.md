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
- Supabase account (free)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/AndriiTeterka/fittracker-test-automation.git
cd fittracker-test-automation
```

### 2. Backend Setup (Supabase)
```bash
# The backend uses Supabase (cloud database)
# No traditional server setup required!

# Optional: Install Supabase CLI tools
cd backend
npm install  # This installs CLI tools only

# Main setup is done through Supabase web dashboard
# Follow backend/README.md for detailed instructions
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Configure environment (copy your Supabase keys)
cp .env.example .env.local
# Edit .env.local with your Supabase URL and keys

# Start development server
npm run dev
```

### 4. Access Application
- **Web App**: http://localhost:3000
- **Supabase Dashboard**: https://app.supabase.com (for database management)
- **API**: Auto-generated REST API through Supabase

### 5. Quick Test
Once running, you can login with test accounts:
- **Admin**: admin@fittracker.com / Admin123!
- **User**: john.doe@fittracker.com / User123!

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

Pre-configured test users (available after database setup):
- **Admin**: admin@fittracker.com / Admin123!
- **User1**: john.doe@fittracker.com / User123!
- **User2**: jane.smith@fittracker.com / User123!
- **Test**: test.user@fittracker.com / Test123!

## 📚 Documentation

- [Backend Setup (Supabase)](./backend/README.md) - **Start here!**
- [Frontend Setup](./frontend/README.md)
- [API Documentation](./docs/api.md)
- [Testing Guide](./docs/testing-guide.md) - Playwright, REST Assured, Appium examples
- [Deployment Guide](./docs/deployment.md)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS
- React Query for API calls
- React Hook Form for form handling
- Vite for fast development

**Backend:**
- Supabase (PostgreSQL + Auth + Storage)
- Auto-generated REST API
- Row Level Security (RLS)
- Real-time subscriptions

**Testing Ready:**
- Playwright test selectors
- API endpoint documentation
- Mobile-responsive design
- Comprehensive error scenarios
- Test data management utilities

## 🔄 Development Workflow

1. **Setup**: Follow backend and frontend README files
2. **Development**: Make changes and test locally
3. **Testing**: Run automated tests (when implemented)
4. **Documentation**: Update relevant docs

## 📦 Available Scripts

### Frontend Scripts
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run unit tests
npm run lint         # Check code quality
```

### Backend Scripts (Optional)
```bash
cd backend
npm run status       # Check Supabase connection
npm run generate:types  # Generate TypeScript types
npm run test:db      # Test database connection
```

### Testing Scripts (When implemented)
```bash
npm run test:playwright  # Run Playwright tests
npm run test:api         # Run API tests
npm run test:mobile      # Run mobile tests
```

## 🚨 Important Notes

- **Backend**: Uses Supabase (cloud database), not a traditional Node.js server
- **Environment**: Copy `.env.example` to `.env.local` and add your Supabase keys
- **Database**: Schema is set up through SQL scripts in Supabase dashboard
- **Test Data**: Sample data is included for immediate testing

## 🚫 Troubleshooting

### "npm install doesn't work in backend"
- This is normal! Backend uses Supabase (cloud service)
- Only install frontend dependencies: `cd frontend && npm install`
- Backend package.json contains CLI tools only

### "Application won't start"
1. Check you're in the frontend directory: `cd frontend`
2. Verify environment file: `cat .env.local`
3. Ensure Supabase project is active

### "Can't login with test users"
1. Run all SQL scripts in backend/schema/ folder
2. Check Supabase > Authentication > Users
3. Verify RLS policies are active

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new testing scenarios
- Improve UI components
- Enhance documentation
- Report issues
- Suggest features

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy Testing! 🚀**

**Need help?** Check the [Backend README](./backend/README.md) for detailed setup instructions.