# 🚨 Troubleshooting Guide - FitTracker

## Quick Fix for "localhost:3000 not found" Error

### ✅ **Step-by-Step Solution**

#### 1. **Verify Location**
```bash
# Make sure you're in the right directory
pwd
# Should show: /path/to/fittracker-test-automation

ls
# Should show: backend/ frontend/ docs/ test-data/ README.md
```

#### 2. **Navigate to Frontend**
```bash
cd frontend
pwd
# Should show: /path/to/fittracker-test-automation/frontend

ls
# Should show: package.json src/ public/ index.html
```

#### 3. **Install Dependencies**
```bash
npm install
# Wait for installation to complete (may take 2-3 minutes)
```

#### 4. **Setup Environment**
```bash
# Copy demo environment
cp .env.demo .env.local

# Verify the file was created
cat .env.local
# Should show: VITE_DEMO_MODE=true and other settings
```

#### 5. **Start Development Server**
```bash
npm run dev
```

**Expected Output:**
```
  VITE v4.5.0  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

#### 6. **Test the Application**
- Open browser to: http://localhost:3000
- Should see FitTracker login page
- Login with: `demo@fittracker.com` / `demo123`

---

## 🔍 **Common Issues & Solutions**

### Issue 1: "Command not found: npm"
**Problem**: Node.js not installed  
**Solution**:
```bash
# Install Node.js (choose one method)

# Method 1: Download from website
# Go to https://nodejs.org and download LTS version

# Method 2: Using package manager (macOS)
brew install node

# Method 3: Using package manager (Ubuntu)
sudo apt install nodejs npm

# Verify installation
node --version  # Should show v18.x.x or higher
npm --version   # Should show 8.x.x or higher
```

### Issue 2: "npm install" fails
**Problem**: Permission or cache issues  
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still fails, delete node_modules and try again
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: "Port 3000 already in use"
**Problem**: Another app using port 3000  
**Solution**:
```bash
# Option 1: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
npm run dev -- --port 3001
# Then visit http://localhost:3001
```

### Issue 4: "Module not found" errors
**Problem**: Missing dependencies or path issues  
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check if you're in frontend directory
pwd
# Should end with: /frontend
```

### Issue 5: "Cannot read property of undefined"
**Problem**: Missing environment variables  
**Solution**:
```bash
# Ensure .env.local exists in frontend directory
ls -la .env.local

# If missing, copy from demo
cp .env.demo .env.local

# Verify contents
cat .env.local
```

### Issue 6: Blank white page
**Problem**: JavaScript errors preventing load  
**Solution**:
```bash
# Open browser console (F12) and check for errors
# Common fixes:

# 1. Clear browser cache (Ctrl+Shift+R)
# 2. Restart development server
npm run dev

# 3. Check terminal for build errors
```

### Issue 7: "TypeScript errors"
**Problem**: Type checking issues  
**Solution**:
```bash
# Check TypeScript configuration
npm run type-check

# If errors, they're usually in component imports
# Check that all files exist and imports are correct
```

---

## 🔧 **Debug Commands**

### Check System Requirements
```bash
# Node.js version (must be 18+)
node --version

# npm version (must be 8+)
npm --version

# Operating system
uname -a  # Linux/macOS
systeminfo  # Windows
```

### Verify Project Structure
```bash
# From project root
find . -name "package.json" -type f
# Should show: ./frontend/package.json and ./backend/package.json

# Check if main files exist
ls frontend/src/main.tsx
ls frontend/index.html
ls frontend/package.json
```

### Check Network and Ports
```bash
# Check what's running on port 3000
lsof -i :3000

# Check available ports
netstat -tulpn | grep :300
```

### Verbose Logging
```bash
# Run with debug output
DEBUG=* npm run dev

# Or just Vite debug
DEBUG=vite:* npm run dev
```

---

## 🆘 **Emergency Reset**

If nothing works, try a complete reset:

```bash
# 1. Go to project root
cd /path/to/fittracker-test-automation

# 2. Fresh clone (backup your changes first!)
git stash  # Save any changes
git pull origin main  # Get latest updates

# 3. Clean install
cd frontend
rm -rf node_modules package-lock.json .env.local
npm install

# 4. Setup demo mode
cp .env.demo .env.local

# 5. Start fresh
npm run dev
```

---

## 📊 **Diagnostic Checklist**

Before asking for help, verify:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] In correct directory (`pwd` shows .../frontend)
- [ ] Dependencies installed (`ls node_modules` shows folders)
- [ ] Environment file exists (`ls .env.local`)
- [ ] Port 3000 available (`lsof -i :3000` shows nothing)
- [ ] No terminal errors when running `npm run dev`
- [ ] Browser console shows no JavaScript errors (F12)

---

## 💬 **Getting Help**

If you're still stuck:

1. **Check the error message** in terminal/browser console
2. **Search GitHub Issues**: https://github.com/AndriiTeterka/fittracker-test-automation/issues
3. **Create new issue** with:
   - Your operating system
   - Node.js and npm versions
   - Complete error message
   - Steps you've already tried

---

## ✅ **Success Indicators**

You know it's working when:

- ✅ Terminal shows "Local: http://localhost:3000"
- ✅ Browser loads FitTracker login page
- ✅ No errors in browser console (F12)
- ✅ Can login with `demo@fittracker.com` / `demo123`
- ✅ Can navigate to dashboard and see demo data

**Once working**: You'll see a fully functional fitness app with demo data! 🎉