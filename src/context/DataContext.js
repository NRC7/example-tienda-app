import { createContext, useState, useContext, useEffect } from "react";
import { getCachedProducts } from '../handlers/CachedProducs';

const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
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
    <DataContext.Provider value={{ productsInContexts, updateProductsInContext }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
