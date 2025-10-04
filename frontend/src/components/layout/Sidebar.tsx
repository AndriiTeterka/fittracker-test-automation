import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊', testId: 'nav-dashboard' },
  { name: 'Workouts', href: '/workouts', icon: '🏋️', testId: 'nav-workouts' },
  { name: 'Exercises', href: '/exercises', icon: '💪', testId: 'nav-exercises' },
  { name: 'Profile', href: '/profile', icon: '👤', testId: 'nav-profile' },
]

const adminNavigation = [
  { name: 'Admin Panel', href: '/admin', icon: '⚙️', testId: 'nav-admin' },
]

export function Sidebar() {
  const { isAdmin, isDemoMode } = useAuth()
  const location = useLocation()

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200" data-testid="sidebar">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900" data-testid="app-logo">
            FitTracker
          </span>
          {isDemoMode && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800" data-testid="demo-indicator">
              Demo
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1" data-testid="sidebar-nav">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={clsx(
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150'
              )}
              data-testid={item.testId}
            >
              <span className="mr-3 text-lg" aria-hidden="true">
                {item.icon}
              </span>
              {item.name}
              {isActive && (
                <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full" data-testid="active-indicator" />
              )}
            </NavLink>
          )
        })}
        
        {/* Admin Navigation */}
        {isAdmin && (
          <>
            <div className="border-t border-gray-200 my-4" />
            <div className="px-2 py-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide" data-testid="admin-section-title">
                Administration
              </p>
            </div>
            {adminNavigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href)
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    isActive
                      ? 'bg-red-50 text-red-700 border-r-2 border-red-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150'
                  )}
                  data-testid={item.testId}
                >
                  <span className="mr-3 text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.name}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-red-600 rounded-full" data-testid="admin-active-indicator" />
                  )}
                </NavLink>
              )
            })}
          </>
        )}
      </nav>

      {/* Bottom section - User info */}
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4" data-testid="user-info">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {user?.email?.[0]?.toUpperCase() || 'D'}
            </span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700" data-testid="user-display-name">
            {user?.user_metadata?.username || 'Demo User'}
          </p>
          <p className="text-xs text-gray-500" data-testid="user-email">
            {user?.email || 'demo@fittracker.com'}
          </p>
        </div>
      </div>
    </div>
  )
}