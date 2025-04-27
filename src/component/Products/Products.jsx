import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

function Products() {

    
    let [productList, setProductList]= useState([])
    const [isLoading, setLoading]= useState(true)

    async function getData(){
        let data= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        .then( ({data})=>{console.log(data.data)
          setLoading(false)
          setProductList(data.data)} )
    
        .catch( ()=>{
          setLoading(false)
        } )
      }
    
    

    useEffect(()=>{
        getData()
    },[])
    return <>
    
    <div className='container mx-auto'>
            { !isLoading?
        <div className='d-flex flex-wrap justify-content-center gap-3'>

                {productList.map((product)=>{
                  return <div className='w-25 shadow-sm p-1'>
                    <img src={product.imageCover} alt={product.title} className='w-100 pb-2' />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    <span>{product.price} EGP</span>
                    <span>{product.ratingsQuantity}<i className="fa-solid fa-star text-warning"></i></span>
                    </div>
                
                  </div>
                })}
                </div>
            :<Loader/>}
        </div>
    
    </>
}

export default Products
