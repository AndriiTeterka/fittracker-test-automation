# Frontend - React Application

React-based frontend application for FitTracker, designed for test automation learning.

## 🎯 Features

- **Modern React 18** with TypeScript
- **Responsive Design** with Tailwind CSS
- **State Management** with React Query
- **Form Handling** with React Hook Form
- **Testing Ready** with data-testid attributes
- **Demo Mode** for UI preview without backend

## 🚀 Quick Start

### Option 1: Demo Mode (No Supabase needed)

Run the frontend immediately to see the UI:

```bash
cd frontend
npm install

# Enable demo mode
cp .env.demo .env.local

# Start development server
npm run dev
```

**Demo Login Credentials:**
- Email: any email (e.g., `demo@fittracker.com`)
- Password: any password (e.g., `demo123`)

### Option 2: Full Setup (With Supabase)

For full functionality with real backend:

```bash
cd frontend
npm install

# Configure with your Supabase keys
cp .env.example .env.local
# Edit .env.local with your actual Supabase URL and keys

# Start development server
npm run dev
```

## 🎭 Demo Mode Features

When running in demo mode (`VITE_DEMO_MODE=true`):

✅ **UI Preview**: See all pages and components  
✅ **Mock Authentication**: Login with any credentials  
✅ **Sample Data**: Pre-populated workouts and exercises  
✅ **Interactive Forms**: All forms work (data not saved)  
✅ **Navigation**: Full app navigation available  
✅ **Responsive Design**: Test mobile and desktop layouts  

❌ **Limitations**: Data changes aren't persisted  
❌ **No Real API**: All responses are mocked  
❌ **No Real Auth**: Authentication is simulated  

## 📱 Application Structure

### Pages Available
- **Login/Register** (`/login`, `/register`)
- **Dashboard** (`/dashboard`) - Overview and stats
- **Workouts** (`/workouts`) - Workout management
- **Exercises** (`/exercises`) - Exercise library
- **Profile** (`/profile`) - User profile settings
- **Admin** (`/admin`) - Admin panel (admin role required)

### Key Components
- Forms with validation
- Data tables with sorting/filtering
- Modal dialogs
- Loading states
- Error handling
- Mobile-responsive navigation

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint check
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript check

# Testing
npm run test             # Unit tests
npm run test:ui          # Test with UI
npm run test:coverage    # Test coverage report

# E2E Testing (requires setup)
npm run test:playwright     # Playwright tests
npm run test:playwright:ui  # Playwright with UI
```

## 💻 Demo Mode Quick Test

After starting in demo mode:

1. **Visit**: http://localhost:3000
2. **Login**: Use any email/password (e.g., `demo@fittracker.com` / `demo123`)
3. **Explore**:
   - Dashboard with sample stats
   - Workouts page with demo workouts
   - Exercise library with sample exercises
   - Profile settings
   - Try creating/editing workouts (won't persist)

## 📁 Environment Configuration

### Demo Mode (.env.demo)
```bash
VITE_DEMO_MODE=true
VITE_TEST_MODE=true
NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=demo-key
```

### Production Mode (.env.example)
```bash
VITE_DEMO_MODE=false
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_real_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## 🧪 Testing Features

### UI Testing Elements
- All elements have `data-testid` attributes
- Form validation with error messages
- Loading states and spinners
- Modal dialogs and overlays
- Dropdown menus and selections
- Responsive breakpoint testing

### Test Data Available
- Sample user profiles
- Mock workout data with various statuses
- Exercise library with categories
- Form validation scenarios
- Error state demonstrations

## 🐛 Troubleshooting

### "Blank page or errors when starting"
1. Check you're in the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Copy environment file: `cp .env.demo .env.local`
4. Restart development server: `npm run dev`

### "Can't see any data"
1. Verify demo mode is enabled in `.env.local`:
   ```bash
   VITE_DEMO_MODE=true
   ```
2. Check browser console for demo mode messages
3. Try refreshing the page

### "Build errors"
1. Check TypeScript errors: `npm run type-check`
2. Check linting: `npm run lint`
3. Clear cache: `rm -rf node_modules/.vite`

### "Tests not working"
1. Install test dependencies: `npm install`
2. For Playwright: `npx playwright install`
3. Check test configuration in `playwright.config.ts`

## 📚 Additional Resources

- [React 18 Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Testing Guide](../docs/testing-guide.md)

## 🚀 Next Steps

After exploring the UI in demo mode:

1. **Set up Supabase**: Follow [Backend README](../backend/README.md)
2. **Configure real environment**: Copy `.env.example` to `.env.local`
3. **Test with real data**: Create accounts and workouts
4. **Start test automation**: Use [Testing Guide](../docs/testing-guide.md)

---

**Demo mode is perfect for:** 👀 Visualizing the UI, 🎭 Testing interactions, 📱 Responsive design testing, 🧪 Component functionality preview