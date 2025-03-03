import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCachedProducts } from '../util/CachedProducs';
import { formatCurrency } from '../util/FormatCurrency';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { normalizeText } from '../util/NormalText';
import '../styles/SearchBar.css'

const SearchBar = () => {

    const [products, setProducts] = useState([]);

    const [userSearchTerms, setSearchTerms] = useState([]);

    const [userSearchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    const fetchCachedProducts = async () => {
        const data = await getCachedProducts();
        setProducts(data);
    };

    function handleSearch(event) {
        const userInput = normalizeText(event.target.value)
        if (userInput.length > 1) {
            // Actualizo el valor de userSearchTerms
            const searchTerms = userInput.split(' ')
            setSearchTerms(searchTerms)
            // Actualizo el valor de userSearchResults
            fetchCachedProducts();
            const searchResults = products?.filter(product => 
                (normalizeText(product.name.toLowerCase()).includes(searchTerms[0].toLowerCase())) ||
                (product.category.toLowerCase().includes(searchTerms[0].toLowerCase())) ||
                (product.subCategory.toLowerCase().includes(searchTerms[0].toLowerCase())) ||
                (product.name.toLowerCase().includes(searchTerms[0].toLowerCase()) &&
                product.category.toLowerCase().includes(searchTerms[1]?.toLowerCase()))
            ).sort((a, b) => b.rating - a.rating);
            setSearchResults(searchResults)
        }
        else {
            setSearchTerms([])
        }
    }

    function clearUI() {
        document.getElementById("searchInput").value = '';
        setSearchTerms([])
    }
    
    return (
        <div style={{display: 'flex', alignItems:'flex-start', width: '500px', justifyContent:'center'}}>
            <div className="search-bar">
                <input id='searchInput' type="text" 
                    placeholder="Buscar productos..." 
                    onChange={(event) => handleSearch(event)} 
                />
                <button className="search-button" disabled={userSearchTerms.length < 1}
                    onClick={ () => {
                        navigate(`/search/${userSearchTerms}`, {state: {products: userSearchResults, terms: userSearchTerms} })
                        clearUI()
                    } }
                >
                    <i className="fa fa-search ic"></i>
                </button>
            </div>
            {userSearchTerms[0]?.length > 2 ? (
                <div className="results">
                    {userSearchResults.map((item, index) => (
                        <div style={{ display:'flex', width: '95%', backgroundColor:'#fff', padding:'5px', margin:'8px 10px', borderRadius:'10px', justifyContent:'flex-start' }} 
                            key={index} 
                            onClick={() =>  {
                                navigate(`/products/${item.category}/${item.subCategory}/${item.sku}`, {state: {product: item}})
                                clearUI()
                            } }
                        >
                            <img src={item.imageResources[0]} alt={`img-${index}`} style={{ objectFit: 'scale-down', height: '120px', width: '120px', borderRadius:'10px', marginLeft:'20px' }} />
                            <div style={{display:'flex', flexDirection: 'column', color:'rgba(0, 0, 0, 0.7)', justifyContent:'center', marginLeft:'10px', fontSize:'1rem'}}>
                                <span>{item.name}</span>
                                {item.discountPercentage !== "" ? (
                                        <div>
                                            <span style={{textDecoration: 'line-through', fontSize:'0.9rem'}}>{formatCurrency(item.normalPrice)} </span>
                                            <span style={{fontWeight: 'bold'}}>{formatCurrency(item.dealPrice)}</span>             
                                        </div>
                                    ) : (
                                        <span style={{fontWeight: 'bold'}}>{formatCurrency(item.normalPrice)}</span>
                                    )
                                }
                                <span>{`Categoria: ${sanitizeCategory(item.category)}`}</span>
                            </div>  
                        </div>                    
                    ))}
                    <span className='bottomText'
                        onClick={ () => {
                            navigate(`/search/${userSearchTerms}`, {state: {products: userSearchResults, terms: userSearchTerms}})
                            clearUI()
                        } }
                    >
                        Mostrar todos los resultados
                    </span>
                </div>    
                ) : (
                    <span></span>
                )
            }
        </div>
    );
}

export default SearchBar;