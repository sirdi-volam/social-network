import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import StoreProvider from './app/providers/StoreProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <App />
  </StoreProvider>
)
