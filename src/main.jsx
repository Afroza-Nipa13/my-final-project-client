import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  
  RouterProvider,
} from "react-router"
import { router } from './Router/router.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'
import 'aos/dist/aos.css'; 
import Aos from 'aos'
Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <div className='font-urbanist max-w-7xl mx-auto'>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </div>
  </StrictMode>,
)
