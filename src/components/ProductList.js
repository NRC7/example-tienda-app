// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import Rating from './ProductRating'; // Asegúrate de importar el componente de Rating
import productService from '../services/ProductService'; // Importamos el servicio

const ProductList = () => {
    // Declara el estado de los productos dentro de ProductList
    const [products, setProducts] = useState([]);

    // Usa useEffect para obtener los productos al montar ProductList
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await productService.getProducts();
            setProducts(data);
            //console.log(data);
        };

        fetchProducts();
    }, []); // Solo se ejecuta al montar ProductList

    return (
        <div>
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Categoria: {product.category}</p>
                        <img src={product.imageResources} alt={product.name} style={{ width: '100px', height: '100px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {product.discountPercentage !== "" ? (
                                <>
                                    {/* Muestra normalPrice tachado */}
                                    <span style={{ textDecoration: 'line-through', color: 'red', marginRight: '10px' }}>
                                        {product.normalPrice} CLP
                                    </span>
                                    {/* Muestra dealPrice y discountPercentage */}
                                    <span style={{ fontWeight: 'bold', color: 'green' }}>
                                        {product.dealPrice} CLP
                                    </span>
                                    <span style={{ color: 'blue', marginLeft: '10px' }}>
                                            (-{product.discountPercentage} de descuento)
                                    </span>
                                </>
                            ) : (
                                // Muestra solo el normalPrice si no hay descuento
                                <span style={{ fontWeight: 'bold', color: 'black' }}>{product.normalPrice} CLP</span>
                            )}
                        </div>
                        {/* Mostrar las estrellas de calificación */}
                        <Rating rating={product.rating} />
                    </div>
                ))
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
};

export default ProductList;
