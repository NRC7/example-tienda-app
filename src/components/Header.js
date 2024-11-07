// src/components/Header.js
import React, { useState } from 'react';
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

            {/* Barra de búsqueda */}
            <div className="search-bar">
                <input type="text" placeholder="Buscar productos..." />
                <button className="search-button">
                    <i className="fa fa-search"></i> {/* Ícono decorativo */}
                </button>
            </div>

            {/* Enlace de sesión */}
            <div className="session-links">
                {isAuthenticated ? (
                    <a href="#logout" className="session-link" onClick={handleAuthClick}>
                        Cerrar sesión
                    </a>
                ) : (
                    <a href="#login" className="session-link" onClick={handleAuthClick}>
                        Iniciar sesión
                    </a>
                )}
            </div>

            {/* Icono de carrito */}
            <div className="cart-icon">
                <i className="fa fa-shopping-basket"></i> {/* Icono de carrito */}
            </div>
            
        </nav>
    );
}

export default Header;
