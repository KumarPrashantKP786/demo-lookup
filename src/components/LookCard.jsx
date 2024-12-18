/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const LookCard = ({ product }) => {
  return (
    <Card>
      <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="textSecondary">{product.description}</Typography>
        <Typography variant="body1">${product.price}</Typography>
        <Button variant="outlined" href={`/product/${product.id}`} sx={{ marginTop: 1 }}>
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default LookCard;
