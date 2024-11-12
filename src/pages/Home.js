import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import TopSellingGalery from '../components/TopSellingGalery';
import PurchasePopup from '../components/PurchasePopup';
import Footer from '../components/Footer';
import '../styles/HomeStyle.css'
import { getCachedProducts } from '../util/CachedProducs';

const Home = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const data = await getCachedProducts();
        setProducts(data);
        console.log(data);
    };

    useEffect(() => {
        fetchProducts();
        console.log(products);
    }, []);

    return (
        <main>
            <div className="container">
                {/* ProductList ahora se encarga de obtener los productos */}
                <TopSellingGalery productList={products} />
            </div>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '10px 0px' }}>Productos seleccionados para ti</h2>
            <ProductList productList={products} />
            <PurchasePopup productList={products} />
            <Footer />
        </main>
    );
};

export default Home;
