import React, {useEffect, useState} from 'react';
import { useLocation, Link } from "react-router-dom";
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import ChatButton from '../components/ChatButton';
import BuyingInfo from '../components/BuyingInfo';
import Footer from '../components/Footer';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { useProductContext } from "../context/ProductContext";
import '../styles/ProductGrid.css' // solo para el estilo provisorio de la navegacion

const SubCategories = () => {

    const { productsInContexts } = useProductContext();

    const location = useLocation();
    const selectedSubCategory = location.state?.subCategory;
    const selectedCategory = location.state?.category;
    const selectedLabel = location.state?.label;

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = productsInContexts.filter((item) => item.subCategory === selectedSubCategory)
        setFilteredProducts(filtered);
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, [selectedSubCategory, productsInContexts]);
  
    return (
        <main>
            <Header />
            <div className='categories-container'>
                <div className='detailsNavegation'>
                    <Link className='' to={`/`}>Home - </Link>
                    <Link to={`/products/${selectedCategory}`} 
                        state={{category: selectedCategory, label: `Todos los productos en ${sanitizeCategory(selectedCategory)}`}}
                        > {sanitizeCategory(selectedCategory)} - </Link>
                    <span className='highlight'>{sanitizeCategory(selectedSubCategory)}</span>
                </div>
                {filteredProducts.length > 0 ? (
                    <ProductGrid selectedProducts={filteredProducts} label={selectedLabel}></ProductGrid>
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

export default SubCategories;