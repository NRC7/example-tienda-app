import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TopBannerGallery from '../components/TopBannerGallery';
import TopSellingGalery from '../components/TopSellingGalery';
import RecommendedProductList from '../components/RecommendedProductList';
import StoreInfo from '../components/StoreInfo';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
import { useProductContext } from "../context/ProductContext";
import '../styles/HomeStyle.css'

const Home = () => {

    const { productsInContexts } = useProductContext();

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        document.body.style.marginTop = "80px";
        if (productsInContexts.length > 0   ) {
            setLoading(false)
        }
    }, [productsInContexts]);

    if (loading) {
        return <div style={{ display:'flex', flexDirection: 'column', jusifyContent:'space-between' }}>
            <span style={{ textAlign: 'center', marginTop: '200px', fontSize: '18px', color: '#333' }}>Cargando productos...</span>;
            <div className="loading-screen">
                <div className="roller">
                    <div className="handle"></div>
                </div>
                <div className="paint"></div>
            </div>
        </div>
    }

    return (
        <main>
            <Header />
            <TopBannerGallery />
            <div className="container">
                <TopSellingGalery />
                <RecommendedProductList />
            </div>
            <StoreInfo />
            <ChatButton />
            <Footer />
        </main>
    );
};

export default Home;

