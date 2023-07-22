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


  const fetchID = async () => {
    const response = await fetch('/login/userId')
    const json = await response.json()

    //console.log(json.id)

    if (response.ok) {
        setUserId(json.id)
    }
}
 
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
     
<div>
    <Navbar className="nav"  expand="lg"  >
      <Container fluid             style={{ maxHeight: '120px'}} >
      {isGuest&&  <Navbar.Brand href="/"><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}
      {!isGuest&& <Navbar.Brand href={"/individualTrainee/"+userId}><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}

       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

        { <Form className="d-flex">
            <input
              type="text"
              placeholder="  Search for courses"
              className="me-2"
              aria-label="Search"
              style={{ width:'750px',borderRadius:'25px',borderColor:'black'}}
              onChange={handleChange}
              value={search}
            />

           
            { <Button className="generalbutton" style={{ width:'125px' ,borderRadius:'25px'} } onClick={goToCoursesGuest} >
              Search
            </Button>}
          </Form>}
         
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
  {isGuest && <Nav.Link  href={"/guest/courses"} style={{   color:'#2f3cbc',fontSize:'18px',marginLeft:"10px"}}>  All courses</Nav.Link>}

          {isGuest&&  <Nav.Link href="/Login" style={{ color:'#647cd6', fontSize:'18px' ,marginLeft:"5px"}}>Login<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nGNgGAWUAp+U3Ud9U/f8Jwmn7DlMtAW+pBoOxSRbwEAj9Qw0twAV/Gf0yN3Gx0ArC3xSd3f4puy5Hpi2XZLqFvglHeH1Sd19EWrA5cCMnWJUtQAEvDMPC/qm7j4DTYpYfYLXAlKTok/KntO0tSB1z3GSLCAEfJP3iPuk7L4KCaLdF3zS9otQzYLQrP08Pqm7b8AMD8jeLYzVERT5IHVPGS6XU8UCEAgtPMbJMKSKCl96WeBLs+I6Zc9h0i3YfYhoCxhGPAAA6gtUOhPa4lkAAAAASUVORK5CYII="></img></Nav.Link>}
          {isGuest&& <Nav.Link href="/Signup" style={{  color:"white",backgroundColor:'#fa7465',fontSize:'18px',marginLeft:"10px",borderStyle:"solid",borderRadius:"5px",borderWidth:"1px" }}>Join Us</Nav.Link> }
         
        
      {!isGuest && <img height="40px" style={{  marginRight:"-15px",marginLeft:"10px"  }} src="data:image/png;base64,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"></img>}
         
{!isGuest  &&  

<Nav.Link onClick={handleLogOut} style={{ color:'#647cd6', fontSize:'18px', marginLeft:"5px",marginTop:"4px"}}>
                Logout   <img style={{ marginLeft:"10px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABc0lEQVR4nN2Wu0oDURCG06igjY9g4aMIBolgYTITEezSmZlgYWlKGwsVO5voeyho5/wxMVhZegEVxNgJCsqsJua2JNlEEAcGdouZ75ydy7+xdNbmSHHDio9enRQvpHa4IqXJWDfz5CSoeACpPTclEyuzYosVm41OYnus9sqCg66A4ERieX+Or16NURYJVhR+YPaY1uJ828EEOyyo9gVotBqMFCUWu20HWN5jIwO6JaJ/ByApTZHaHastDgXAYmlSu6i9JzcuR1nshAVvTZCogE6WyGCcBUeseKccliIDkrnidErPZjp5WrBAivv6TaIAKPjWPUy94Olv3iDMltfKE6w49hp4EwzeRYJK0+QrTofWRfTbc0D/blWEWuQiK3YH0oNWAImt112x3bOieeVJcO7i4q0WBuAWTfbkPWmyy6HL4ldgIJOFRhj1MWihlslghHPFOCv2fX9875Fq8CMgqLDgeiBAKywlmHUYiT14codHTfgJDeoKBjyL+WYAAAAASUVORK5CYII="></img>
                </Nav.Link>}


          
           </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   
</div>

    
   
    
  );
}

export default Navbar1;