import React, { useState, useEffect } from 'react';
import TopBannerGallery from '../components/TopBannerGallery';
import TopSellingGalery from '../components/TopSellingGalery';
import ProductList from '../components/ProductList';
import StoreInfo from '../components/StoreInfo';
import PurchasePopup from '../components/PurchasePopup';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
import '../styles/HomeStyle.css'
import { getCachedProducts } from '../util/CachedProducs';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Indicador de carga

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCachedProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Deja de cargar independientemente del resultado
            }
        };
        fetchData();
    }, []);

    if (loading) {
        // Muestra un indicador de carga mientras los datos no están disponibles
        return <div className="loading"></div>;
    }

    return (
        <main>
            <TopBannerGallery />
            <div className="container">
                <TopSellingGalery productList={products} />
                <ProductList productList={products} />
            </div>
            <PurchasePopup productList={products} />
            <StoreInfo />
            <ChatButton />
            <Footer />
        </main>
    );
};

export default Home;

