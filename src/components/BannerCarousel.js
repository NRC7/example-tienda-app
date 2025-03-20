import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../styles/BannerCarousel.css'


const BannerCarousel = ({ images, mHeight, contWidth, imgWidth,  autoplayEnabled, autoplayInterval }) => {

    const autoplaySettings = autoplayEnabled
        ? { delay: autoplayInterval, disableOnInteraction: false }
        : false;

    return (

        <Swiper
         className="banner-swiper"
         pagination={{ clickable: true }} // Activa los dots
         navigation modules={[Navigation, Pagination, Autoplay]}
         slidesPerView={1}
         autoplay={autoplaySettings}
        >

            {images.map((src, index) => (

                <SwiperSlide className="swiper-slide-banner" key={index} style={{alignItems: 'center'}}>

                    <img src={src} alt={`img-${index}`} className="banner-swiper-image" />

                </SwiperSlide>

            ))}

        </Swiper>

    );

};

export default BannerCarousel;
