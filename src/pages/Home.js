import React from 'react';
import ProductList from '../components/ProductList';
import TopSellingGalery from '../components/TopSellingGalery';
import '../styles/HomeStyle.css'

const Home = () => {
    return (
        <main>
            <div className="container">
                {/* ProductList ahora se encarga de obtener los productos */}
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '2px 0px' }}>TOP SELLING</h2>
                <TopSellingGalery />
            </div>
        </main>
    );
};

export default Home;
