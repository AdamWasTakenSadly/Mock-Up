
import React from 'react'
import { useState,useEffect } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
  import useCollapse from 'react-collapsed';


const SignUp =()=>{

    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("")
    const [email,setEmail] =useState("")
    const [error,setError] = useState (null)


    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
        setError(null)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
        setError(null)
    }
const handleEmailChange=(event)=>{
  setEmail(event.target.value)
  setError(null)
}


    const handleSignUp =async()=>{

       if( email==="" || username==="" || password==="")
        {
            setError("Please enter all fields")
        }
       
        else
        {
            const response =  fetch("/login/signup",
            {
             method:'POST',
             body: JSON.stringify({
                email:email,
                username: username,
                password:password,
              }),
            headers:{
                 'Content-Type':'application/json'
             }
             }).
             then((response) => response.json())
             .then((data) => {
              if(!data.id)
                setError(data.msg)
              else{
                console.log(data);
                // Handle data
                window.location.href="/"+data.type+"/"+data.id 
              }
             })
             .catch((err) => {
                console.log(err.message);
             });
        }
    } 

    const goToLogin=()=>{
        window.location.href="/login"
    }

    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className=' text-white my-5 mx-auto' style={{backgroundColor:"#647cd2",borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
    
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">Please enter your information.</p>

                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email' id='formControlLg' size="lg" onChange={handleEmailChange} value={email}/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' size="lg" onChange={handleUsernameChange} value={username}/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} value={password}/>

                  <div>
                  </div>
                  <br></br>
                  <button style={{backgroundColor:"#d55b5c"}} outline className='generalbutton mx-2 px-5' color='white' size='lg' onClick={handleSignUp} >
                    Sign Up
                  </button>
                  {error && <p style={{color:"#8B0000"}}>{error}</p>}
    <br></br>
                  <div>
                    <p className="mb-0">Already registered? <a href="/login" class="text-white-50 " onClick={goToLogin}>Login</a></p>
    
                  </div>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );

}

export default SignUp