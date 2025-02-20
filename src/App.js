// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import 'font-awesome/css/font-awesome.min.css';


const App = () => (
    <Router>
        {/* Navbar */}
        <Header />
        {/* Rutas */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category/:subCategory/:sku" element={<Details />} />
            <Route path="/search/:userSearchTerms" element={<Search />}/>
        </Routes>
    </Router>
);

export default App;
