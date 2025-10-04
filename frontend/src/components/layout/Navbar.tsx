import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function Navbar() {
  const { user, signOut, loading, isDemoMode } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              data-testid="mobile-menu-button"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Center - Page title (hidden on mobile) */}
          <div className="hidden md:flex md:items-center">
            <h1 className="text-lg font-semibold text-gray-900" data-testid="page-title">
              FitTracker
            </h1>
            {isDemoMode && (
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800" data-testid="demo-badge">
                Demo Mode
              </span>
            )}
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative" data-testid="user-menu">
                <button
                  type="button"
                  className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  data-testid="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {user?.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>

                {userMenuOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    data-testid="user-menu-dropdown"
                  >
                    <div className="py-1" role="menu">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium" data-testid="user-email">
                          {user?.email || 'Demo User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isDemoMode ? 'Demo Mode' : 'User'}
                        </p>
                      </div>
                      
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        data-testid="profile-link"
                        onClick={(e) => {
                          e.preventDefault()
                          setUserMenuOpen(false)
                        }}
                      >
                        Your Profile
                      </a>
                      
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        data-testid="settings-link"
                        onClick={(e) => {
                          e.preventDefault()
                          setUserMenuOpen(false)
                        }}
                      >
                        Settings
                      </a>
                      
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleSignOut}
                        disabled={loading}
                        data-testid="sign-out-button"
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <LoadingSpinner size="sm" className="mr-2" />
                            Signing out...
                          </div>
                        ) : (
                          'Sign out'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserMenuOpen(false)}
          data-testid="menu-overlay"
        />
      )}
    </div>
  )
}