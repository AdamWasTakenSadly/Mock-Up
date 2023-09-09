import React from 'react';
import { useEffect, useState } from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardImage, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
import "./CheckoutPage.css"
import { Link } from 'react-router-dom';


 function CheckoutPage(props) {
  //order details
    const [firstName,setFirstName] =useState("")
    const [lastName,setLastName] =useState("")
    const [phone,setPhone] =useState("")
    const [products,setProducts] =useState([])
    const [totalAmount,setTotalAmount] =useState("")
    const [city,setCity] =useState("")
    const [street,setStreet] =useState("")
    const [region,setRegion] =useState("")
    const [buildingNo,setBuildingNo] =useState("")
    const [flatNo,setFlatNo] =useState("")
    const [floor,setFloor] =useState("")

    const [additionalInfo,setAdditionalInfo] =useState("")

    const [address, setAddress] = useState({
      link: '',
      street: '',
      city: '',
      region: '',
      buildingNo: '',
      floor: '',
      flatNo: '',
    });
    

    const [cartProducts, setCartProducts] = useState([]);
    const [mapsLink, setMapsLink] = useState('');
    const [userLocation, setUserLocation] = useState({
        lat: null,
        lng: null,
      });

     const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
      };

  const getCartProducts = async () => {
    try {
      const response = await fetch("/products/getCartProducts");
      if (response.ok) {
        const cartProductsData = await response.json();
        setCartProducts(cartProductsData);
        console.log(cartProductsData);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
      
  };

  

  const getUserNumber = async () => {
    try {
      const response = await fetch("/products/userNum");
      if (response.ok) {
        const unumber = await response.json();
        setPhone(unumber.phoneNumber);
        console.log(unumber);
      }
    } catch (error) {
      console.error("Error fetching user number:", error);
    }
      
  };

  const getUserAddress = async () => {
    try {
      const response = await fetch("/products/userAdd");
      if (response.ok) {
        const uadd = await response.json();
        setCity(uadd.location.city)
        setStreet(uadd.location.street)
        setRegion(uadd.location.region)
        setBuildingNo(uadd.location.buildingNo)
        setFlatNo(uadd.location.flatNo)
        setFloor(uadd.location.floor)
        setAddress(
          {
            street: uadd.location.street,
            city: uadd.location.city,
            region: uadd.location.region,
            buildingNo: uadd.location.buildingNo,
            floor: uadd.location.floor,
            flatNo: uadd.location.flatNo,
          }
        )


        console.log(uadd.location);
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
    }
      
  };


  const handleFnChange=(event)=>{
    setFirstName(event.target.value)
}

const handleLnChange=(event)=>{
  setLastName(event.target.value)
}

const handlePhoneChange=(event)=>{
  setPhone(event.target.value)
  }



const handleInfoChange=(event)=>{
  setAdditionalInfo(event.target.value)
}

const handleCityChange = (event) => {
  setAddress({
    ...address,
    city: event.target.value,
  });
  setCity( event.target.value);
};

const handleFlatChange = (event) => {
  setAddress({
    ...address,
    flatNo: event.target.value,
  });
  setFlatNo( event.target.value);

};

const handleFloorChange = (event) => {
  setAddress({
    ...address,
    floor: event.target.value,
  });
  setFloor( event.target.value);

};

const handleBNChange = (event) => {
  setAddress({
    ...address,
    buildingNo: event.target.value,
  });
  setBuildingNo( event.target.value);

};

const handleRegionChange = (event) => {
  setAddress({
    ...address,
    region: event.target.value,
  });
  setRegion( event.target.value);

};

const handleStreetChange = (event) => {
  setAddress({
    ...address,
    street: event.target.value,
  });
  setStreet( event.target.value);

};


  useEffect(() => {
    getCartProducts();
    getUserNumber();
    getUserAddress();

    // Get user's location
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            setUserLocation({
              lat: lat,
              lng: lng,
            });
            
            const link = `https://www.google.com/maps?q=${lat},${lng}`;
            setMapsLink(link);
            setAddress({...address,link:mapsLink})
            console.log(mapsLink)
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not available.');
      }
    }, []);
  
    useEffect(() => {
      // Calculate the total amount based on cart products
      const calculatedTotalAmount = cartProducts.reduce(
        (acc, cartItem) => acc + cartItem.productPrice * cartItem.quantity,
        0
      );
  
      // Map cart products to orderProducts format
      const mappedOrderProducts = cartProducts.map((cartItem) => ({
        product: cartItem.productID,
        quantity: cartItem.quantity,
      }));

      setProducts(mappedOrderProducts);
      setTotalAmount(calculatedTotalAmount);

    }, [cartProducts]);

    const addOrder = async () => {
      const orderDetails = cartProducts.map((product) => ({
        productId: product.productID,
        quantity: product.quantity,
      }));
    
      try {
        // Step 1: Send a POST request to create the order
        const response = await fetch("/orders/createOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderFirstName: firstName,
            orderLastName: lastName,
            orderPhone: phone,
            orderProducts: products,
            totalAmount: totalAmount,
            address: address,
            additionalInfo: additionalInfo,
          }),
        });
    
        if (response.ok) {
          // Handle successful order placement, e.g., show a success message
          alert("Your order has been placed successfully!");
    
          // Step 2: Call the deleteCart function to delete the user's cart
          const deleteCartResponse = await fetch(`/products/deleteCart`, {
            method: 'DELETE',
    
          });
          if (deleteCartResponse.ok) {
            // Clear the cart or perform other necessary actions
            console.log('User cart deleted successfully');
          } else {
            // Handle errors, e.g., show an error message
            console.error('Failed to delete user cart');
          }
    
       
          // Step 3: Send a POST request to deduct product quantities
          const response2 = await fetch("/products/deduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          });
    
          if (!response2.ok) {
            // Handle errors, e.g., show an error message
            alert("Failed to deduct product quantities. Please contact support.");
          }
    
          // Step 4: Redirect to the home page
          window.location.href = "/";
        } else {
          // Handle errors, e.g., show an error message
          alert("Failed to place your order. Please try again.");
        }
      } catch (error) {
        // Handle network errors or other issues
        console.error("Error placing the order:", error);
      }
    };
    

    const handleMapClick = (mapProps, map, clickEvent) => {
      const newLocation = {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
      };
      const link = `https://www.google.com/maps?q=${newLocation.lat},${newLocation.lng}`;
      setMapsLink(link);
      setUserLocation(newLocation);
    };
    
  return (
    <div style={{marginTop:"10%"}}>
    <MDBContainer className="my-5 py-5" style={{maxWidth: '1100px'}}>
    <h5 style={{}}>
  <a href="/shop" style={{ textDecoration: 'none', color: 'inherit'}}>
    <img width="2%" style={{ marginTop: "5px", marginRight: '5px' }} src="arrows.png" alt="Arrow" />
    Continue Shopping
  </a>
</h5>

      <section>
      <MDBCol md="8" className="mb-4">
<MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}} >
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font" style={{color: "#006DA3", }}>Locate Me</p>
                <MDBRow>    
<div style={{ height: '300px' }}>
{userLocation.lat && userLocation.lng ? (
<Map
  google={props.google}
  style={{ width: '95%', height: '70%' }}
  zoom={18}
  initialCenter={{
    lat: userLocation.lat,
    lng: userLocation.lng,
  }} onClick={handleMapClick}>
  <Marker position={{ lat: userLocation.lat,
              lng: userLocation.lng}} />
</Map>
) : (
    <p>Loading map...</p>
  )}
</div>
{userLocation.lat && userLocation.lng && (
  <div style={{marginTop:"30px"}}>
 <p>
 Please note that, incase of inaccuracy, you can click on your accurate location on the map to remark it.

    </p>   
  </div>
)}
</MDBRow>
              </MDBCardBody>
            </MDBCard>
            </MDBCol>
      <MDBRow>
        
            <MDBCol md="8">
            

            <MDBAccordion className="card mb-4 " style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}}>
              <MDBAccordionItem collapseId={1} className="border-0" headerTitle='Promo Code or Vouchers'>
              
                <MDBInput type='text' />
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}} >
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font" style={{color: "#006DA3", }}>Email address</p>
                <MDBRow>
                  
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-4 position-statics">
            <MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", marginTop:"-115%"}}>
              <MDBCardHeader className="py-3" style={{backgroundColor:"white"}}>
                <MDBTypography tag="h5" className="mb-0 text-uppercase fw-bold text-font" style={{color: "#006DA3", }}>
               Summary
                              <span className="float-end mt-1" style={{ fontSize: '13px' }}> {cartProducts.reduce(
                                (acc, product) =>
                                  acc +  product.quantity,
                                0
                              )} item(s)</span>
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
              {cartProducts.map((product, index) => (
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={product.productImage}
                      className="rounded-3" style={{ width: '100px' }} />
                  </MDBCol>
                  <MDBCol md="7" className="ms-3">
                  <p className="mb-0 text-descriptions">{product.productName}</p>

                    <span className="mb-0 text-price">{product.productPrice} LE</span>
                    
                    <p className="text-descriptions mt-0">
                      Qty:<span className="text-descriptions fw-bold">{product.quantity}</span>
                    </p>
                  </MDBCol>
                </MDBRow>
              ))}
              </MDBCardBody>
              <MDBCardFooter className="mt-4" style={{backgroundColor:"white"}}> 
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                    Subtotal
                    <span>{cartProducts.reduce(
                                (acc, product) =>
                                  acc + product.productPrice * product.quantity,
                                0
                              )} LE </span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                    Discount
                    <span>0 LE</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                    Total to pay
                    <span> {cartProducts.reduce(
                                (acc, product) =>
                                  acc + product.productPrice * product.quantity,
                                0
                              )} LE</span>
                  </MDBListGroupItem>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>

          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4" style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",  marginTop: "-13%" }}>
              <MDBCardHeader className="py-3" style={{backgroundColor:"white"}}>
                
                <MDBTypography tag="h5" className="mb-0 text-font text-uppercase" style={{color: "#006DA3"}}>Delivery address</MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <MDBRow className="mb-4">
                    <MDBCol>
                        <label> First Name
                      <MDBInput  type='text' onChange={handleFnChange} value={firstName} />
                      </label>
                    </MDBCol>
                    <MDBCol>
                    <label> Last Name
                      <MDBInput  type='text'onChange={handleLnChange} value={lastName} />
                      </label>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                  
                    <label> Phone 
                      <MDBInput  type='tel' className="mb-4" onChange={handlePhoneChange} value={phone}/>
                      </label>
                    </MDBRow>
                 
                    <MDBRow>
                  
                  <label> Google Maps location 
                    <MDBInput  type='text' className="mb-4" value={mapsLink}/>
                    </label>
                  
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                        <label> City
                      <MDBInput  type='text'  value={city} onChange={handleCityChange}/>
                      </label>
                    </MDBCol>
                    <MDBCol>
                    <label> Region
                      <MDBInput  type='text' value={region} onChange={handleRegionChange} />
                      </label>
                    </MDBCol>
                    </MDBRow>

<MDBRow className="mb-4">
                    
                    <label> Street
                      <MDBInput  type='text' value={street} onChange={handleStreetChange}/>
                      </label>
                    </MDBRow>

                    <MDBRow>
                    <MDBCol>
                    <label> Building Number
                      <MDBInput  type='text' value={buildingNo} onChange={handleBNChange}/>
                      </label>
                    </MDBCol>
                    <MDBCol>
                    <label> Floor
                      <MDBInput  type='text' value={floor} onChange={handleFloorChange}/>
                      </label>
                    </MDBCol>
                    <MDBCol>
                    <label> Flat Number
                      <MDBInput  type='text' value={flatNo} onChange={handleFlatChange}/>
                      </label>
                    </MDBCol>
                  </MDBRow>

                    <MDBRow style={{marginTop:"20px"}}>
                    <label> Additional information 
                  <MDBTextArea  rows={4} className="mb-4" onChange={handleInfoChange} value={additionalInfo}/>
                  </label>
                  </MDBRow>
                
                </form>
              </MDBCardBody>
            </MDBCard>
         
            <MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}} >
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font" style={{color: "#006DA3", }}>Payment Method</p>
                <MDBRow>
                  
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <div className="text-center">
              <MDBBtn onClick={addOrder} className="mb-4 w-100 gradient-custom-3  col-md-10 text-uppercase h4 text-font">Place order</MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>

           
      </section>
    </MDBContainer>
    </div>
  );
}
export default GoogleApiWrapper({
    apikey:'AIzaSyBKfTbSbGDh04PvDKB9eGo7U4M767KJrs8'
})(CheckoutPage)



