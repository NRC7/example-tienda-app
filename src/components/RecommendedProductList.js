import React, { useState, useEffect, useRef, useMemo } from 'react';
import Rating from './ProductRating'; // Importar el componente de Rating
import '../styles/ProductList.css'
import { sanitizeCategory } from '../util/SanitizeCategory';
import { handleAddToCart } from '../handlers/CartHandler';
import { useNavigate } from "react-router-dom";
import { formatCurrency } from '../util/FormatCurrency';

const RecommendedProductList = ({ productList }) => {

    const CHANGE_IMAGE_INTERVAL = 5000 // Configura el intervalo para cambiar la imagen cada x milisegundos

    const productListRef = useRef(null);
    const [imageIndices, setImageIndices] = useState({});

    const navigate = useNavigate();

    const filteredProducts = useMemo(() => {
        return productList
            .filter(product => product.discountPercentage !== "")
            .sort((b, a) => b.name.localeCompare(a.name));
    }, [productList]);

    useEffect(() => {
        const initialIndices = {};
        filteredProducts.forEach(product => {
            if (product.imageResources.length > 1) {
                initialIndices[product.sku] = 0;
            }
        });
        setImageIndices(initialIndices);
    }, [filteredProducts]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndices(prevIndices => {
                const newIndices = { ...prevIndices };
                filteredProducts.forEach(product => {
                    if (product.imageResources.length > 1 && product.imageResources.length <= 2) {
                        newIndices[product.sku] = (prevIndices[product.sku] + 1) % product.imageResources.length;
                    }
                });
                return newIndices;
            });
        }, CHANGE_IMAGE_INTERVAL);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [filteredProducts]);


    // Función para desplazar la lista a la derecha
    const scrollRight = () => {
        if (productListRef.current) {
            productListRef.current.scrollBy({
                left: 300, 
                behavior: 'smooth'
            });
        } else {
            console.error('productListRef is not defined');
        }
    };

    // Función para desplazar la lista a la izquierda
    const scrollLeft = () => {
        if (productListRef.current) {
            productListRef.current.scrollBy({
                left: -300, 
                behavior: 'smooth'
            });
        } else {
            console.error('productListRef is not defined');
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0px' }} >Disfruta estas ofertas seleccionadas para ti</h2>
            <div className="cont">
                <button className="arrow left" onClick={scrollLeft}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className='pr-cont' ref={productListRef}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className='pr-card' key={product.sku} >
                                <h3 onClick={() =>  navigate(`/products/${product.category}/${product.subCategory}/${product.sku}`, { state: { product: product } })}
                                className='product-name'>{product.name}</h3>
                                <img onClick={() =>  navigate(`/products/${product.category}/${product.subCategory}/${product.sku}`, { state: { product: product } })}
                                 src={product.imageResources[imageIndices[product.sku] || 0]} alt={product.name} style={{ width: '100%', height: '180px' }} />
                                <p style={{ margin: '6px 2px', fontSize: '0.8rem' }}>Categoria: {sanitizeCategory(product.category)}</p>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {product.discountPercentage !== "" ? (
                                        <>
                                            <span style={{ textDecoration: 'line-through', color: 'red', margin: '6px 2px', fontSize: '1rem' }}>
                                                Antes: {formatCurrency(product.normalPrice)}
                                            </span>
                                            <span style={{ fontWeight: 'bold', color: 'green', fontSize: '1.2rem', margin: '6px 2px' }}>
                                                Oferta: {formatCurrency(product.dealPrice)}
                                            </span>
                                            <span style={{ color: 'black', margin: '6px 2px', fontSize: '1rem', }}>
                                                ({product.discountPercentage} de desct.)
                                            </span>
                                        </>
                                            ) : (
                                                // Muestra solo el normalPrice si no hay descuento
                                                <span style={{ fontWeight: 'bold', color: 'black', fontSize: '1.3rem', margin: '20px 2px' }}>{formatCurrency(product.normalPrice)}</span>
                                            )}
                                        </div>
                                        {/* Mostrar las estrellas de calificación */}
                                        <Rating rating={product.rating}></Rating>
                                        <button onClick={() => handleAddToCart(product, 1)}>
                                            Añadir al carro
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>Cargando productos...</p>
                            )}
                </div>
                <button className="arrow right" onClick={scrollRight}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        
    );
};

export default RecommendedProductList;
