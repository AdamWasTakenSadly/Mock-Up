import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect,useState } from "react"
import Cookie from 'js-cookie'
import Popup from '../../components/Popup/Popup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const handleLogOut=()=>{
  const response =  fetch ('/login/logout')
  console.log(response.json)
  window.location.href="/"

}
var isCountryChosen=false



function Navbar1() {
  const [isGuest,setIsGuest] = useState(null)
  const [userId,setUserId]=useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [search,setSearch] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [isCartPopoverOpen, setCartPopoverOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);




  const getCartProducts = async () => {
    try {
      
      const response = await fetch('/products/getCartProducts'); 
      if (response.ok) {
        const cartProductsData = await response.json();
        setCartProducts(cartProductsData); 
        console.log(cartProductsData)
      }
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  };


 


useEffect(() => {
  // Fetch the user's cart products when the popover is opened
  if (isCartPopoverOpen) {
    getCartProducts(); // Call the function to fetch cart products
  }
}, [isCartPopoverOpen]);


useEffect(() => {
  try {
    const token = Cookie.get('jwt');
    console.log("here");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    setIsLoggedIn(false);
  }
}, []);


      const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
      };


      const goToCoursesGuest = async (e)=>{
        window.location.href='/courses/search/guest?search='+search;      
      }
    
  return (
     
<div>
<div
    style={{
      backgroundColor: "#006DA3", // Blue color
      color: "white",
      padding: "5px 0 10px 0",
      textAlign: "center",
      fontFamily: "Montserrat",
      fontSize: "15px",
      height: "30px",

    }}
  >
    Get 10% off your First Order
  </div>
  <Navbar
      className="nav"
      expand="lg"
      style={{
        backgroundImage: "linear-gradient(to bottom, #D8E7F7, #FFFFFF)",
        boxShadow: "none",
      }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <Nav.Link  href={"/shop"} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"25px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> Products</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> About</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> FAQ</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> Blog</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> Contact</Nav.Link>
          </Nav>
          <Navbar.Brand href={"/"} className="mx-auto">
  <img width="60%" src="/swan.png" alt="Logo" />
</Navbar.Brand>


          <Nav.Link
            href="/shop"
            style={{
              color: "white",
              fontFamily: "Montserrat",
              backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
              fontSize: "18px",
              width: "170px",
              height: "50px",
              padding: "0px 0px 0px 0px",
              borderRadius: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "120px",
              marginTop: "40px",
            }}
          >
            Shop Now
          </Nav.Link>

          <Nav.Link
            href=""
            style={{
              backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
              width: "60px",
              height: "50px",
              borderRadius: "40px",
              marginLeft: "25px",
              padding: "13px 0px 0px 16px",
              marginTop: "40px",
            }}
          >
            <img width="60%" src="/search.png" alt="Search" />
          </Nav.Link>
  {/* If the user is a guest, show the login icon */}
  {!isLoggedIn && (
            <Nav.Link
              href="/login"
              style={{
                backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
                width: "60px",
                height: "50px",
                borderRadius: "40px",
                marginLeft: "25px",
                padding: "10px 0px 0px 16px",
                marginTop: "40px",
              }}
            >
              <img width="65%" src="/login.png" alt="Login" />
            </Nav.Link>
          )}
          {isLoggedIn && (
              <OverlayTrigger
              trigger="click"
              placement="bottom"
              show={isCartPopoverOpen}
              onToggle={(nextOpen) => setCartPopoverOpen(nextOpen)}
              overlay={
                <Popover id="cart-popover">
                  <Popover.Header
                    as="h3"
                    style={{
                      backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
                      color: "white", // Text color
                      fontSize: "18px", // Font size
                      fontFamily: "Montserrat", // Font family
                      padding: "10px", // Padding
                      borderRadius: "0px", // Border radius
                    }}
                  >
                    Your Cart
                  </Popover.Header>
                  <Popover.Body>
                    {cartProducts.length === 0 ? (
                      <p>No items in the cart.</p>
                    ) : (
                      <ul>
                        {cartProducts.map((product, index) => (
                          <li key={index}>
                            <div>
                              <img src={product.image} alt={product.productName} />
                              <span>{product.name}</span>
                              <span>${product.price}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Popover.Body>
                </Popover>
              }
            >
             
              <Nav.Link
                href=""
                style={{
                  backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
                  width: "60px",
                  height: "50px",
                  borderRadius: "40px",
                  marginLeft: "25px",
                  padding: "13px 0px 0px 15px",
                  marginTop: "40px"
                }}
              >
                <img
                  width="60%"
                  src="/cart.png"
                  alt="Cart"
                  onClick={() => setCartPopoverOpen(!isCartPopoverOpen)}
                />
              </Nav.Link>
            </OverlayTrigger>
          )}

        
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   

    
   
    
  );
}

export default Navbar1;