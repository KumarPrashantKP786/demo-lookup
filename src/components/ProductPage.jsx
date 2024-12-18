import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  // Fetch the product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px", height: "auto", objectFit: "cover" }}
        />
      </Box>

      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductPage;
