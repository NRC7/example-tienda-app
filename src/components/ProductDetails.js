import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css'
import { getEstimatedDeliveryDate } from '../util/EstimatedDeliveryDate';
import { increaseQuantity, decreaseQuantity } from '../handlers/DetailsQuantityHandler';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import { useNavigate } from "react-router-dom";
import Rating from './ProductRating'; 
import BuyingInfo from './BuyingInfo';
import { Link } from "react-router-dom";


const ProductDetails = ({ selectedProduct }) => {

    const [currentIndex, setCurrentIndex] = useState(0); 
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, []);

    const images = selectedProduct.imageResources

    const navigate = useNavigate();

    const addProductAndNavigateHome = (selectedProduct, selectedQuantity) => {
        handleAddToCart(selectedProduct, selectedQuantity)
        navigate("/")
        // alert("Producto agregado al carro!")
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => increaseQuantity(prevQuantity));
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => decreaseQuantity(prevQuantity));
    };

    const sanitizedDescription = selectedProduct.description

    let descriptionList = sanitizedDescription.split(",");

    return (
        <>
            <div className='detailsNavegation'>
                <Link to={`/`}>Home -</Link>
                <Link to={`/products/${selectedProduct.category}`}> {sanitizeCategory(selectedProduct.category)} - </Link>
                <Link className="highlight" to={`/products/${selectedProduct.category}/${selectedProduct.subCategory}`}> {sanitizeCategory(selectedProduct.subCategory)}</Link>
            </div>
            
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#f0f0f0', marginTop: '12px'}}>
                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', width:'50%', height: '100%'}}>
                    <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', gap: '50px'}}>
                        <button className="arrow-details" onClick={handlePrev}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <img 
                            src={selectedProduct?.imageResources[currentIndex]} 
                            alt={selectedProduct?.name}
                            style={{objectFit: 'scale-down', height:'600px', width: '500px'}}  
                        />
                        <button className="arrow-details" onClick={handleNext}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>

                    <div className="dots-details">
                            {images.map((_, index) => (
                                <span key={index} className={`dot-details ${index === currentIndex ? 'active' : ''}`} />
                            ))}
                    </div>  
                </div>


                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', width:'50%', minHeight:'100%', fontSize: '0.9rem'}}>

                    <h2 style={{ fontSize: '1.8rem', width: '70%', textAlign: 'center'}}>{selectedProduct?.name}</h2>

                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%'}}>
                        <p>SKU: {selectedProduct?.sku}</p>
                        <p style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            Reseñas:
                            <span style={{padding:'0px 4px'}}/> 
                            <Rating rating={selectedProduct?.rating}/>
                        </p>
                    </div>

                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%'}}>
                        <p>Categoria: </p>
                        <p className='review'>{sanitizeCategory(selectedProduct?.category)} / {sanitizeCategory(selectedProduct?.subCategory)}</p>
                    </div>

                    {selectedProduct?.discountPercentage !== "" ? (
                        <>
                            <div style={{display: 'flex', flexDirection: 'column', margin: '2px 0px', width: '60%'}}>

                                <span style={{ textAlign: 'center', width: '100%', color: 'gris', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{fontSize: '0.8rem'}}>Normal:</p>
                                        <p style={{textDecoration: 'line-through', fontSize: '0.8rem'}}>{formatCurrency(selectedProduct?.normalPrice)}</p>
                                </span>

                                <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#25d366', margin: '0px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{fontSize: '0.9rem'}}>Desc:</p> <p style={{fontSize: '0.9rem'}}>-{selectedProduct?.discountPercentage}</p>
                                </span>

                                <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#25d366', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{fontSize: '1.1rem'}}>Ahora:</p> <p style={{fontSize: '1.1rem'}}>{formatCurrency(selectedProduct?.dealPrice)}</p>
                                </span>

                            </div>
                                
                        </>
                    ) : (

                        <span style={{ fontWeight: 'bold', textAlign: 'center', width: '60%', color: 'gris', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>

                            <p style={{fontSize: '1.1rem'}}>Normal:</p>

                            <p style={{fontSize: '1.1rem'}}>{formatCurrency(selectedProduct?.normalPrice)}</p>

                        </span>

                        )
                    }

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', margin: '2px 0px', display: 'flex', justifyContent: 'space-between' }}>

                        <p style={{fontSize: '0.9rem'}}>Envio gratis:</p>
                        
                        <p style={{fontSize: '0.9rem'}}>{selectedProduct.freeShiping ? 'Si' : 'No'}</p>

                    </span>

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>

                        <p style={{fontSize: '0.9rem'}}>Fecha estimada de entrega aprox 48 hrs. hábiles:</p>
                        
                        <p style={{fontSize: '0.9rem'}}>{getEstimatedDeliveryDate().replaceAll('/', ' ')}</p>

                    </span>

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', margin: '8px 0px', display: 'flex', justifyContent: 'space-between' }}>

                        <button className='qt-btn' onClick={() => handleDecrease()} disabled={quantity === 1}>-</button>

                        <span style={{fontSize: '0.8rem', alignSelf: 'center'}}>{quantity}</span>

                        <button className='qt-btn' onClick={() => handleIncrease()} disabled={quantity === 10}>+</button>
                        
                        <button className='details-btn' onClick={() =>addProductAndNavigateHome(selectedProduct,quantity )}>
                            Añadir al carro
                        </button>

                    </span>

                </div>
            </div>
            <h2 style={{ fontSize: '1.4rem', width: '91%', textAlign: 'center'}}>Descripcion</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ width: '27%', backgroundColor: '#f0f0f0', textAlign: 'center', margin: '0 auto', display: 'block' }}>
                    {descriptionList.map((item, index) => (
                        <li style={{ fontSize: '0.9rem', width: '100%', textAlign: 'justify', margin: '8px 0px'}} key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <BuyingInfo/>
        </>  
    )
};

export default ProductDetails;