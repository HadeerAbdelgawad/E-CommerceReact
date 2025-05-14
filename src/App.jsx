import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Products from './component/Products/Products'
import Cart from './component/Cart/Cart'
import Brand from './component/Brand/Brand'
import NotFound from './component/NotFound/NotFound'
import UserContextProvider from './Context/userContext'
import Profile from './component/Profile/Profile'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './component/ProductDetails/ProductDetails'
import CartContextProvider from './Context/cartContext'
import { Toaster } from 'react-hot-toast'
import About from './component/About/About'
import Checkout from './component/Checkout/Checkout'
import Allorders from './component/Allorders/Allorders'
import WhishListProvider from './Context/whishListContext'
import WishList from './component/WishList/WishList'
import ForgetPasswod from './component/ForgetPasswod/ForgetPasswod'
import ResetPassword from './component/ResetPassword/ResetPassword'
import ResetCode from './component/ResetCode/ResetCode'

function App() {
  let routers = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true, element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:'cart',element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:'brand',element:<ProtectedRoutes><Brand/></ProtectedRoutes>},
      {path:'profile',element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
      {path:'productDetails/:id',element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:'about',element:<ProtectedRoutes><About/></ProtectedRoutes>},
      {path:'checkout/:cardId',element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
      {path:'allorders' , element:<ProtectedRoutes><Allorders/></ProtectedRoutes>},
      {path:'wishlist' , element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
      {path:'*', element:<NotFound/>}
    ]},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'forgetPassword' , element:<ForgetPasswod/>},
    {path:'resetPass' , element:<ResetPassword/>},
    {path:'resetCode' , element:<ResetCode/>},



  ],
  {basename:'/E-CommerceReact/'}
)


  return (
    <>
      <WhishListProvider>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}/>
          <Toaster/>
        </UserContextProvider>
      </CartContextProvider>
      </WhishListProvider>
      
    
    
       
    
    </>
  ) 
}

export default App
