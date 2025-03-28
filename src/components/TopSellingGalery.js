import React from 'react';
import '../styles/TopSellingStyle.css'
import ProductCarousel from './ProductCarousel';
import { useProductContext } from "../context/ProductContext";

const TopSellingGallery = () => {

    const { productsInContexts } = useProductContext();

    const CHANGE_INTERVAL = 7000 // Configura el intervalo para cambiar la imagen cada x milisegundos

    // const filteredProducts = productList?.filter(product => product.rating === 5)
    const filteredProducts = productsInContexts?.filter(product => product.rating === 5)
        .reduce((acc, product) => {
            // Si aún no hemos agregado dos productos para esta categoría
            if (!acc[product.category]) {
            acc[product.category] = [];
            }
        
            // Solo agregamos el producto si hay menos de dos en la categoría
            if (acc[product.category].length < 2) {
            acc[product.category].push(product);
            }
        
            return acc;
        }, {});

    const topSellingProducts = Object.values(filteredProducts).flat();    

    return (
        <div className='top-selling-carousel'>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0px' }}>Los más vistos & recién llegados</h2>
            <div className="top-selling-gallery">
                <ProductCarousel
                    isTopSelling={true}
                    products={topSellingProducts}
                    mHeight={'56vh'}
                    contWidth={'96%'}
                    autoplayEnabled={true}
                    autoplayInterval={CHANGE_INTERVAL}
                    loopEnabled={true}
                    slides={1}
                />
            </div>
        </div>
    );
};

export default TopSellingGallery;
