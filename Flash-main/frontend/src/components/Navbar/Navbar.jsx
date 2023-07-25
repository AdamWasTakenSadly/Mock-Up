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
      }
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  };

  const fetchID = async () => {
    const response = await fetch('/login/userId')
    const json = await response.json()

    //console.log(json.id)

    if (response.ok) {
        setUserId(json.id)
    }
}
 


useEffect(() => {
  // Fetch the user's cart products when the popover is opened
  if (isCartPopoverOpen) {
    getCartProducts(); // Call the function to fetch cart products
  }
}, [isCartPopoverOpen]);

    useEffect(()=>{
       
      
        let role=Cookie.get('role')
        console.log(role)
            if (role === undefined)
                {
                  setIsGuest(true)
                }
              
              else{
                setIsGuest(false)
                fetchID()
              }


       
       },[])
       const [errorMessage, setErrorMessage] = useState('');



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
      height: "30px"

    }}
  >
    Get 10% off your First Order
  </div>
<Navbar className="nav" expand="lg" style={{
      backgroundImage: "linear-gradient(to bottom, #D8E7F7, #FFFFFF)",
      boxShadow: "none"
    }}>

       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

      
         
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >

   <Nav.Link  href={"/guest/courses"} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"25px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> Products</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> About</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> FAQ</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> Blog</Nav.Link>
  <Nav.Link  href={""} style={{   color:'#006DA3',fontSize:'24px',marginLeft:"15px",marginTop:"40px",
    fontFamily: 'Montserrat'}}> Contact</Nav.Link>
  <Navbar.Brand style={{marginLeft:"180px"}}><img width="60%"  src="/swan.png"/>  </Navbar.Brand>


  <Nav.Link
  href="/guest/courses"
  style={{
    color: "white",
    fontFamily: 'Montserrat',
    backgroundImage: "linear-gradient(to bottom,  #0099D3, #006DA3)",
    fontSize: '18px',
    width: "170px", // Set the width
    height: "50px", // Set the height
    padding: "0px 0px 0px 0px", // Adjust the padding as needed
    borderRadius: "40px", // Set the border radius
    display: "flex", // Use flex display to apply gap
    alignItems: "center", // Center the text vertically
    justifyContent: "center",
    marginLeft: "120px",
    marginTop: "40px",
  }}
>
  Shop Now
</Nav.Link>

    
<Nav.Link
  href=""  style={{
    backgroundImage: "linear-gradient(to bottom,  #0099D3, #006DA3)",
    width: "60px", // Set the width
    height: "50px", // Set the height
    borderRadius: "40px", // Set the border radius,
    marginLeft:"25px",
    padding: "13px 0px 0px 16px",marginTop:"40px"
  }}><img width="60%" src="/search.png"/>  </Nav.Link>     
         

         {isGuest  &&     <Nav.Link
  href="/login"  style={{
    backgroundImage: "linear-gradient(to bottom,  #0099D3, #006DA3)",
    width: "60px", // Set the width
    height: "50px", // Set the height
    borderRadius: "40px", // Set the border radius,
    marginLeft:"25px",
    padding: "10px 0px 0px 16px",marginTop:"40px"
  }}><img width="65%" src="/login.png"/>  </Nav.Link>  }


         {!isGuest  &&
         <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={isCartPopoverOpen}
      onToggle={(nextOpen) => setCartPopoverOpen(nextOpen)}
      overlay={
        <Popover id="cart-popover">
          {}
          <Popover.Header
            as="h3"
            style={{
              backgroundImage: "linear-gradient(to bottom, #0099D3, #006DA3)",
              color: "white", 
              fontSize: "18px", 
              fontFamily: "Montserrat", 
              padding: "10px", 
              borderRadius: "0px", 
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
                    {}
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
      {/* Your cart trigger goes here */}
      {/* This could be a cart icon or button */}
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
}
          
           </Nav>
         
        </Navbar.Collapse>
    </Navbar>
    </div>
   

    
   
    
  );
}

export default Navbar1;