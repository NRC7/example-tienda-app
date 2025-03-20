import React, { useState, useEffect } from 'react';
import { getEstimatedDeliveryDate } from '../util/EstimatedDeliveryDate';
import { increaseQuantity, decreaseQuantity } from '../handlers/DetailsQuantityHandler';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import { useNavigate } from "react-router-dom";
import Rating from './ProductRating'; 
import ImageCarousel from './ImageCarousel';
import { Link } from "react-router-dom";
import '../styles/ProductDetails.css'


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
        <div>

        

            <div className='product-details-navegation'>
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
            
            <div className='details-product-container'>
                
                <div className='details-image-container'>
                        <ImageCarousel
                            images={selectedProduct?.imageResources}
                            mHeight={'600px'}
                            contWidth={'700px'}
                            imgWidth={'500px'}
                            autoplayEnabled={false}
                        />
                </div>

                <div className='details-product-info-container'>

                    <h2>{selectedProduct?.name}</h2>

                    <div className='details-product-info'>
                        <span>SKU: {selectedProduct?.sku}</span>
                        <span style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            Reseñas:
                            <span style={{padding:'0px 4px'}}/> 
                            <Rating rating={selectedProduct?.rating}/>
                        </span>
                    </div>

                    <div className='details-product-category'>
                        <span>Categoria: </span>
                        <span className='review'>{sanitizeCategory(selectedProduct?.category)} / {sanitizeCategory(selectedProduct?.subCategory)}</span>
                    </div>

                    {selectedProduct?.discountPercentage !== "" ? (
                        <>
                            <div className='details-product-discount'>

                                <span className='details-product-discount-through'>
                                        <span >Normal:</span>
                                        <span style={{textDecoration: 'line-through'}}>{formatCurrency(selectedProduct?.normalPrice)}</span>
                                </span>

                                <span className='details-product-discount-percentage'>
                                        <span >Desc:</span> <span >-{selectedProduct?.discountPercentage}</span>
                                </span>

                                <span className='details-product-discount-price'>
                                        <span >Ahora:</span> <span >{formatCurrency(selectedProduct?.dealPrice)}</span>
                                </span>

                            </div>
                                
                        </>
                    ) : (

                        <span className='details-product-normal'>

                            <span >Normal:</span>

                            <span >{formatCurrency(selectedProduct?.normalPrice)}</span>

                        </span>

                        )
                    }

                    <span className='details-product-envio'>

                        <span >Envio gratis:</span>
                        
                        <span >{selectedProduct.freeShiping === 'true' ? 'Si' : 'No'}</span>

                    </span>

                    <span className='details-product-date'>

                        <span >Fecha estimada de entrega aprox 48 hrs. hábiles:</span>
                        
                        <span >{getEstimatedDeliveryDate().replaceAll('/', ' ')}</span>

                    </span>

                    <div className='details-product-descriptiono-mob'>
                        <span style={{ fontSize: '1.1rem', width: '98%', textAlign: 'justify', fontWeight:'bold'}}>Caracteristicas:</span>
                        <ul style={{ width: '98%', backgroundColor: '#f0f0f0', textAlign: 'center', margin: '4px 0px', display: 'block' }}>
                            {descriptionList.map((item, index) => (
                                <li style={{ fontSize: '1rem', width: '100%', textAlign: 'justify', margin: '4px 0px'}} key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <span className='details-product-controls'>

                        <button className='qt-btn' onClick={() => handleDecrease()} disabled={quantity === 1}>-</button>

                        <span style={{ alignSelf: 'center'}}>{quantity}</span>

                        <button className='qt-btn' onClick={() => handleIncrease()} disabled={quantity === 10}>+</button>
                        
                        <button className='details-btn' onClick={() =>addProductAndNavigateHome(selectedProduct,quantity )}>
                            Añadir al carro
                        </button>

                    </span>

                    

                </div>

            </div>

            <div className='details-product-description'>
                <h2 style={{ fontSize: '1.4rem', width: '91%', textAlign: 'center'}}>Descripcion</h2>
                <ul style={{ width: 'max-content', backgroundColor: '#f0f0f0', textAlign: 'center', margin: '0 auto', display: 'flex', alignItems:'center', flexDirection:'column' }}>
                    {descriptionList.map((item, index) => (
                        <li style={{ fontSize: '0.9rem', width: '100%', textAlign: 'justify', margin: '8px 0px'}} key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            

        </div> 
    )
};

export default ProductDetails;