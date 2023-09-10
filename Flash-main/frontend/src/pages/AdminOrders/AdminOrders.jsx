import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import "./AdminOrders.scss";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const ProductsAdmin = () => {
  const params = new URLSearchParams(window.location.search);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);
  const [delivering, setDelivering] = useState(null);
  const [shipped, setShipped] = useState(null);
  const [canceled, setCanceled] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');

  useEffect(() => {
    fetchPending();
    fetchDelivering();
    fetchShipped();
    fetchCanceled();
  }, []);


  const fetchPending = async () => {

    try {
      const response = await fetch("/orders/pending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        console.log(json);
        setError(json.error);
      } else {
        const json = await response.json();
        console.log(json);
        setError(null);
        setPending(json);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchDelivering = async () => {
    
    try {
      const response = await fetch("/orders/delivering", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        console.log(json);
        setError(json.error);
      } else {
        const json = await response.json();
        console.log(json);
        setError(null);
        setDelivering(json);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchShipped= async () => {
    
    try {
      const response = await fetch("/orders/shipped", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        console.log(json);
        setError(json.error);
      } else {
        const json = await response.json();
        console.log(json);
        setError(null);
        setShipped(json);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchCanceled = async () => {
    
    try {
      const response = await fetch("/orders/canceled", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        console.log(json);
        setError(json.error);
      } else {
        const json = await response.json();
        console.log(json);
        setError(null);
        setCanceled(json);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <div className="tabsContainer">
      <div className="tabsHeader">
        <div 
          className={activeTab === 'tab1' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('tab1')}
        >
          Pending
        </div>
        <div 
          className={activeTab === 'tab2' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('tab2')}
        >
          Delivering
        </div>
        <div 
          className={activeTab === 'tab3' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('tab3')}
        >
          Shipped
        </div>
        <div 
          className={activeTab === 'tab4' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('tab4')}
        >
          Canceled
        </div>
      </div>
      <div className="tabsContent">
        {activeTab === 'tab1' && <div className="order-card-container"> {pending &&
            pending
              .map((order) => (
                <Order key={order._id} order={order} />
              ))}
              </div>}
        {activeTab === 'tab2' && <div className="order-card-container"> {delivering &&
            delivering
              .map((order) => (
                <Order key={order._id} order={order} />
              ))}
              </div>}
        {activeTab === 'tab3' && <div className="order-card-container"> {shipped &&
            shipped
              .map((order) => (
                <Order key={order._id} order={order} />
              ))}
              </div>}
        {activeTab === 'tab4' && <div className="order-card-container"> {canceled &&
            canceled
              .map((order) => (
                <Order key={order._id} order={order} />
              ))}
              </div>}
      </div>
    </div>
  </div>
  );
};

export default ProductsAdmin;
