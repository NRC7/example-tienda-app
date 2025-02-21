import ProductGrid from '../components/ProductGrid';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
import React from 'react';
import { useLocation } from "react-router-dom";
import BuyingInfo from '../components/BuyingInfo';
import '../styles/ProductGrid.css' // solo para el estilo provisorio de la navegacion
import { Link } from "react-router-dom";

const Search = () => {

    const location = useLocation();
    const products = location.state?.products;
    const terms = location.state?.terms;

    // Formato navegacion
    function formatTerms(userTerms) {
        let formatedTerms = '';
        userTerms.forEach(term => {
            formatedTerms += (term + ' ')
        });
        return formatedTerms;
    }

    let formatted = formatTerms(terms);

    return (
        <main>
            <div style={{ padding: '0 100px', backgroundColor: '#f0f0f0' }}>
                <div className='detailsNavegation'>
                    <Link to={`/`}>Home -</Link>
                    <Link className="highlight" to={`/search/${terms}`}>{` Busqueda: '${formatted}' : ${products.length} resultados`}</Link>
                </div>
                <ProductGrid foundProducts={products}></ProductGrid>
            </div>
            <ChatButton />
            <BuyingInfo/>
            <Footer />
        </main>
    );

}

export default Search