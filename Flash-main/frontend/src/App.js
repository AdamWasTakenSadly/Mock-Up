
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//pages and components

import Navbar1 from './components/Navbar/Navbar'

import Login from './pages/Login/Login'
import CreateProduct from './pages/AdminCreateProduct/CreateProduct'
import ProductsAdmin from './pages/ProductsAdmin/ProductsAdmin'
import AdminEdit from './pages/AdminEditProduct/AdminEdit'
import AdminLogs from './pages/AdminLogs/AdminLogs'
import ProductsWM from './pages/ProductsWM/ProductsWM'

import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

import SignUp from './pages/SignUp/SignUp'

import AccessDenied from './pages/AccessDenied'
import Cookie from 'js-cookie'
import Shop from './pages/ShopPage/Shop'
import CheckoutPage from './pages/Checkout/Checkout'


function App() {

  let isLoggedIn = Cookie.get('jwt')

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar1 />

        <div className='pages'>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path ='/shop' element ={<Shop/>}/> 
            <Route path ='/adminCreate' element ={<CreateProduct/>}/>
            <Route path ='/adminProducts' element ={<ProductsAdmin/>}/>
            <Route path ='/adminEdit' element ={<AdminEdit/>}/>
            <Route path ='/adminLogs' element ={<AdminLogs/>}/>
            <Route path ='/WMProducts' element ={<ProductsWM/>}/>
           


            {isLoggedIn==undefined?
            (
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} /> 
              
            </Route>
            )
            : 
            
            (
              <Route>
              <Route path ='/checkout' element ={<CheckoutPage/>}/>

            <Route path="/" element={<Home />} />
            </Route>

            )
          }
            
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
