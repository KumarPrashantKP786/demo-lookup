import { useState, useEffect } from "react";

const useProducts = () => {
  const [productData, setProductData] = useState([]);
  const [activeProductData, setActiveProductData] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProductData(data.products);
      setActiveProductData(data.products[0]);
      setCurrentProductIndex(0);
    };
    fetchProducts();
  }, []);

  return {
    productData,
    activeProductData,
    currentProductIndex,
    setActiveProductData,
    setCurrentProductIndex,
  };
};

export default useProducts;
