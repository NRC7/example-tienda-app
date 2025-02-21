import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import ProductGrid from '../components/ProductGrid';
import ChatButton from '../components/ChatButton';
import BuyingInfo from '../components/BuyingInfo';
import Footer from '../components/Footer';
import { getCachedProducts } from '../util/CachedProducs';
import '../styles/ProductGrid.css' // solo para el estilo provisorio de la navegacion

const AllProducts = () => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchCachedProducts = async () => {
            let data = await getCachedProducts();
            setAllProducts(data);
        };
        fetchCachedProducts()
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, []);
  
    return (
        <main>
            <div style={{ padding: '0 100px', backgroundColor: '#f0f0f0' }}>
                <div style={{fontSize:'1.1rem', marginBottom:'10px'}} className='detailsNavegation'>
                    <Link className='' to={`/`}>Home - </Link>
                    <span className='highlight'>Todos los productos</span>
                </div>
                {allProducts.length > 0 ? (
                    <ProductGrid selectedProducts={allProducts} label={'Disfruta todos nuestros productos'}></ProductGrid>
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

export default AllProducts;