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
    const [error, setError] = useState(false); // Indicador de error

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCachedProducts();
                //setProducts(data);
                // Si la respuesta es válida, asignamos los productos
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    throw new Error("Error fetching products.");
                }
            } catch (error) {
                console.log('Error fetching products:', error);
                setProducts([]); // En caso de error, se pasa una lista vacía
                setError(true); // Establecemos el estado de error
            } finally {
                setLoading(false); // Deja de cargar independientemente del resultado
            }
        };
        fetchData();
    }, []);

    if (loading) {
        // Muestra un indicador de carga mientras los datos no están disponibles
        return <div className="loading" style={{ textAlign: 'center', marginTop: '200px', fontSize: '18px', color: '#333' }}>Cargando productos...</div>;
    }

    if (error) {
        // Si hay error, no mostrar productos y mostrar un mensaje adecuado
        return <div style={{ textAlign: 'center', marginTop: '200px', fontSize: '18px', color: '#333' }}>No se pueden cargar los productos en este momento.</div>;
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

