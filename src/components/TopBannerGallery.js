import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import '../styles/TopBannerGallery.css'
import { getCachedImages } from '../util/CachedImages';

const TopBannerGallery = () => {

    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const data = await getCachedImages();
            let args = []
            data.forEach( item => {
                args.push(item.imageResources);
            });
            setImgs(args);
        };
        fetchImages();
    }, []);

    return (
        <div className="top-banner-gallery">
            <div className="banner-image">
                <ImageCarousel
                            images={imgs}
                            mHeight={'100%'}
                            contWidth={'100%'}
                            imgWidth={'100%'}
                            autoplayEnabled={true}
                            autoplayInterval={5000}
                />
            </div>
        </div>
    );
};

export default TopBannerGallery;