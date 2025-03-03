// src/components/Header.js
import React from 'react';
import Drawer from './Drawer';
import Cart from './Cart';
import SearchBar from './SearchBar';
import '../styles/NavBar.css'

function Header() {

    return (
        <nav className="navbar">
            <Drawer/>
            <SearchBar />
            <Cart/>
        </nav>
    );
}

export default Header;
