import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css'
import { getEstimatedDeliveryDate } from '../util/EstimatedDeliveryDate';
import { increaseQuantity, decreaseQuantity } from '../handlers/DetailsQuantityHandler';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import { useNavigate } from "react-router-dom";
import Rating from './ProductRating'; 
import ImageCarousel from './ImageCarousel';
import { Link } from "react-router-dom";


const ProductDetails = ({ selectedProduct }) => {

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, []);

    const navigate = useNavigate();

    const addProductAndNavigateHome = (selectedProduct, selectedQuantity) => {
        handleAddToCart(selectedProduct, selectedQuantity)
        navigate("/")
        // alert("Producto agregado al carro!")
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => increaseQuantity(prevQuantity));
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => decreaseQuantity(prevQuantity));
    };

    const sanitizedDescription = selectedProduct.description

    let descriptionList = sanitizedDescription.split(",");

    const selectedCategory = selectedProduct.category
    const selectedSubCategory = selectedProduct.subCategory

    return (
        <>
            <div className='detailsNavegation'>
                <Link to={`/`}>Home -</Link>
                <Link to={`/products/${selectedProduct.category}`} state={{category: selectedCategory, label: `Todos los productos en ${sanitizeCategory(selectedCategory)}`}}
                > {sanitizeCategory(selectedProduct.category)} - </Link>
                <Link to={`/products/${selectedProduct.category}/${selectedProduct.subCategory}`} 
                    state={{category:selectedCategory, subCategory: selectedSubCategory, label: `Todos los productos en ${sanitizeCategory(selectedSubCategory)}`}}
                > {sanitizeCategory(selectedProduct.subCategory)} - </Link>
                <Link className="highlight" 
                    to={`/products/${selectedProduct.category}/${selectedProduct.subCategory}/${selectedProduct.sku}`}
                    state={{product: selectedProduct}}
                    > Sku: {selectedProduct.sku}
                </Link>
            </div>
            
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#f0f0f0', marginTop: '12px'}}>
                
                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', width:'50%', height: '100%'}}>
                        <ImageCarousel
                            images={selectedProduct?.imageResources}
                            mHeight={'600px'}
                            contWidth={'700px'}
                            imgWidth={'500px'}
                            autoplayEnabled={false}
                        />
                </div>

                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', width:'50%', minHeight:'100%', fontSize: '0.9rem'}}>

                    <h2 style={{ fontSize: '1.8rem', width: '70%', textAlign: 'center'}}>{selectedProduct?.name}</h2>

                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%', alignItems: 'center', margin: '8px 0px',}}>
                        <span>SKU: {selectedProduct?.sku}</span>
                        <span style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            Reseñas:
                            <span style={{padding:'0px 4px'}}/> 
                            <Rating rating={selectedProduct?.rating}/>
                        </span>
                    </div>

                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%', margin: '10px 0px'}}>
                        <span>Categoria: </span>
                        <span className='review'>{sanitizeCategory(selectedProduct?.category)} / {sanitizeCategory(selectedProduct?.subCategory)}</span>
                    </div>

                    {selectedProduct?.discountPercentage !== "" ? (
                        <>
                            <div style={{display: 'flex', flexDirection: 'column', margin: '10px 0px', width: '60%'}}>

                                <span style={{ textAlign: 'center', width: '100%', color: 'gris', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{fontSize: '0.8rem'}}>Normal:</span>
                                        <span style={{textDecoration: 'line-through', fontSize: '0.8rem'}}>{formatCurrency(selectedProduct?.normalPrice)}</span>
                                </span>

                                <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#25d366', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{fontSize: '0.9rem'}}>Desc:</span> <span style={{fontSize: '0.9rem'}}>-{selectedProduct?.discountPercentage}</span>
                                </span>

                                <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#25d366', margin: '12px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{fontSize: '1.1rem'}}>Ahora:</span> <span style={{fontSize: '1.1rem'}}>{formatCurrency(selectedProduct?.dealPrice)}</span>
                                </span>

                            </div>
                                
                        </>
                    ) : (

                        <span style={{ fontWeight: 'bold', textAlign: 'center', width: '60%', color: 'gris', margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>

                            <span style={{fontSize: '1.1rem'}}>Normal:</span>

                            <span style={{fontSize: '1.1rem'}}>{formatCurrency(selectedProduct?.normalPrice)}</span>

                        </span>

                        )
                    }

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>

                        <span style={{fontSize: '0.9rem'}}>Envio gratis:</span>
                        
                        <span style={{fontSize: '0.9rem'}}>{selectedProduct.freeShiping === 'true' ? 'Si' : 'No'}</span>

                    </span>

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', margin: '16px 0px', display: 'flex', justifyContent: 'space-between' }}>

                        <span style={{fontSize: '0.9rem'}}>Fecha estimada de entrega aprox 48 hrs. hábiles:</span>
                        
                        <span style={{fontSize: '0.9rem'}}>{getEstimatedDeliveryDate().replaceAll('/', ' ')}</span>

                    </span>

                    <span style={{ textAlign: 'center', width: '60%', color: 'gris', display: 'flex', justifyContent: 'space-between', margin: '25px 0px'  }}>

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

            

        </>  
    )
};

export default ProductDetails;