import React, { useState, useEffect } from 'react';
import Rating from './ProductRating'; // Asegúrate de importar el componente de Rating
import productService from '../services/ProductService'; // Importamos el servicio
import '../styles/TopSellingStyle.css'

const TopSellingGallery = () => {

    const [products, setProducts] = useState([]);

    // Estado para el índice del producto visible
    const [currentIndex, setCurrentIndex] = useState(0); 

    // Cambiar el producto visible cada 10 segundos
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await productService.getProducts();
            const topSellingProducts = data.filter(product => product.rating === 5);
            setProducts(topSellingProducts);
            //console.log(topSellingProducts);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                products.length > 0 ? (prevIndex + 1) % products.length : 0
            );
        }, 7000);

        // Limpiamos el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [products]);

    // Navegación con flechas
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

     // Formato de moneda
     const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
        }).format(value);
    };

    return (
        <div >
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Lo mejor de la semana</h2>
            <div className="top-selling-gallery">
                <button className="arrow left" onClick={handlePrev}>
                    <i className="fas fa-chevron-left"></i>
                </button>

                    {/* Contenedor para el producto */}
                    <div className="product-container">
                        <div className="product-image">
                            <img 
                                src={products[currentIndex]?.imageResources} 
                                alt={products[currentIndex]?.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="product-info">
                            <h3 style={{ margin: '6px 2px', fontSize: '1.8rem' }}>{products[currentIndex]?.name}</h3>
                            {products[currentIndex]?.discountPercentage !== "" ? (
                                <>
                                    <span style={{ textDecoration: 'line-through', margin: '6px 2px', fontSize: '1rem' }}>
                                        Antes: {formatCurrency(products[currentIndex]?.normalPrice)}
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: 'green', fontSize: '1.4rem', margin: '6px 2px' }}>
                                        Ahora: {formatCurrency(products[currentIndex]?.dealPrice)}
                                    </span>
                                    <span style={{ color: 'black', margin: '6px 2px', fontSize: '1.1rem', }}>
                                        ({products[currentIndex]?.discountPercentage} de desct.)
                                    </span>
                                </>
                            ) : (
                                <span style={{ fontWeight: 'bold', color: 'black', fontSize: '1.3rem', margin: '20px 2px' }}>{formatCurrency(products[currentIndex]?.normalPrice)}</span>
                            )}
                            <p style={{ margin: '6px 2px', fontSize: '0.9rem' }}>Categoria: {products[currentIndex]?.category}</p>
                            {/* Mostrar las estrellas de calificación */}
                            
                        </div>
                    </div>

                <button className="arrow right" onClick={handleNext}>
                    <i className="fas fa-chevron-right"></i>
                </button>
                <div className="dots">
                    {products.map((_, index) => (
                        <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} />
                    ))}
                </div>  
            </div>
        </div>
    );
};

export default TopSellingGallery;
