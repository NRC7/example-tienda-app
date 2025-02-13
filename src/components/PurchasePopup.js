import React, { useEffect, useState } from 'react';
import '../styles/PurchasePopup.css';
import { useNavigate } from "react-router-dom";

const PurchasePopup = ({ productList }) => {

    const SHOW_POPUP_INTERVAL = 63000 // muestra un nuevo pop-up después de x milisegundos
    const INIT_POPUP_INTERVAL = 10000 // al inicio muestra el pop-up después de x milisegundos
    const HIDE_POPUP_INTERVAL = 6000 // Oculta el pop-up después de x milisegundos

    const [recentPurchase, setRecentPurchase] = useState(null);
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetRandomProduct = async () => {
            const randomProduct = productList[Math.floor(Math.random() * productList.length)]
            setRecentPurchase(randomProduct);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), Math.floor(Math.random() * HIDE_POPUP_INTERVAL)); 
        };
        if (productList && productList.length > 0) {
            setTimeout(() => fetchAndSetRandomProduct(), Math.floor(Math.random() * INIT_POPUP_INTERVAL));
            // fetchAndSetRandomProduct(); // Ejecuta al inicio si hay productos
            const popupInterval = setInterval(fetchAndSetRandomProduct, Math.floor(Math.random() * SHOW_POPUP_INTERVAL)); 
            return () => clearInterval(popupInterval); // Limpia el intervalo al desmontar
        }
    }, [productList]);

    const getRandomName = () => {
        const names = ['John', 'Pedro', 'Carlos', 'Natalia', 'Maria', 'Estela']
        return names[Math.floor(Math.random() * names.length)]
    }

    if (!recentPurchase || !showPopup) return null;

    return (
        <div className="purchase-popup" onClick={() =>  navigate(`/products/${recentPurchase.sku}`, { state: { product: recentPurchase } })}>
            <img src={recentPurchase.imageResources[0]} alt={recentPurchase.name} className="popup-image" />
            <div className="popup-text">
                <p>{`${getRandomName()} acaba de comprar ${recentPurchase.name}!`}</p>
            </div>
        </div>
    );
};

export default PurchasePopup;
