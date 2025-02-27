import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetails';
import ChatButton from '../components/ChatButton';
import BuyingInfo from '../components/BuyingInfo';
import Footer from '../components/Footer';

const Details = () => {

    // Indicador de carga
    const [loading, setLoading] = useState(true); 
    // Indicador de error
    const [error, setError] = useState(false); 

    const location = useLocation();
    const selectedProduct = location.state?.product; // Recibe el producto

    useEffect(() => {

        // if ( selectedProduct == null || typeof selectedProduct === 'undefined') {
        //     setError(true)
        // }

        setError(false)

        // Deja de cargar
        setLoading(false);

    }, []);

    if (loading) {
        // Muestra un indicador de carga mientras loading sea igual a true
        return <div className="loading" style={{ textAlign: 'center', marginTop: '200px', fontSize: '18px', color: '#333' }}>Cargando producto seleccionado...</div>;
    }

    if (error) {
        // Muestra un mensaje de error mientras error sea igual a true
        return <div style={{ textAlign: 'center', marginTop: '200px', fontSize: '18px', color: '#333' }}>No se puede cargar el producto seleccionado en este momento.</div>;
    }

    // Layout
    return (
        <main>
            <Header />
            <div style={{ padding: '0 100px', backgroundColor: '#f0f0f0' }}>
                <ProductDetails selectedProduct={selectedProduct} />
            </div>
            <ChatButton />
            <BuyingInfo/>
            <Footer />
        </main>
    );

}

export default Details