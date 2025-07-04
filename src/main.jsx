import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {

  RouterProvider,
} from "react-router"
import { router } from './Router/router.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';
import 'aos/dist/aos.css';
import Aos from 'aos'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
Aos.init()
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
    
  </StrictMode>,
)
