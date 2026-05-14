import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1a1a1a',
              color: '#e5e7eb',
              border: '1px solid #2a2a2a',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#1a1a1a' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#1a1a1a' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
