import React from 'react';
import ProductList from '../components/ProductList';
import TopSellingGalery from '../components/TopSellingGalery';
import '../styles/HomeStyle.css'

const Home = () => {
    return (
        <main>
            <div className="container">
                {/* ProductList ahora se encarga de obtener los productos */}
                <TopSellingGalery />
            </div>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '10px 0px' }}>Productos seleccionados para ti</h2>
            <ProductList />
        </main>
    );
};

export default Home;
