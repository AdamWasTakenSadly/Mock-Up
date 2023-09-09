import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
//import RatingsView from "../RatingsView/RatingsView";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./productDetailsWM.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from '@mui/material/Rating';
import { Modal } from "react-bootstrap"; // Import the Modal component from react-bootstrap
import { useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



import React from "react";



const ProductDetails = ({ product }) => {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [ratings, setRatings] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [isModalOpen2, setIsModalOpen2] = useState(false); // State for modal open/close
  const [oldAmount, setOldLeft] = useState(product.amountLeft)
  const [newAmount, setNewAmount] = useState(product.amountLeft)
  const [amountLeft, setAmountLeft] = useState(product.amountLeft)
  const [productID, setId] = useState(product._id)
  const [productName, setProductName] = useState(product.name)
  const [action, setAction] = useState("Stock Editing")
  const [role, setRole] = useState("WM")

 

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

  const handleSave = async (e) => {
    e.preventDefault()
    if(amountLeft == ''){
      setError('Please Enter an Amount')
     
    }
    else{
      const product = {
        amountLeft,
        }
        const response = await fetch ("/products/"+ productID,{
            method: 'PATCH',
            body:JSON.stringify(product),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if (response.status == 400) {
            setError(json.error);
        }
        if (response.status == 200){
            handleLog();
        }
    }
}

const handleLog = async (e) => {
    if(newAmount == oldAmount)
    {
      window.location.href="/WMProducts"
    }
    else
    {
      const log = {
        productName,
        productID,
        action,
        role,
        oldAmount,
        newAmount
        }
        const response = await fetch ("/log/",{
            method: 'POST',
            body:JSON.stringify(log),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if (response.status == 400) {
            setError(json.error);
        }
        if (response.status == 200){
          window.location.href="/WMProducts"
        }
    }
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
          </Typography>
          <div className="amountLeft">{product.amountLeft} Left</div>
          <button  onClick={openModal}
           
          >Edit Amount</button>
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
  <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAmount">
            <Form.Label style={{color:"#006DA3"}}>new Amount</Form.Label>
            <Form.Control placeholder="Enter Amount" value={newAmount} onChange={(e) => setNewAmount(e.target.value) & setAmountLeft(e.target.value)}/>
          </Form.Group>
  </Row>
  {error && <div className="error" style={{color: "red", fontSize: "small"}}>{error}</div>}
</div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Add to cart button in modal */}
        <Button className="addtocart" onClick={handleSave}>
          Save Amount
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
