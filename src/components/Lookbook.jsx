import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, TextField, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Lookbook = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLooks, setFilteredLooks] = useState([]);
  const [activeProductData, setActiveProductData] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProductData(data.products);
      setFilteredLooks(data.products); // Initially set filtered looks to all products
      setActiveProductData(data.products[0]);
      setCurrentProductIndex(0);
    };
    fetchProducts();
  }, []);


  const preloadImages = (product) => {
    product?.images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  useEffect(() => {
    const productTimer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          const nextProduct =
            currentProductIndex + 1 >= productData.length
              ? productData[0]
              : productData[currentProductIndex + 1];
          preloadImages(nextProduct);

          if (currentProductIndex + 1 >= productData.length) {
            setActiveProductData(productData[0]);
            setCurrentProductIndex(0);
          } else {
            setActiveProductData(productData[currentProductIndex + 1]);
            setCurrentProductIndex(currentProductIndex + 1);
          }

          setCurrentImageIndex(0); 
          return 5; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(productTimer); 
  }, [currentProductIndex, productData]);

  useEffect(() => {
    if (activeProductData?.images) {
      const imageTimer = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % activeProductData.images.length
        );
      }, 1000);

      return () => clearInterval(imageTimer);
    }
  }, [activeProductData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLooks(productData);
    } else {
      const filtered = productData.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLooks(filtered);
    }
  }, [searchQuery, productData]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lookbook
      </Typography>

      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {activeProductData && activeProductData.images?.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxHeight: "500px",
            marginBottom: 3,
          }}
        >
          <img
            src={activeProductData.images[currentImageIndex]}
            alt={`Product ${currentProductIndex + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          <LinearProgress
            variant="determinate"
            value={(100 * (5 - timeRemaining)) / 5}
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      )}

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6">{activeProductData?.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {activeProductData?.description}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Price: ${activeProductData?.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => handleProductClick(activeProductData.id)} // Pass product ID to navigate
          >
            Shop Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Lookbook;
