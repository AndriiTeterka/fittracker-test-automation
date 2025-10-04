import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import './index.css'

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
    },
    mutations: {
      retry: false,
    },
  },
})

// Enable test mode in development/test
if (import.meta.env.DEV || import.meta.env.VITE_TEST_MODE) {
  // Add test data attributes to document for easier testing
  document.documentElement.setAttribute('data-testmode', 'true')
  
  // Add global test utilities
  ;(window as any).__TEST_UTILS__ = {
    queryClient,
    clearCache: () => queryClient.clear(),
    resetApp: () => {
      queryClient.clear()
      localStorage.clear()
      sessionStorage.clear()
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster 
            position="top-right"
            data-testid="toast-container"
            richColors
            closeButton
          />
        </AuthProvider>
      </BrowserRouter>
      {import.meta.env.DEV && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  </React.StrictMode>,
)