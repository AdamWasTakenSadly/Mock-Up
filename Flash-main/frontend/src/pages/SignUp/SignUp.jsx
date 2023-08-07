
import React from 'react'
import { useState,useEffect } from 'react';
import "./signUp.scss";

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
  //import useCollapse from 'react-collapsed';


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
            const response =  fetch("/signup",
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
                window.location.href="/"
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
    const facebook=()=>{
      window.location.href="https://www.facebook.com/"
  }
  const google=()=>{
    window.location.href="https://www.google.com/"
}
const twitter=()=>{
  window.location.href="https://twitter.com/i/flow/login?redirect_after_login=%2F"
}
const github=()=>{
  window.location.href="https://github.com/login"
}

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
              <h2 className="fw-bold mb-5" style={{ color: '#006DA3' }}>Sign up now</h2>

              <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' size="lg" onChange={handleEmailChange} value={email}/>
              <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' size="lg" onChange={handleUsernameChange} value={username}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} value={password}/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <button className="sign-up"  onClick={handleSignUp}>Sign Up</button>
              {error && <p style={{color:"#8B0000"}}>{error}</p>}
              <div className="text-center">

                <p>or sign up with:</p>
               
               
               
               
                <button tag='a' color='none' className='mx-3' style={{ color: '#006DA3',border:"0",backgroundColor:"white"}}  onClick={facebook} >
                <i class="bi bi-facebook"></i>
                </button>

                <button tag='a' color='none' className='mx-3' style={{ color: '#006DA3',border:"0",backgroundColor:"white"}} onClick={google}>
                <i class="bi bi-google"></i>
                </button>

                <button tag='a' color='none' className='mx-3' style={{ color: '#006DA3',border:"0",backgroundColor:"white"}} onClick={twitter}>
                <i class="bi bi-twitter"></i>
                </button>

                <button tag='a' color='none' className='mx-3' style={{ color: '#006DA3',border:"0",backgroundColor:"white"}} onClick={github}>
                <i class="bi bi-github"></i>
                </button>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src="w.jpg" class="w-100 rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>
</MDBContainer> 
      );

}

export default SignUp