// src/components/PurchasePopup.js
import React, { useEffect, useState } from 'react';
import '../styles/PurchasePopup.css';
import { useNavigate } from "react-router-dom";

const PurchasePopup = ({ productList }) => {
    const [recentPurchase, setRecentPurchase] = useState(null);
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();

    const fetchAndSetRandomProduct = async () => {
        //const products = await getCachedProducts();background-color: rgba(0, 0, 0, 0.8);
            const randomProduct = productList[Math.floor(Math.random() * productList.length)]
            setRecentPurchase(randomProduct);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 6000); // Oculta el pop-up después de 10 segundos
    };

    useEffect(() => {
        if (productList && productList.length > 0) {
            fetchAndSetRandomProduct(); // Ejecuta al inicio si hay productos
            const popupInterval = setInterval(fetchAndSetRandomProduct, 63000);
            return () => clearInterval(popupInterval); // Limpia el intervalo al desmontar
        }
    }, [productList]);
    

    if (!recentPurchase || !showPopup) return null;

    return (
        <div className="purchase-popup" onClick={() =>  navigate("/details", { state: { product: recentPurchase } })}>
            <img src={recentPurchase.imageResources[0]} alt={recentPurchase.name} className="popup-image" />
            <div className="popup-text">
                <p>{`¡Juanito acaba de comprar ${recentPurchase.name}!`}</p>
            </div>
        </div>
    );
};

export default PurchasePopup;
