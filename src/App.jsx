import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Products from './component/Products/Products'
import Cart from './component/Cart/Cart'
import Brand from './component/Brand/Brand'
import NotFound from './component/NotFound/NotFound'
import CounterContextProvider from '../src/Context/counterContext'
import UserContextProvider from './Context/userContext'

function App() {
  let routers = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true, element:<Products/>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'cart',element:<Cart/>},
      {path:'brand',element:<Brand/>},
      {path:'*', element:<NotFound/>}
    ]}
  ],
  {basename:'/E-CommerceReact/'}
)


  return (
    <>
    <UserContextProvider>
      <CounterContextProvider>
        <RouterProvider router={routers}/>
      </CounterContextProvider>
    </UserContextProvider>
    
    </>
  ) 
}

export default App
