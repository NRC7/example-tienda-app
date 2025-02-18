import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../styles/ImageCarousel.css'


const ImageCarousel = ({ images }) => {
    return (
        <Swiper
         style={{ objectFit: 'scale-down', height:'600px', width: '700px', textAlign: 'center' }}
         pagination={{ clickable: true }} // Activa los dots
         navigation modules={[Navigation, Pagination]}
         slidesPerView={1}
        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`img-${index}`} style={{ objectFit: 'scale-down', height:'600px', width: '500px' }} />
                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default ImageCarousel;
