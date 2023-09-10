import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";
import "./Order.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal } from 'react-bootstrap';
import React from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardHeader
  } from 'mdb-react-ui-kit';




const OrderCard = ({ order }) => {
    const [showModal, setShowModal] = useState(false);
    const [orderID, setId] = useState(order._id)
    const [orderStatus, setOrderStatus] = useState("")
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (orderStatus != "") {
          handleStatus();
        }
      }, [orderStatus]);

    const handleStatus = async (e) => {
       
        const order = {
          orderStatus,
          }
          const response = await fetch ("/orders/status/" + orderID,{
              method: 'PATCH',
              body:JSON.stringify(order),
              headers: {
                  'Content-Type':'application/json'
              }
          })

          const json = await response.json()

          if (response.status == 200){
              setOrderStatus("");
              window.location.href="/adminOrders"
          }
  }
  
    let buttons;
  
    if (order.orderStatus === "Pending") {
      buttons = (
        <>
          <button class="orderButton" onClick={handleShow}>Details</button>
          <button class="orderButton" onClick={() => {setOrderStatus("Delivering");}}>Mark as Delivering</button>
          <button class="orderButton" onClick={() => {setOrderStatus("Canceled");}}>Mark as Canceled</button>
        </>
      );
    } 
    else if (order.orderStatus === "Delivering") {
        buttons = (
          <>
          <button class="orderButton" onClick={handleShow}>Details</button>
          <button class="orderButton" onClick={() => {setOrderStatus("Shipped");}}>Mark  as Shipped</button>
          <button class="orderButton" onClick={() => {setOrderStatus("Canceled");}}>Mark as Canceled</button>
          </>
        );
      }
    else if (order.orderStatus === "Shipped") {
      buttons = (
        <>
          <button class="orderButton" onClick={handleShow}>Details</button>
          <button class="orderButton" onClick={() => {setOrderStatus("Canceled");}}>Mark as canceled</button>
        </>
      );
    } else if (order.orderStatus === "Canceled") {
      buttons = (
        <button class="orderButton" onClick={handleShow}>Details</button>
      );
    }

   
  
    return (
      <div>
      <MDBCard shadow='0'  background='white' className='order-card mb-3'>
        <MDBCardBody>
          <MDBCardTitle style={{color:"#006da3", padding:"10px"}}>{order.orderFirstName + order.orderLastName}</MDBCardTitle>
          <MDBCardText>
            {buttons}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
  
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="description" style={{ wordWrap: 'break-word', marginBottom: '20px' }}>
          Order ID: {orderID}
          </div>
          <div className="description" style={{ wordWrap: 'break-word', marginBottom: '20px' }}>
          Date: {order.orderDate}
          </div>
          <div className="description" style={{ wordWrap: 'break-word', marginBottom: '20px' }}>
          Total Amount: {order.totalAmount}
          </div>
          <div className="description" style={{ wordWrap: 'break-word', marginBottom: '20px' }}>
          Payment Type: {order.paymentType}
          </div>
          <div className="description" style={{ wordWrap: 'break-word', marginBottom: '20px' }}>
          Ordered Products: 
          <ul>
        {order.orderProducts.map((product) => (
          <li key={product._id}>
            Product ID: {product.product}, Quantity: {product.quantity}
          </li>
        ))}
      </ul>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <button class="orderButton" onClick={handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default OrderCard;
