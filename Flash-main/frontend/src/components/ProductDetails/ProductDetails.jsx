import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
//import RatingsView from "../RatingsView/RatingsView";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./productDetails.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from '@mui/material/Rating';
import { Modal } from "react-bootstrap"; // Import the Modal component from react-bootstrap


import React from "react";



const ProductDetails = ({ product }) => {
  const [error, setError] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [ratings, setRatings] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [isModalOpen2, setIsModalOpen2] = useState(false); // State for modal open/close
  const params = useParams();
  const id = params.id;

  const [currUserRating,setCurrentUserRating]=useState(0)
  const [success,setSuccess]=useState(null)

  const addCart = async (product) => {
    try {
      console.log(product);
      const response = await fetch("/products/buyProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: product._id, cart: product.name }), // Adjust the body data as needed
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added to cart:", data);
        setIsModalOpen(false);
        setIsModalOpen2(true);
        
        
      
        // Implement logic to update cart state or show success message
      } else {
        console.error("Failed to add product to cart:", response.statusText);
        // Implement logic to show error message
        if(response.statusText == "Unauthorized"){
          window.location.href = '/login'
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Implement logic to show error message
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      getCurrUserRating();
      setIsInitialRender(false);
    }
  }, []);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const getCurrUserRating=async()=>{
    const response = await fetch ('/products/'+product._id+'/getCurrUserRatingReview')
    const json = await response.json()
    if (response.status===200)
    {
        console.log("response: ",json.rating)
        setCurrentUserRating(json.rating)
     }
  }

  const changeOrEditRating=async(e)=>{
    setCurrentUserRating(e.target.value)
    const input = { rating: e.target.value};

    try {
      const response = await fetch("/products/"+product._id+"/editOrAddRatingReview", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();
      if (response.ok) {
       setSuccess("Rating added successfully")
      } else {
       setError(json.error)
       setSuccess(null)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if(isInitialRender)
  {
    return (<div>Loading...</div>)
  }

  return (

    <div className="ProductDetails">
      
      {/* Card component created directly within the return statement */}
      <div className="Card" onClick={openModal}>
        {/* Your Card component JSX here, utilizing the product data */}
        <div className="imgBox">
          <img className="image" src={product.image} alt="" />
        </div>
        <div className="contentBox">
        
          <h2>{product.name}</h2>
          <Typography
            variant="h7"
            className="ratings"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#006DA3",
            }}
          >
            <Rating
            name="simple-controlled"
            value={product.rating}
            precision={0.5}
            readOnly // Make it read-only, not clickable
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:"#006DA3",
             
              
            }}
          />
          </Typography>
          <div className="price">{product.price} EGP</div>
          <button onClick={() => addCart(product)}>ADD TO CART</button>
        </div>
      </div>
  
      {/* Bootstrap Modal */}
     {/* React Bootstrap Modal */}
     <Modal show={isModalOpen} onHide={closeModal} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        {/* Split the modal body into left and right content using Bootstrap grid */}
        <div className="container">
          <div className="row">
            {/* Left side (image) */}
            <div className="col-xs-12 col-md-6">
              <img className="image" src={product.image} alt="" style={{ width: '100%' }} />
            </div>
            {/* Right side (other details) */}
            <div className="col-xs-12 col-md-6" style={{ textAlign: 'center' }}>
  <h2 style={{ color: '#006DA3', marginBottom: '10px' }}>{product.name}</h2>
  <Rating
    name="simple-controlled"
    value={product.rating}
    precision={0.5}
    readOnly // Make it read-only, not clickable
    style={{
      fontSize: '30px',
      marginBottom: '10px',
      color:'#006DA3'
    }}
  />
  <div className="description" style={{ wordWrap: 'break-word', marginBottom: '20px' }}>
    {product.description}
  </div>
  <h3 className="price">
   Price: {product.price} EGP
  </h3>
</div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Add to cart button in modal */}
        <div className="modal-footer-container">
        <div className="modal-footer-container-left">
        <Rating value={currUserRating} onChange={changeOrEditRating}></Rating>
        {success && <p>{success}</p>}
        </div>
        <div className="modal-footer-container-right">
        <Button className="addtocart" onClick={() => addCart(product)}>
          ADD TO CART
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        </div>
        </div>
      </Modal.Footer>
    </Modal>

    <Modal show={isModalOpen2} onHide={closeModal2} dialogClassName="custom-modal">
      <Modal.Body>
        <h4>Product Added To Cart</h4>
      </Modal.Body>
    </Modal>

    </div>
  );
};

export default ProductDetails;
