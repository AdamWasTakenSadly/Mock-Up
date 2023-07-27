import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
//import RatingsView from "../RatingsView/RatingsView";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './productDetails.scss'
import MDButton from '@mui/material/Button';
import React from 'react';

const displayStars = (ratings) => {
  const starIcon = "⭐"; // You can replace this with an actual star icon if you have one
  const fullStars = Math.floor(ratings);
  const halfStars = ratings - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  const stars = Array(fullStars).fill(starIcon).concat(halfStars ? [`${starIcon}½`] : []).concat(Array(emptyStars).fill('☆'));
  return stars.join(' ');
};
const ProductDetails = ({ product }) => {

  const [error, setError] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [ratings, setRatings] = useState(null);

  const params = useParams();
  const id = params.id;

  const fetchRatings = async () => {
    // You can add code here to fetch ratings for the product (if needed)
    // const response = await fetch('/products/' + product._id + '/ratings/guest');
    // const json = await response.json();
    // if (response.ok) {
    //   setRatings(json);
    // }
  };

  
  const addCart = async (product) => {
    try {
      console.log(product)
      const response = await fetch('/products/buyProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product._id, cart: product.name }), // Adjust the body data as needed
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Product added to cart:', data);
        // Implement logic to update cart state or show success message
      } else {
        console.error('Failed to add product to cart:', response.statusText);
        // Implement logic to show error message
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Implement logic to show error message
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      fetchRatings();
    }
  }, []);

  return (
    <div className="left">
      <Card sx={{}} className='card hover-effect'
      >
      <CardMedia
    sx={{  transition: "all 0.3s ease",
      "&:hover": {
         transform: "scale3d(1.2, 1.2, 1)" }}}
    component="img"
    alt={product.name}
    width="300"
    height="100"
    image={product.image} // Replace this with the product image URL
    variant="contained"
    className='cardMedia'
  />
        <CardContent className='cardContent'>
          <Typography gutterBottom variant="h5" component="div" className='t1' style={{ fontWeight: 'bold', color: '#006DA3', textAlign: 'center' }}>
            {product.name}
          </Typography>
          <Typography variant="h7" className='t2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#006DA3' }}>
             {displayStars(product.rating)}
          </Typography>
          <Typography variant="h7" className='t2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#006DA3'}}>
              <strong>{product.price} EGP</strong>
          </Typography>
          <MDButton
            className="btn-mdb"
            variant="contained"
            color="primary"
            onClick={() => addCart(product)}
            style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          >
            Add to Cart
          </MDButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
