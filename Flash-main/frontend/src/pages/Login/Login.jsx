
import React from 'react'
import { useState,useEffect } from 'react';
//import {
   // MDBBtn,
   // MDBContainer,
    //MDBRow,
    //MDBCol,
    //MDBCard,
    //MDBCardBody,
   // MDBInput,
   // MDBIcon
  //}
  //from 'mdb-react-ui-kit';
 // import {
  //  MDBBtn,
  //  MDBContainer,
   // MDBRow,
   // MDBCol,
   // MDBInput
  //}
 // from 'mdb-react-ui-kit';
  //import Overlay from "react-overlay-component";
 // import useCollapse from 'react-collapsed';

 import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';


const Login =()=>{


    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
   // const [newPassword,setNewPassword]=useState("")
    const [error,setError] = useState (null)
    
    const [data,setData]=useState(null) 
    

   // const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
        setError(null)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
       // setFirstLoginError(null)
        setError(null)
    }

   // const handleNewPasswordChange=(event)=>{
    // setNewPassword(event.target.value)
     // setError(null)
 // }

    const handleLogin =async()=>{

        if(username==="")
        {
            setError("Please enter a username")
        }
        else if(password==="")
        {
            setError("Please enter a password")
        }
        else
        {
            const response =  fetch("/login",
            {
             method:'POST',
             body: JSON.stringify({
                username: username,
                password:password
              }),
            headers:{
                 'Content-Type':'application/json'
             }
             }).
             then((response) => response.json())
             .then((data) => 
             {
              if(!data.id) {
                setError(data.msg)
              }
              else{
                //console.log(data);
                setData(data)
                // Handle data
               //window.location.href="/"+data.id 
               window.location.href="/"
              }
             })
             .catch((err) => {
                console.log(err.message);
             });
        }
       
    } 

      const handleSignUp =async()=>{
        window.location.href="/signup"
      }
        


    //const checkboxHandler = () => {
     // setFirstLoginError(null)
     // setAgree(!agree);
  //  }


    return (

     
      <MDBContainer fluid className='my-5'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>
            <div className="text-center">
        <img src="/logo.png"
          style={{width: '185px'}} alt="logo"
           />
      </div>
              <h2 className="fw-bold mb-5" style={{ color: '#006DA3' }}>Log In</h2>

              <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' size="lg" onChange={handleUsernameChange} value={username}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} value={password}/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className="mb-4 w-100 gradient-custom-2" size='lg' onClick={handleLogin}>Log In</MDBBtn>
              {error && <p style={{color:"#8B0000"}}>{error}</p>}
              <div className="text-center">

               

            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="/signup" class="link-info">Register here</a></p>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src="t.jpg" class="w-100 rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>
     </MDBContainer> 

      );

}

export default Login