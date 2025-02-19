import React, { useState } from 'react';
import { getCachedProducts } from '../util/CachedProducs';
import { Link } from "react-router-dom";
import '../styles/SearchBar.css'

const SearchBar = () => {

    const [products, setProducts] = useState([]);

    const [userSearchTerms, setSearchTerms] = useState([]);

    const [userSearchResults, setSearchResults] = useState([]);

    const fetchCachedProducts = async () => {
        const data = await getCachedProducts();
        setProducts(data);
    };

    function handleSearch(event) {
        const userInput = event.target.value
        if (userInput.length > 1) {

            // Actualizo el valor de userSearchTerms
            const searchTerms = userInput.split(' ')
            setSearchTerms(searchTerms)

            // Actualizo el valor de userSearchResults
            fetchCachedProducts();
            const searchResults = products?.filter(product => 
                (product.name.toLowerCase().includes(searchTerms[0].toLowerCase())) ||
                (product.category.toLowerCase().includes(searchTerms[0].toLowerCase())) ||
                (product.name.toLowerCase().includes(searchTerms[0].toLowerCase()) &&
                product.category.toLowerCase().includes(searchTerms[1]?.toLowerCase()))
            ).sort((a, b) => b.rating - a.rating);
            setSearchResults(searchResults)

            // `/search/${userSearchTerms[0]}/${userSearchTerms[1]}?sort=rating`
            // 
        }
    }
    
    return (
        <div className="search-bar">
            <input type="text" 
                placeholder="Buscar productos..." 
                onChange={(event) => handleSearch(event)} 
            />
            <button className="search-button">
                <Link
                    to={{
                        pathname: `/search/${userSearchTerms}`
                    }}
                    state={{ products: userSearchResults }}
                >
                    <i className="fa fa-search"></i>
                </Link>
            </button>
        </div>
    );
}

export default SearchBar;