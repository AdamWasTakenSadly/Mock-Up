
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//pages and components

import Navbar1 from './components/Navbar/Navbar'


import AllCoursesGuest from './pages/AllCoursesGuest/AllCoursesGuest'
import Login from './pages/Login/Login'



import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

import SearchCoursesGuest from './pages/SearchCoursesGuest/SearchCoursesGuest'

import SignUp from './pages/SignUp/SignUp'
import ForgetPassword from './pages/forgetPassword/ForgetPassword'
import ChangePassword from './pages/changePassword/ChangePassword'
import AccessDenied from './pages/AccessDenied'
import Cookie from 'js-cookie'
import Shop from './pages/ShopPage/Shop'



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar1 />

        <div className='pages'>

          <Routes>


            <Route path="/" element={<Home />} />

                
                  <Route path="/guest/courses" element={<AllCoursesGuest />} />
                  
                  <Route path="/courses/search/guest" element={<SearchCoursesGuest />} />
                  <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<SignUp />} />
                 <Route path='reset-password/:id' element={<ChangePassword />} />
                 <Route path='user/write-email' element={<ForgetPassword />} />
                 <Route path ='/shop' element ={<Shop/>}/>


            <Route path="*" element={<AccessDenied />} />


          </Routes>
        </div>
      
        <Footer />
      </BrowserRouter>

    </div>
  );
}

//npm i react-local-currency --legacy-peer-deps
//npm i babel-runtime
//npm i react-simple-star-rating
//npm install @material-ui/icons --legacy-peer-deps
//npm install reactstrap bootstrap
//npm install @syncfusion/ej2-react-inputs
//npm install --save react-overlay-component
// npm i react-collapsed --legacy-peer-deps
// npm i jspdf --save
//npm i @material-ui/core --legacy-peer-deps
//npm i @material-ui/icons --legacy-peer-deps
// npm i @coreui/react-pro

export default App;
