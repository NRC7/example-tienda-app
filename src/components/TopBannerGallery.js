import React, { useState, useEffect } from 'react';
import '../styles/TopBannerGallery.css'
import { getCachedImages } from '../util/CachedImages';

const TopBannerGallery = () => {

    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        const data = await getCachedImages();
        setImages(data);
        console.log(data);
    };

    // Estado para el índice del producto visible
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                images.length > 0 ? (prevIndex + 1) % images.length : 0
            );
        }, 9000);

        // Limpiamos el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [images]);

    // Navegación con flechas
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div >
            <div className="top-banner-gallery">
                <button className="arrow left" onClick={handlePrev}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="banner-image">
                    <img 
                        src={images[currentIndex]?.imageResources} 
                        alt={images[currentIndex]?.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                </div>
                <button className="arrow right" onClick={handleNext}>
                    <i className="fas fa-chevron-right"></i>
                </button>
                <div className="dots">
                    {images.map((_, index) => (
                        <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} />
                    ))}
                </div>  
            </div>
        </div>
    );
};

export default TopBannerGallery;
