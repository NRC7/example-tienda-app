import ProductDetails from '../components/ProductDetails';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import BuyingInfo from '../components/BuyingInfo';

const Search = () => {

    const location = useLocation();
    const foundProducts = location.state?.products;

    return (
        <main>
            <div style={{ padding: '0 100px', backgroundColor: '#f0f0f0' }}>
                <ProductDetails selectedProduct={foundProducts[1]} />
            </div>
            <ChatButton />
            <BuyingInfo/>
            <Footer />
        </main>
    );

}

export default Search