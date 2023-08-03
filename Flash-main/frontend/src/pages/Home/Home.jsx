import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import './Home.scss'
var bg = require("./bg.jpeg")

const Home =() => {
  const shopNow =async()=>{
    window.location.href="/shop"
  }

    return (
      <body>
      <div class="image-container">
        <div class="left-image">
          <img src="ingredients.jpg" alt="Left Image"/>
          <div class="overlay-container" style={{ top: '450px', left: '50px'}}>
        <div class="overlay-text" style={{color: '#033466', fontSize:'40px'}}>
        Organic & Natural Cosmetic Products to Treat  your Skin
        </div>
        <div class="overlay-text" style={{color: '#FFDC8B', fontSize:'28px', width:'380px'}}>
        Natural Handmade Products Made with Love
        </div>
        <button class="overlay-button" style={{opacity:'70%', top: '210px',left:'100px'}}>About Us</button>
        </div>
        </div>
        
        <div class="right-images">
          <img src="cellulitecream.jpg" alt="Right Image 1" style={{height:'700px', opacity:'90%'}}/>
          <img src="darkcircles.jpg" alt="Right Image 2" style={{height:'700px', opacity:'90%'}}/>
          <div class="overlay-container" style={{ top: '700px', left: '650px'}}>
        <div class="overlay-text" style={{color: '#033466', fontSize:'40px',marginTop:"-40%"}}>
        Cellulite Cream
        </div>
        <div class="overlay-text" style={{color: '#033466', fontSize:'20px', width:'380px',marginLeft:"60%"}}>
          (Best Seller)
        </div>
        <button class="overlay-button" style={{opacity:'70%', top:'100px', left:'150px',marginTop:"-30%"}} onClick={shopNow}>Get Now</button>
        </div>

        <div class="overlay-container" style={{ top: '1350px', left: '730px'}}>
        <div class="overlay-text" style={{color: '#033466', fontSize:'40px',marginTop:"-30%"}}>
        Dark Circles Eye Cream
        </div>
        <button class="overlay-button" style={{opacity:'70%', top:'70px', left:'80px',marginTop:"-20%"}}  onClick={shopNow}>Get Now</button>
        </div>
        </div>
      </div>
   <div class="blue-bar">
    <p class="blue-bar-text">Non Toxic</p>
    <p class="blue-bar-text">Paraben Free</p>
    <p class="blue-bar-text">Non GMO</p>
    <p class="blue-bar-text">Not Tested On Animals</p>
    <p class="blue-bar-text">Cruelty Free</p>
  </div>
  <div class="image-container">
        <div class="bottom-image">
          <img src="bundles.jpg" alt="Left Image"/>
          <div class="overlay-container" style={{ top: '1830px', left: '800px'}}>
        <div class="overlay-text" style={{color: '#1E6BB7', fontSize:'60px'}}>
        Joy Bundles!
        </div>
        <div class="overlay-text" style={{color: '#FFDC8B', fontSize:'25px', width:'400px'}}>
        Shop our ready made kits, the perfect gift for your loved ones.
        </div>
        <button class="overlay-button2" style={{top: '185px',left:'110px'}}  onClick={shopNow}>Get Now</button>
        </div>
          </div>
          </div>
          <p style={{color:'#1E6BB7', fontSize:'40px', fontWeight:'bold', marginTop:'70px'}}>Customer Feedback</p>
          <div class="blue-gradient-container">
          <p style={{color:'#033466', fontSize:'20px', fontWeight:'bold',position:'relative', top:'160px', left:'250px', textDecoration:'underline'}}>Bella Hadid</p>
          <p style={{color:'#033466', fontSize:'20px', fontWeight:'bold',position:'relative', top:'110px', left:'850px', textDecoration:'underline'}}>Anne Hathaway</p>
          <div class="blue-gradient-container2" style={{position:'relative', top:'100px', left:'250px'}}>
          <Rating
         name="simple-controlled"
         style={{marginTop:'10px', marginLeft:'20px'}}
         />
                            <p style={{color:'#FDC33C', fontSize:'30px', fontWeight:'bold', marginLeft:'15px',marginBottom:"-4%"}}>“</p>
          <p style={{color:'#033466', fontSize:'15px', fontWeight:'bold', marginLeft:'10px',textAlign:"center"}}>The products are really effective, definitely not the last purchase</p>
          <p style={{color:'#FDC33C', fontSize:'30px', fontWeight:'bold', marginLeft:'90%',marginTop:"-6%"}}>“</p>
          </div>
          <div class="blue-gradient-container2" style={{position:'relative', bottom:'52px', left:'850px'}}>
          <Rating
         name="simple-controlled"
         style={{marginTop:'10px', marginLeft:'20px'}}
         />
                   <p style={{color:'#FDC33C', fontSize:'30px', fontWeight:'bold', marginLeft:'15px',marginBottom:"-4%"}}>“</p>
          <p style={{color:'#033466', fontSize:'15px', fontWeight:'bold', marginLeft:'10px',textAlign:"center"}}>Amazing Products, Recommend!</p>
          <p style={{color:'#FDC33C', fontSize:'30px', fontWeight:'bold', marginLeft:'90%',marginTop:"-4%"}}>“</p>

          </div>
          </div>
          
    </body>

    
        )
    }
    
export default Home