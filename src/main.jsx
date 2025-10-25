import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Error from './pages/Error.jsx'
import { AdminDataProvider } from './context/AdminDataProvider.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}>
    <AuthContextProvider>
      <AdminDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AdminDataProvider>
    </AuthContextProvider>  
    </ErrorBoundary>
  </StrictMode>,
)
