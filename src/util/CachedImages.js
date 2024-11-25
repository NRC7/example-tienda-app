import bannerService from '../services/BannerService';

let bannerCache = null;

export const getCachedImages = async () => {
    if (!bannerCache) {
        bannerCache = await bannerService.getImages();
        console.log("LLAMANDO SERVICIO BANNER")
    }
    return bannerCache;
};

export const clearBannerCache = () => {
    bannerCache = null;
};
