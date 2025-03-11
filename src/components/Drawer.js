import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { sanitizeCategory } from '../util/SanitizeCategory';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/Drawer.css';


const Drawer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const location = useLocation();

  const categories = [
    { name: "gamers", subcategories: ["consolas", "monitores_gamer", "sillas_gamer", "notebook_gamer"] },
    { name: "computacion", subcategories: ["computadores", "mouse", "teclados"] },
    { name: "componentes_pc", subcategories: ["almacenamiento", "memoria_ram", "procesadores", "tarjeta_video"] },
    { name: "audio", subcategories: ["audifonos","microfonos", "audifonos_gamer"] }
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleProducts = () => {
    setOpenProducts(!openProducts);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false); // Cierra el diálogo después del login
  };

  const handleLoginClose = () => {
    setIsAuthenticated(false);
    setShowLogin(false); // Cierra el diálogo después del login
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  const handleRegisterClose = () => {
    setShowRegister(false);
  };

  return (
    <>
      <div className="drawer-icon drawer-toggle" onClick={toggleDrawer}>
        <i className="fa fa-bars"></i>
      </div>

      <div className={`drawer-drawer ${!isOpen ? 'open' : ''}`}>
        {/* Encabezado del carrito */}
        <div className="drawer-drawer-heading">
            <Link to={'/'}> MarketPlace</Link>
            <div className="close-drawer" onClick={toggleDrawer}>
                <i className="fa fa-times"></i>
            </div>
        </div>

        {/* Contenido del carrito con scroll */}
        <div className="drawer-content">

            <div className='drawer-content-product' onClick={toggleProducts}>
                <Link to={'/products'} 
                > Productos
                </Link>
                {!openProducts ? (
                    <i className="fa fa-chevron-down"></i>
                ):
                    <i className="fa fa-chevron-up"></i>
                }
            </div>

            {openProducts && (
                <div className='drawer-content-categories'>
                {categories.map((category) => (
                    <div key={category.name}>
                        <Link to={`/products/${category.name}`} 
                            state={{category: category.name, label: `Todos los productos en ${sanitizeCategory(category.name)}`}}
                        > {sanitizeCategory(category.name)}
                        </Link>
                        <div className='drawer-content-subcategories'>
                            {category.subcategories.map((sub) => (
                                <div className='subcategories-link' key={sub}>
                                    <Link to={`/products/${category.name}/${sub}`} 
                                        state={{category:category.name, subCategory: sub, label: `Todos los productos en ${sanitizeCategory(sub)}`}}
                                    > {sanitizeCategory(sub)}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
            )}
            
            <span>Politica de devoluciones</span>

            <span>Nosotros</span>
            
            {isAuthenticated && <span>Mi cuenta</span>}
        </div>

        {/* Resumen al fondo */}
          <div className="drawer-summary">
            {isAuthenticated ?
             <button className="drawer-button" onClick={() => {setIsAuthenticated(false)}}>Cerrar sesion</button>
            : (
              <>
                <button className="drawer-button" onClick={() => {setShowRegister(true)}}>Crear tu cuenta</button>
                <button className="drawer-button" onClick={() => {setShowLogin(true)}}>Iniciar sesion</button>
              </>
            )}
            
          </div>

      </div>

      {showLogin && <Login onLoginSuccess={handleLoginSuccess} onLoginClose={handleLoginClose} />}
      {showRegister && <Register onRegisterSuccess={handleRegisterSuccess} onRegisterClose={handleRegisterClose} />}
    </>
  );
};

export default Drawer;
