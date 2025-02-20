// src/components/Header.js
import React, { useState } from 'react';
import Cart from './Cart';
import SearchBar from './SearchBar';
import '../styles/NavBar.css'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAuthClick = () => {
        // Cambiar el estado de autenticación al hacer clic
        setIsAuthenticated(!isAuthenticated);
    };

    return (
        <nav className="navbar">
            {/* Menú hamburguesa */}
            <div className="hamburger" onClick={toggleMenu}>
                <i className="fa fa-bars"></i> {/* Aquí está el icono de Font Awesome */}
            </div>

            {/* Menú desplegable, si está abierto */}
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </div>
            )}

            <SearchBar />

            

            {/* Icono de carrito */}
            <Cart/>
            
        </nav>
    );
}

export default Header;
