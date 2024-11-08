// src/components/ProductList.js
import React, { useState, useEffect, useRef } from 'react';
import Rating from './ProductRating'; // Asegúrate de importar el componente de Rating
import productService from '../services/ProductService'; // Importamos el servicio
import '../styles/ProductList.css'

const ProductList = () => {
    // Declara el estado de los productos dentro de ProductList
    const [products, setProducts] = useState([]);
    const productListRef = useRef(null);
    const [imageIndices, setImageIndices] = useState({});

    // Usa useEffect para obtener los productos al montar ProductList
    useEffect(() => {
        const fetchProducts = async () => {

            const data = await productService.getProducts();
            const filteredData = data
                .filter(product => product.imageResources.length > 1 || product.discountPercentage !== "")
                .sort((b, a) => b.name.localeCompare(a.name));
            setProducts(filteredData);
            //console.log(filteredData);

            // Inicializa imageIndices con índice 0 para cada producto
            const initialIndices = {};
            filteredData.forEach(product => {
                if (product.imageResources.length > 1) {
                    initialIndices[product.id] = 0;
                }
            });
            setImageIndices(initialIndices);
        };

        fetchProducts();
    }, []); // Solo se ejecuta al montar ProductList

    useEffect(() => {
        // Configura el intervalo para cambiar la imagen cada 7 segundos
        const intervalId = setInterval(() => {
            setImageIndices(prevIndices => {
                const newIndices = { ...prevIndices };
                products.forEach(product => {
                    if (product.imageResources.length > 1) {
                        newIndices[product.id] = (prevIndices[product.id] + 1) % product.imageResources.length;
                    }
                });
                return newIndices;
            });
        }, 5000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [products]);


    // Función para desplazar la lista a la derecha
    const scrollRight = () => {
        if (productListRef.current) {
            console.log('Scroll Right triggered');
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
            console.log('Scroll Left triggered');
            productListRef.current.scrollBy({
                left: -300, 
                behavior: 'smooth'
            });
        } else {
            console.error('productListRef is not defined');
        }
    };

    // Formato de moneda
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
        }).format(value);
    };


    return (
        <div className="cont">
            <button className="arrow left" onClick={scrollLeft}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <div className='pr-cont' ref={productListRef}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className='pr-card' key={product.id}>
                            <h3 className='product-name'>{product.name}</h3>
                            <img src={product.imageResources[imageIndices[product.id] || 0]} alt={product.name} style={{ width: '100%', height: '180px' }} />
                            <p style={{ margin: '6px 2px', fontSize: '0.8rem' }}>Categoria: {product.category}</p>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {product.discountPercentage !== "" ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through', color: 'red', margin: '6px 2px', fontSize: '1rem' }}>
                                            Antes: {formatCurrency(product.normalPrice)}
                                        </span>
                                        <span style={{ fontWeight: 'bold', color: 'green', fontSize: '1.2rem', margin: '6px 2px' }}>
                                            Ahora: {formatCurrency(product.dealPrice)}
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
    );
};

export default ProductList;
