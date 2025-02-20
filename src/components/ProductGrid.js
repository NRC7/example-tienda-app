import React, { useEffect } from 'react';
import '../styles/ProductGrid.css'
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import Rating from './ProductRating'; 
import { useNavigate } from "react-router-dom";


const ProductGrid = ({ foundProducts }) => {

    const navigate = useNavigate();

    useEffect(() => {
        // Mueve el scroll al inicio cuando se monta el componente
        window.scrollTo(0, 0);
    }, []);

    const addProductAndNavigateHome = (selectedProduct, selectedQuantity) => {
            handleAddToCart(selectedProduct, selectedQuantity)
            //navigate("/")
            // alert("Producto agregado al carro!")
        };

    return (
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#f0f0f0', minHeight:'80vh'}}>
            
                <div className="grid-container">

                    {foundProducts.map((item, index) => (
                        <div key={item.sku} className="grid-item">
                        
                            <img 
                                src={item.imageResources[1]} 
                                alt={`img-${index}`} 
                                style={{ objectFit: 'scale-down', height: '120px', width: '120px', borderRadius:'10px', marginLeft:'20px' }}
                                onClick={() =>  navigate(`/products/${item.category}/${item.subCategory}/${item.sku}`, { state: { product: item } })}
                                />
                            
                            <span style={{fontWeight: 'bold'}} >{item.name}</span>
                            
                            <span >{`Categoria: ${sanitizeCategory(item.category)} - ${sanitizeCategory(item.subCategory)}`}</span>

                            {item.discountPercentage !== "" ? (
                                    <div style={{display: 'flex', flexDirection: 'column'}}> 
                                        <span style={{textDecoration: 'line-through', fontSize: '0.8rem'}}>
                                            {`Antes: ${formatCurrency(item.normalPrice)} `}
                                        </span> 
                        
                                        <span style={{fontWeight: 'bold', fontSize: '1rem', color: '#1e9e4a'}}>
                                            {` Ahora: ${formatCurrency(item.dealPrice)} `}
                                        </span>
                                    </div>
                                    
                                ) : (
                                    <span style={{fontWeight: 'bold', fontSize: '1rem', color: 'black'}}>
                                            {formatCurrency(item.normalPrice)}
                                    </span>
                                )
                            }

                            {item.freeShiping ? (
                                    <span style={{ fontSize: '0.8rem'}}>Envio gratis: Si</span>
                                ) : (
                                    <div></div>
                                )
                            }

                            <Rating rating={item.rating}/>

                            <button style={{marginTop: '10px'}} className='pg-details-btn' onClick={() =>addProductAndNavigateHome(item, 1)}>
                                    Añadir al carro
                            </button>

                            {item.discountPercentage !== "" ? (
                                    <div className="result-bubble">-{item.discountPercentage}</div>
                                ) : (
                                    <div></div>
                                )
                            }

                        </div>  
                    ))}

                </div>
            </div>   
    )
};

export default ProductGrid;