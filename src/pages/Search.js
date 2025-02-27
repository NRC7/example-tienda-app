import React from 'react';
import { useLocation, Link } from "react-router-dom";
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import ChatButton from '../components/ChatButton';
import BuyingInfo from '../components/BuyingInfo';
import Footer from '../components/Footer';
import '../styles/ProductGrid.css'

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
            <Header />
            <div style={{ padding: '0 100px', backgroundColor: '#f0f0f0' }}>
                <div className='detailsNavegation'>
                    <Link to={`/`}>Home -</Link>
                    <Link className="highlight" to={`/search/${terms}`}>{` Busqueda: '${formatted}' : ${products.length} resultados`}</Link>
                </div>
                {products.length > 0 ? (
                    <ProductGrid selectedProducts={products} label={`Todos los productos con '${formatted}'`}></ProductGrid>
                ) : (
                    <div style={{fontSize: '1.1rem', textAlign: 'center', height:'80vh'}}>Cargando productos...</div>
                ) }
            </div>
            <ChatButton />
            <BuyingInfo/>
            <Footer />
        </main>
    );

}

export default Search