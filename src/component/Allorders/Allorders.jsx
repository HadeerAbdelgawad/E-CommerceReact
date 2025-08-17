import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import truck from '../../assets/truck.mp4'
import styles from './AllOrders.module.css'


function Allorders() {
    const token = localStorage.getItem('UserToken')
    const decoded = jwtDecode(token)
    const userId = decoded.id
    let [isloading, setLoading]= useState(true)
    let [orders,setOrders]= useState([])
    let [cardItems,setCartItems]= useState([])



    async function getUserOrder() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
            {
                headers: {
                    token: token
                }
            }
        )
        .then((response)=>{
            console.log('order',response.data);

            const orders = response.data; 
            const allCartItems = orders.flatMap(order => order.cartItems);
            console.log('allCartItems',allCartItems);
            setCartItems(allCartItems)

            setOrders(response.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false)
        })        
    }

    useEffect(()=>{
        getUserOrder()
    },[])
    return <>
        {!isloading ? (
            <div className="p-5">
              <div className={`animycontainer ${styles.animycontainer} flex flex-row flex-wrap`}>
                <div>
                  <h1 className='text-3xl font-medium'>All Orders</h1>
                </div>
                <div className='mb-20'>
                  <video src={truck} className={`deliver w-15 ${styles.deliver}`} autoPlay muted loop></video>
                </div>
              </div>
              
      
              <div className="grid md:grid-cols-2 lg:grid-cols-5 sm:grid-col-1 grid-rows-1 gap-4 hover:cursor-pointer">
                {cardItems && cardItems.length > 0?(<>
                  {cardItems.map((item)=>{
                    return(
                      <div key={item._id} className="productDiv flex flex-col h-full">
                      <div className=" productCard shadow-sm shadow-gray-400 rounded-2xl hover:shadow-2xl transition-all duration-300 ease h-[100%]">
                        <img src={item.product.imageCover} alt={item.product.title} className="rounded-2xl" />
                        <div className="py-1 px-2">
                          <h2 className="text-2xl text-cyan-800 font-bold tracking-wider">
                            {item.product.title}
                          </h2>
                          <p className="text-gray-600 text-lg">
                            Quantity : {item.count}
                          </p>
                          <p className="text-gray-600 text-lg">
                            Price : {item.price}EGP
                          </p>
                        </div>
                      </div>
                     
                    </div>
                    )
                   
                  })}
                </>):
                (<p>No Orders Yet!</p>)}
              </div>
            </div>
          ) : (
            <Loader className='flex flex-row justify-center items-center content-center'/>
          )}
    </>
}

export default Allorders
