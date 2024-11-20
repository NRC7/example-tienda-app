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

    const fetchProducts = async () => {
        const data = await getCachedProducts();
        setProducts(data);
        console.log(data);
    };

    useEffect(() => {
        fetchProducts();
        //console.log(products);
    }, []);

    return (
        <main>
            <TopBannerGallery/>
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
