import React, { useEffect, useState } from 'react';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { formatCurrency } from '../util/FormatCurrency';
import { handleAddToCart } from '../handlers/CartHandler';
import Rating from './ProductRating'; 
import { useNavigate } from "react-router-dom";
import '../styles/ProductGrid.css'

const ProductGrid = ({ selectedProducts, label }) => {

    const [selectedFilterOption, setSelectedFilterOption] = useState('');
    const [filteredProducts, setSelectedProducts] = useState(selectedProducts);

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedProducts(selectedProducts)
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, [selectedProducts]);

    useEffect(() => {
        switch (selectedFilterOption) {
            case "0":
                const filtered0 = selectedProducts.sort((a,b) => b.rating - a.rating);
                setSelectedFilterOption(filtered0)
                break;
            case "1":
                const filtered1 = selectedProducts.sort((a,b) => b.normalPrice - a.normalPrice);
                setSelectedFilterOption(filtered1)
                break;
            case "2":
                const filtered2 = selectedProducts.sort((a,b) => a.normalPrice - b.normalPrice);
                setSelectedFilterOption(filtered2)
                break;
            case "3":
                const filtered3 = selectedProducts.sort((a,b) => 
                    b.discountPercentage.replace('%', '') - a.discountPercentage.replace('%', ''));
                setSelectedFilterOption(filtered3)
                break;      
            case "4":
                const filtered4 = selectedProducts.sort((a, b) => {
                    if (a.freeShiping === b.freeShiping) return 0;
                    return a.freeShiping === 'true' ? -1 : 1; // Los true van primero
                });
                setSelectedFilterOption(filtered4)
                break;     
            default:
                setSelectedFilterOption(selectedProducts)
                break;
        }
          
    }, [selectedFilterOption, selectedProducts]);

    return (
        <>
            <div style={{display:'flex', marginBottom:'28px', marginInlineStart:'10%',marginInlineEnd:'10%', justifyContent:'space-between', alignItems:'center'}}>
                <h3 style={{textAlign:'start', fontSize:'1.2rem'}}>{label}</h3>
                <select style={{height:'40px', width:'18%', textAlign:'start', fontSize:'1rem', padding:'4px 6px', borderRadius:'5px'}} onChange={(e) =>{
                    setSelectedFilterOption(e.target.value)}
                }>
                    <option value="0">Mejor puntuación</option>
                    <option value="1">Mayor precio</option>
                    <option value="2">Menor precio</option>
                    <option value="3">Mayor descuento</option>
                    <option value="4">Envío gratis</option>
                </select>
            </div>
        
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#f0f0f0', minHeight:'80vh'}}>  
            
                <div className="grid-container">

                    {filteredProducts.map((item, index) => (
                        <div key={item.sku} className="grid-item">
                        
                            <img 
                                src={item.imageResources[0]} 
                                alt={`img-${index}`} 
                                style={{ objectFit: 'scale-down', height: '120px', width: '120px', borderRadius:'10px', marginLeft:'20px' }}
                                onClick={() =>  navigate(`/products/${item.category}/${item.subCategory}/${item.sku}`, { state: { product: item } })}
                                />
                            
                            <span className='product-navegation' style={{fontWeight: 'bold'}}
                                onClick={() =>  navigate(`/products/${item.category}/${item.subCategory}/${item.sku}`, { state: { product: item } })}
                            >{item.name}</span>

                            <div style={{display: 'flex', flexDirection:'row'}}>
                                <span >Categoria: </span>
                                <span className='product-navegation'
                                    onClick={() =>  navigate(`/products/${item.category}`, { state: { category: item.category, label:`Todos los productos en ${sanitizeCategory(item.category)}`}})}
                                >{`${sanitizeCategory(item.category)} - `}</span>
                                <span className='product-navegation'
                                    onClick={() =>  navigate(`/products/${item.category}/${item.subCategory}`, { state: { category: item.category, subCategory: item.subCategory, label: `Todos los productos en ${sanitizeCategory(item.subCategory)}` } })}
                                >{sanitizeCategory(item.subCategory)}</span>
                            </div>

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

                            <Rating rating={item.rating}/>

                            {item.freeShiping === 'true' ? (
                                    <span style={{ fontSize: '0.8rem'}}>Envio gratis: Si</span>
                                ) : (
                                    <div></div>
                                )
                            }

                            <button style={{marginTop: '10px'}} className='pg-details-btn' onClick={() => {
                                //console.log(`Item ${index}: `, item)
                                handleAddToCart(item, 1)}}>
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
        </>       
    )
};

export default ProductGrid;