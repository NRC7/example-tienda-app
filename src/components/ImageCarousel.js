import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../styles/ImageCarousel.css'


const ImageCarousel = ({ images, mHeight, contWidth, imgWidth,  autoplayEnabled, autoplayInterval }) => {

    const autoplaySettings = autoplayEnabled
        ? { delay: autoplayInterval, disableOnInteraction: false }
        : false;

    return (

        <Swiper
         className="carousel-swiper"
         pagination={{ clickable: true }} // Activa los dots
         navigation modules={[Navigation, Pagination, Autoplay]}
         slidesPerView={1}
         autoplay={autoplaySettings}
        >

            {images.map((src, index) => (

                <SwiperSlide key={index} style={{alignItems: 'center'}}>

                    <img src={src} alt={`img-${index}`} className="carousel-swiper-image" />

                </SwiperSlide>

            ))}

        </Swiper>

    );

};

export default ImageCarousel;
