
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
  import Overlay from "react-overlay-component";
  import useCollapse from 'react-collapsed';


const Login =()=>{


    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [error,setError] = useState (null)
    
    const [data,setData]=useState(null) 
    

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
        setError(null)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
        setFirstLoginError(null)
        setError(null)
    }

    const handleNewPasswordChange=(event)=>{
      setNewPassword(event.target.value)
      setError(null)
  }

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
             .then((data) => {
              if(!data.id)
                setError(data.msg)
              else{
                //console.log(data);
                setData(data)
                // Handle data
                //window.location.href="/"+data.type+"/"+data.id 
              }
             })
             .catch((err) => {
                console.log(err.message);
             });
        }
    } 


    const checkboxHandler = () => {
      setFirstLoginError(null)
      setAgree(!agree);
    }


    return (
      <div >
        <MDBContainer fluid >
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className=' text-white my-5 mx-auto' style={{backgroundColor:"#647cd2",borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
    
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5" style={{textAlign:"center"}}>Please enter your username and password!</p>
    
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' size="lg" onChange={handleUsernameChange} value={username}/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} value={password}/>
    
                  <button style={{backgroundColor:"#d55b5c"}} outline className='generalbutton mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                    Login
                  </button>
                  {error && <p style={{color:"#8B0000"}}>{error}</p>}
    <br></br>
                  <div>
                    <p className="mb-0">Don't have an account? <a href="/signup" class="text-white-50 " >Sign Up</a></p>
    
                  </div>

                  <div>
                    <p className="mb-0"> <a href="/" class="text-white-50 " >Continue as guest</a></p>
                  </div>
                  <div>
                    <p className="mb-0"> <a href="/user/write-email" class="text-white-50 " >Forgot password ?</a></p>
                  </div>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
        </div>

      );

}

export default Login