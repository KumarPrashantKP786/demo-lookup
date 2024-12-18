/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Card, CardContent, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const Lookbook = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProductData, setActiveProductData] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const navigate = useNavigate();

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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlers = useSwipeable({
    onSwipedUp: () => handleNextProduct(),
    onSwipedDown: () => handlePrevProduct(),
    onSwipedLeft: () => handleNextImage(),
    onSwipedRight: () => handlePrevImage(),
  });

  const handleNextProduct = () => {
    const nextIndex =
      currentProductIndex + 1 >= productData.length ? 0 : currentProductIndex + 1;
    setActiveProductData(productData[nextIndex]);
    setCurrentProductIndex(nextIndex);
    setCurrentImageIndex(0);
  };

  const handlePrevProduct = () => {
    const prevIndex =
      currentProductIndex - 1 < 0 ? productData.length - 1 : currentProductIndex - 1;
    setActiveProductData(productData[prevIndex]);
    setCurrentProductIndex(prevIndex);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activeProductData.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? activeProductData.images.length - 1 : prevIndex - 1
    );
  };

  const progressBars = [];
  for (let i = 0; i < 5; i++) {
    const value = timeRemaining > i ? 100 : 0;
    progressBars.push(
      <LinearProgress
        key={i}
        variant="determinate"
        value={value}
        sx={{
          marginBottom: "4px",
          height: "8px",
          width: "15px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f7f7f7" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Lookbook
      </Typography>

      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginBottom: 3,
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
      />

      <div
        {...handlers}
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          touchAction: "none",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >

        {activeProductData && activeProductData.images?.length > 0 && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxHeight: "500px",
              overflow: "hidden",
            }}
          >
            <img
              src={activeProductData.images[currentImageIndex]}
              alt={`Product ${currentProductIndex + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(60%)",
              }}
            />
          </Box>
        )}

        <Box sx={{ marginBottom: 3, display:'flex', gap:'10px', marginLeft: '100px' }}>{progressBars}</Box>

        <Card sx={{ marginBottom: 3, borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
              {activeProductData?.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              {activeProductData?.description}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: 1, color: "#555" }}>
              Price: ${activeProductData?.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                borderRadius: 2,
                backgroundColor: "#0052cc",
                "&:hover": {
                  backgroundColor: "#003e99",
                },
              }}
              onClick={() => handleProductClick(activeProductData.id)}
            >
              Shop Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default Lookbook;
