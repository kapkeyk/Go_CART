import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/Context.jsx';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <CartProvider>
      <Router>
        <App /> 
      </Router>
    </CartProvider>
  </ThemeProvider>

)


