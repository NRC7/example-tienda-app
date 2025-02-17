import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css'
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import { useNavigate } from "react-router-dom";
import Rating from './ProductRating'; // Importar el componente de Rating


const ProductDetails = ({ selectedProduct }) => {

    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, []);

    const images = selectedProduct.imageResources

    const navigate = useNavigate();

    const addProductAndNavigateHome = (selectedProduct) => {
        handleAddToCart(selectedProduct)
        navigate("/")
        // alert("Producto agregado al carro!")
      };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    
    const isFreeShipping = selectedProduct.freeShiping ? 'Si' : 'No'  

    return (
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#f0f0f0', marginTop: '100px'}}>

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
                            <div style={{padding:'0px 4px'}}/> 
                            <Rating rating={selectedProduct?.rating}/></p>
                    </div>

                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%'}}>
                        <p>Categoria: </p>
                        <p className='review'>{sanitizeCategory(selectedProduct?.category)} / {sanitizeCategory(selectedProduct?.subCategory)}</p>
                    </div>

                    {selectedProduct?.discountPercentage !== "" ? (
                        <>
                            <div style={{display: 'flex', flexDirection: 'column', margin: '10px 0px', width: '60%'}}>

                                <span style={{ textAlign: 'center', width: '100%', color: 'gris', margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{fontSize: '0.8rem'}}>Normal:</p>
                                        <p style={{textDecoration: 'line-through', fontSize: '0.8rem'}}>{formatCurrency(selectedProduct?.normalPrice)}</p>
                                </span>

                                <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#25d366', margin: '0px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{fontSize: '0.9rem'}}>Desc:</p> <p style={{fontSize: '0.9rem'}}>-{selectedProduct?.discountPercentage}</p>
                                </span>

                                <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#25d366', margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{fontSize: '1.1rem'}}>Ahora:</p> <p style={{fontSize: '1.1rem'}}>{formatCurrency(selectedProduct?.dealPrice)}</p>
                                </span>

                            </div>
                                
                        </>
                    ) : (

                        <span style={{ fontWeight: 'bold', textAlign: 'center', width: '60%', color: 'gris', margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>

                            <p style={{fontSize: '1.1rem'}}>Normal:</p>

                            <p style={{fontSize: '1.1rem'}}>{formatCurrency(selectedProduct?.normalPrice)}</p>

                        </span>

                        )
                    }

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>

                    <p style={{fontSize: '0.9rem'}}>Envio gratis:</p>
                    
                    <p style={{fontSize: '0.9rem'}}>{isFreeShipping}</p>

                    </span>

                    <button className='details-btn' onClick={() =>addProductAndNavigateHome(selectedProduct)}>
                        Añadir al carro
                    </button>
                            
                </div>
            </div>
    )
};

export default ProductDetails;