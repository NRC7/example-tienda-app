// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import 'font-awesome/css/font-awesome.min.css';


const App = () => (
    <Router>
        {/* Navbar */}
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Agrega otras rutas aquí, como la página de detalles del producto y carrito */}
            <Route path="/details" element={<Details />} />
        </Routes>
    </Router>
);

export default App;
