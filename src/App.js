import React from 'react'
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css'; 
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Pizza from './Pages/Pizza';
import Biryani from './Pages/Biryani';
import Starters from './Pages/Starters';
import { CartProvider } from './CartContext';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';

function App() {
  return (
    <div data-theme="synthwave">
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element=<Home /> />
        <Route path="/signup" element=<Signup /> />
        <Route path="/login" element=<Login/> />
        <Route path="/pizzas" element=<Pizza/> />
        <Route path="/biryani" element=<Biryani/> />
        <Route path="/starters" element=<Starters/> />
        <Route path="/success" element=<Success/> />
        <Route path="/cancel" element=<Cancel/> />
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </div>
  )
}

export default App
