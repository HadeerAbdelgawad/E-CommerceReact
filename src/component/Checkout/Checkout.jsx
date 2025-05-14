import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useParams } from 'react-router-dom'

function Checkout() {

    let {cardId}= useParams()
    let headers={
        token:localStorage.getItem('UserToken')
    }

    async function handleCheckout(formsData){
        console.log('FormsData',formsData);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5174`,
            {'shippingAddress':formsData},
            {
                headers:headers
                // params:{url:'http://localhost:5174'}
            }
        ).then((response)=>{
            console.log('Ckecout', response);
            location.href = response.data.session.url
        }).catch((error)=>{
            console.log('error',error);
            location.href = error.response?.data.session.cancel_url
            
        })
        
    }

    let formik = useFormik({
        initialValues:{
          details:'',
          phone:'',
          city:''
        },
        
        onSubmit: handleCheckout
      })
    return <>
    <div className='flex flex-col justify-center items-center content-center h-screen'>
        <h1 className='text-2xl font-bold py-2'>CheckOut Form </h1>
        <div>
            <form onSubmit={formik.handleSubmit} action="#!">
                <div className="overflow-hidden">

    
                    <div className="form-floating mb-3">
                        <label htmlFor="details" className="form-label">Details</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className= {`form-control ${formik.touched.details && formik.errors.details ? 'is-invalid' : ''} border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease`} name="details" value={formik.values.details} id="details" required/>
                    </div>
    
                    <div className="form-floating mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className= {`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''} border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease`} name="phone" value={formik.values.phone} id="phone" placeholder="phone" required/>
                    </div>


                    <div className="form-floating mb-3">
                        <label htmlFor="city" className="form-label">City</label>   
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className= {`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''} border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease`} name="city" value={formik.values.city} id="city" placeholder="city" required/>
                    </div>
    

    
                    <div className="d-grid my-3 text-center">
                        <button className=" px-3 py-1 text-xl rounded-full bg-green-600 text-white hover:cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300 ease" type="submit">Pay Now</button>
                    </div>

                </div>
            </form>
        </div>
    </div>
    </>
}

export default Checkout
