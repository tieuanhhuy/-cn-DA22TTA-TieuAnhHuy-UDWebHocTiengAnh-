// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// THÊM DÒNG NÀY
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* THÊM BrowserRouter BAO QUANH App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)