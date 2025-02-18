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
         style={{ objectFit: 'scale-down', height: mHeight, width: contWidth, textAlign: 'center' }}
         pagination={{ clickable: true }} // Activa los dots
         navigation modules={[Navigation, Pagination, Autoplay]}
         slidesPerView={1}
         autoplay={autoplaySettings}
        >

            {images.map((src, index) => (

                <SwiperSlide key={index} style={{alignItems: 'center'}}>

                    <img src={src} alt={`img-${index}`} style={{
                         objectFit: 'scale-down', height: mHeight, width: imgWidth }} />

                </SwiperSlide>

            ))}

        </Swiper>

    );

};

export default ImageCarousel;
