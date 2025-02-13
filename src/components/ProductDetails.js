import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css'
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import { useNavigate } from "react-router-dom";
import Rating from './ProductRating'; // Importar el componente de Rating


const ProductDetails = ({ selectedProduct }) => {

    useEffect(() => {
        const fetchData = async () => {
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const addProductAndNavigateHome = (selectedProduct) => {
        handleAddToCart(selectedProduct)
        navigate("/")
        alert("Producto agregado al carro!")
      };

    return (
        <div >
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0px' }}>Producto seleccionado</h2>

            <div className="top-selling-gallery">

                    {/* Contenedor para el producto */}
                    <div className="product-container">

                        <div className="product-image">
                            <img 
                                src={selectedProduct?.imageResources[0]} 
                                alt={selectedProduct?.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'scale-down' }} 
                            />
                        </div>
                        <div className="product-info">
                            <h3 style={{ margin: '6px 2px', fontSize: '1.8rem' }}>{selectedProduct?.name}</h3>
                            {selectedProduct?.discountPercentage !== "" ? (
                                <>
                                    <span style={{ textDecoration: 'line-through', color: 'red', margin: '6px 2px', fontSize: '1rem' }}>
                                        Antes: {formatCurrency(selectedProduct?.normalPrice)}
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: 'green', fontSize: '1.4rem', margin: '6px 2px' }}>
                                        Oferta: {formatCurrency(selectedProduct?.dealPrice)}
                                    </span>
                                    <span style={{ color: 'black', margin: '6px 2px', fontSize: '1.1rem', }}>
                                        ({selectedProduct?.discountPercentage} de desct.)
                                    </span>
                                </>
                            ) : (
                                <span style={{ fontWeight: 'bold', color: 'black', fontSize: '1.3rem', margin: '20px 2px' }}>{formatCurrency(selectedProduct?.normalPrice)}</span>
                            )}
                            <p style={{ margin: '6px 2px', fontSize: '0.9rem' }}>Categoria: {sanitizeCategory(selectedProduct?.category)}</p>
                            {/* Mostrar las estrellas de calificación */}
                            <Rating rating={selectedProduct?.rating}></Rating>
                            <button onClick={() =>addProductAndNavigateHome(selectedProduct)}>
                                Añadir al carro
                            </button>
                        </div>
                        
                    </div>

            </div>
        </div>
    )
};

export default ProductDetails;