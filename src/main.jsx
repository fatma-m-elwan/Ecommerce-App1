import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import CartContextProvider from './Context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <CartContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
  </CartContextProvider>
  </TokenContextProvider>
)
