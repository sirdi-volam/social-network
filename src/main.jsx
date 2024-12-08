import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/styles/index.css'
import './src/styles/reset.css'
import './src/styles/normalize.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
