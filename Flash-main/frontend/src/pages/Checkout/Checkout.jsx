import React from 'react';
import { useEffect, useState } from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardImage, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
import "./CheckoutPage.css"
import { Link } from 'react-router-dom';


 function CheckoutPage(props) {
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
  
  useEffect(() => {
    getCartProducts();

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
                <p className="text-uppercase fw-bold mb-3 text-font" style={{color: "#4e4e4e", }}>Locate Me</p>
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
  }}>
  <Marker position={{ lat: userLocation.lat,
              lng: userLocation.lng}} />
</Map>
) : (
    <p>Loading map...</p>
  )}
</div>
{userLocation.lat && userLocation.lng && (
  <div>
 <p>
      <Link href={mapsLink} onClick = {() => openInNewTab(mapsLink)}>{mapsLink}</Link>

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
              
                <MDBInput label='Enter code' type='text' />
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}} >
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font" style={{color: "#4e4e4e", }}>Email address</p>
                <MDBRow>
                  
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-4 position-statics">
            <MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", marginTop:"-115%"}}>
              <MDBCardHeader className="py-3" style={{backgroundColor:"white"}}>
                <MDBTypography tag="h5" className="mb-0 text-uppercase fw-bold text-font" style={{color: "#4e4e4e", }}>
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
                
                <MDBTypography tag="h5" className="mb-0 text-font text-uppercase" style={{color: "#4e4e4e"}}>Delivery address</MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <MDBRow className="mb-4">
                    <MDBCol>
                        <label> First Name
                      <MDBInput  type='text'  />
                      </label>
                    </MDBCol>
                    <MDBCol>
                    <label> Last Name
                      <MDBInput  type='text' />
                      </label>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                  
                    <label> Phone 
                      <MDBInput  type='tel' className="mb-4" />
                      </label>
                    </MDBRow>
                    <MDBRow>
                  
                    <label> Address 
                      <MDBInput  type='text' className="mb-4" />
                      </label>
                    
                    </MDBRow>
                    <MDBRow>
                  
                  <label> Google Maps location 
                    <MDBInput  type='text' className="mb-4" value={mapsLink}/>
                    </label>
                  
                  </MDBRow>
                    <MDBRow>
                    <label> Additional information 
                  <MDBTextArea  rows={4} className="mb-4" />
                  </label>
                  </MDBRow>
                  <div className="d-flex justify-content-center">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckChecked' label='Save information for next order?' defaultChecked />
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
         
            <MDBCard className="mb-4"  style={{  border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}} >
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font" style={{color: "#4e4e4e", }}>Payment Method</p>
                <MDBRow>
                  
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <div className="text-center">
              <MDBBtn className="mb-4 w-100 gradient-custom-3  col-md-10 text-uppercase h4 text-font">Place order</MDBBtn>
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



