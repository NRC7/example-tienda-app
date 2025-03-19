import { getBannerImages } from '../services/PublicServices';

let bannerCache = null;

export const getCachedImages = async () => {
    if (!bannerCache) {
        bannerCache = await getBannerImages();
        console.log("LLAMANDO SERVICIO BANNER")
    }
    return bannerCache;
};

export const clearBannerCache = () => {
    bannerCache = null;
};
