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

    return (
        <div className="top-selling-gallery">
        {products.length > 0 ? (
            products.map((product, index) => (
                <div key={product.id} className={`product ${index === currentIndex ? 'active' : ''}`}>
                    <h2>{product.name}</h2>
                    <p>Categoria: {product.category}</p>
                    <img src={product.imageResources} alt={product.name} style={{ width: '100px', height: '100px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {product.discountPercentage !== "" ? (
                            <>
                                <span style={{ textDecoration: 'line-through', color: 'red', marginRight: '10px' }}>
                                    {product.normalPrice} CLP
                                </span>
                                <span style={{ fontWeight: 'bold', color: 'green' }}>
                                    {product.dealPrice} CLP
                                </span>
                                <span style={{ color: 'blue', marginLeft: '10px' }}>
                                    (-{product.discountPercentage} de descuento)
                                </span>
                            </>
                        ) : (
                            <span style={{ fontWeight: 'bold', color: 'black' }}>{product.normalPrice} CLP</span>
                        )}
                    </div>
                    <Rating rating={product.rating} />
                </div>
            ))
        ) : (
            <p>Cargando productos...</p>
        )}
    </div>
    );
};

export default TopSellingGallery;
