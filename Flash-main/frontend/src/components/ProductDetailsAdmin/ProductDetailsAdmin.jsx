import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
//import RatingsView from "../RatingsView/RatingsView";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./productDetailsAdmin.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from '@mui/material/Rating';
import { Modal } from "react-bootstrap"; // Import the Modal component from react-bootstrap
import { useNavigate} from 'react-router-dom';


import React from "react";



const ProductDetails = ({ product }) => {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [ratings, setRatings] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [isModalOpen2, setIsModalOpen2] = useState(false); // State for modal open/close

 

  useEffect(() => {
    if (isInitialRender) {
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
          <button  onClick={(e) => {
            navigate(`/adminEdit?id=${product._id}`) }}
          >Edit Product</button>
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
        <Button className="addtocart" onClick={(e) => {
            navigate(`/adminEdit?id=${product._id}`) }}>
          Edit Product
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    
    </div>
  );
};

export default ProductDetails;
