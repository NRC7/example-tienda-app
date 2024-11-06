import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <main>
            <h1>Bienvenidos a nuestra tienda</h1>
            {/* ProductList ahora se encarga de obtener los productos */}
            <ProductList />
        </main>
    );
};

export default Home;
