import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import ChatButton from '../components/ChatButton';
import BuyingInfo from '../components/BuyingInfo';
import Footer from '../components/Footer';
import { useProductContext } from "../context/ProductContext";
import '../styles/ProductGrid.css' // solo para el estilo provisorio de la navegacion

const AllProducts = () => {

    const { productsInContexts } = useProductContext();

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
    }, []);
  
    return (
        <main>
            <Header />
            <div style={{ padding: '0 100px', backgroundColor: '#f0f0f0' }}>
                <div className='detailsNavegation'>
                    <Link className='' to={`/`}>Home - </Link>
                    <span className='highlight'>Todos los productos</span>
                </div>
                {productsInContexts.length > 0 ? (
                    <ProductGrid selectedProducts={productsInContexts} label={'Disfruta todos nuestros productos'}></ProductGrid>
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