import { createContext, useState, useContext, useEffect } from "react";
import { getCachedProducts } from '../handlers/CachedProducs';

const ProductContext = createContext([]);

export const ProductProvider = ({ children }) => {
  const [productsInContexts, setProductsInContexts] = useState([]);

  const updateProductsInContext = (productsList) => {
    setProductsInContexts(productsList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCachedProducts();
        setProductsInContexts(data.data);
      } catch (error) {
        setProductsInContexts([]);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ productsInContexts, updateProductsInContext }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
