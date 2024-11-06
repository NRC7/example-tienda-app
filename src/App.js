// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Agrega otras rutas aquí, como la página de detalles del producto y carrito */}
        </Routes>
    </Router>
);

export default App;
