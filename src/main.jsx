import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider, useAuth } from './AuthContext.jsx'; // Update this line in all affected files

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>

)
