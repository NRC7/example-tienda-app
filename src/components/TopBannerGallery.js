import React, { useState, useEffect } from 'react';
import BannerCarousel from './BannerCarousel';
import '../styles/TopBannerGallery.css'
import { getCachedImages } from '../handlers/CachedImages';

const TopBannerGallery = () => {

    const [imgs, setImgs] = useState([]);

    const CHANGE_INTERVAL = 5000 // Configura el intervalo para cambiar la imagen cada x milisegundos

    useEffect(() => {
        const fetchImages = async () => {
            const data = await getCachedImages();
            //console.log('data: ', data.data);
            let args = []
            data?.data.forEach( item => {
                args.push(item.imageResources);
            });
            setImgs(args);
        };
        fetchImages();
    }, []);

    return (
        <div className="top-banner-gallery">
            <BannerCarousel
                images={imgs}
                mHeight={'100%'}
                contWidth={'100%'}
                imgWidth={'100%'}
                autoplayEnabled={true}
                autoplayInterval={CHANGE_INTERVAL}
            />
        </div>
    );
};

export default TopBannerGallery;