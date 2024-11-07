import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/HomeStyle.css'

const Home = () => {
    return (
        <main>
            <div className="container">
                <h1>Bienvenidos a nuestra tienda</h1>
                {/* ProductList ahora se encarga de obtener los productos */}
                <ProductList />
            </div>
        </main>
    );
};

export default Home;
