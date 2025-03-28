// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import Categories from './pages/Categories';
import SubCategories from './pages/SubCategories';
import AllProducts from './pages/AllProducts';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import 'font-awesome/css/font-awesome.min.css';


const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category/:subCategory/:sku" element={<Details />} />
            <Route path="/search/:userSearchTerms" element={<Search />}/>
            <Route path="/products/:category" element={<Categories />}/>
            <Route path="/products/:category/:subCategory" element={<SubCategories />}/>
            <Route path="/products" element={<AllProducts />}/>
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    </Router>
);

export default App;
