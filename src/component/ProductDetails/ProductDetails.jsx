import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';


function ProductDetails() {

    let {id}= useParams()
    console.log(id);

    const[details, setDetails]= useState(null)
    let [isloading, setLoading]= useState(true)
    let [error, setError]= useState()
    let{addProductToCart}= useContext(cartContext)


    async function addProductItem(id) {
      try {
        const response = await addProductToCart(id);
        console.log(response);

        const status = response?.data?.status;
        const message = response?.data?.message;

        if(status=='success'){
          toast.success(message)
        }
        else if(isLogin){
          toast.error(message||'Login First')
        }

      } catch (error) {
        console.log(error);
      }finally {
          setLoadingProductId(null); 
        }
    }

    function getProductDetails(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data})=>{
            console.log(data.data);
            setDetails(data.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setError(error)
            setLoading(false)
        })
    }
    useEffect(()=>{
        getProductDetails()
    },[])
    return <>

{!isloading ? (
            <div className="p-5">
            <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
                <div className=' grid-cols-1'>
                    <img src={details?.imageCover} alt={details?.title} width={'500px'} className='p-2'/>
                </div>
                <div className='col-span-2 flex flex-col md:justify-center md:items-start lg:justify-center lg:items-start sm:justify-center sm:items-center px-2 text-xl'>
                    <h1 className='text-3xl font-bold'>{details?.title}</h1>
                    <p className='text-gray-600 text-xl'>{details?.description}</p>
                    <p><span className='font-bold'>Category : </span>{details?.category.name}</p>
                    <p><span className='font-bold'>Price : </span>{details?.price} EGP </p>
                    <p><span className='font-bold'>In Store : </span> {details?.quantity} item</p>
                    {/* <p><span className='font-bold'>Brand : </span>{details?.brand.name}</p> */}
                    <span>{details?.ratingsQuantity}<i className="fas fa-star text-warning text-amber-400 text-xl"></i></span>
                    <div className='w-full py-3'>
                        <button 
                        onClick={() => addProductItem(details.id)}
                        className='bg-gray-800 text-white w-[100%] rounded-2xl p-2 text-xl hover:shadow-lg hover:shadow-gray-400 hover:cursor-pointer'>
                          {isloading === details.id ? <Loader /> : 'Add To Cart'}
                        </button>
                    </div>
                </div>
            </div>
            </div>
              ) : (
                <Loader className='flex flex-row justify-center items-center content-center'/>
              )}
    </>
}

export default ProductDetails
