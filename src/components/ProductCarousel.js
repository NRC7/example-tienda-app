import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../styles/ProductCarousel.css'
import Rating from './ProductRating'; // Importar el componente de Rating
import { sanitizeCategory } from '../util/SanitizeCategory';
import { handleAddToCart } from '../handlers/CartHandler';
import { formatCurrency } from '../util/FormatCurrency';
import { useNavigate } from "react-router-dom";


const ProductCarousel = ({ products, mHeight, contWidth, autoplayEnabled, autoplayInterval, loopEnabled, slides }) => {

    const autoplaySettings = autoplayEnabled
        ? { delay: autoplayInterval, disableOnInteraction: false }
        : false;

    const navigate = useNavigate();    

    return (

        <Swiper
         style={{ height: mHeight, width: contWidth, textAlign: 'center' }}
         pagination={{ clickable: true }} // Activa los dots
         navigation modules={[Navigation, Pagination, Autoplay]}
         slidesPerView={slides}
         autoplay={autoplaySettings}
         loop={loopEnabled}
         slides={4}
        >
            {products.map((product, index) => (
                <SwiperSlide key={index} style={{alignItems: 'center', textAlign: 'center'}}>
                        <div className="product-container">
                            <div className="product-image">
                                <img 
                                    src={product?.imageResources} 
                                    alt={product?.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'scale-down' }}
                                    onClick={() =>  navigate(`/products/${product?.category}/${product?.subCategory}/${product?.sku}`, { state: { product: product } })} 
                                />
                            </div>
                            <div className="product-info" >
                                <h3 onClick={() =>  navigate(`/products/${product?.category}/${product?.subCategory}/${product?.sku}`, { state: { product: product } })} 
                                style={{ margin: '6px 2px', fontSize: '1.8rem' }}>{product?.name}</h3>
                                {product?.discountPercentage !== "" ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through', color: 'red', margin: '6px 2px', fontSize: '1rem' }}>
                                            Antes: {formatCurrency(product?.normalPrice)}
                                        </span>
                                        <span style={{ fontWeight: 'bold', color: 'green', fontSize: '1.4rem', margin: '6px 2px' }}>
                                            Oferta: {formatCurrency(product?.dealPrice)}
                                        </span>
                                        <span style={{ color: 'black', margin: '6px 2px', fontSize: '1.1rem', }}>
                                            ({product?.discountPercentage} de desct.)
                                        </span>
                                    </>
                                ) : (
                                    <span style={{ fontWeight: 'bold', color: 'black', fontSize: '1.3rem', margin: '20px 2px' }}>{formatCurrency(product?.normalPrice)}</span>
                                )}
                                <p style={{ margin: '6px 2px', fontSize: '0.9rem' }}>Categoria: {sanitizeCategory(product.category)}</p>
                                {/* Mostrar las estrellas de calificación */}
                                <Rating rating={5}></Rating>
                                <button onClick={() => handleAddToCart(product, 1)}>
                                    Añadir al carro
                                </button>
                            </div> 
                        </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductCarousel;
