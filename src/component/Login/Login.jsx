import React, { useContext, useEffect, useState } from 'react'
import img from '../../assets/E-commerceReg.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import Loader from '../Loader/Loader'
import { userContext } from '../../Context/userContext'


function Login() {

    let navigate= useNavigate()
    let [userData, setUserData]= useState([])
    let [isLoading , setLoading]= useState(false)
    let {setLogin,isLogin}= useContext(userContext)
    let [error, setError]= useState('')


    const handleGoBack=()=>{
        navigate(-1)
    }

    async function handleLogin(formsData){
        console.log(formsData);
        setLoading(true)
         await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formsData)
        .then((response)=>{
            setLoading(false)
            console.log(response.data);
            setUserData(response.data)
            setLogin(response.data.token)
            localStorage.setItem('UserToken', response.data.token)
            navigate('/')

        })
        .catch((error)=>{
            console.log('Error: ',error);
            setLoading(false)
            setError(error.response?.data.message)
            
        })
    }

    async function goForgetPassword(){
        navigate('/forgetPassword')
    }

    let validationSchema=Yup.object({
        email:Yup.string().required('email is required').email('invalid email'),
        password:Yup.string().required('password is required').matches(/^.{6,}$/),
    })

    let formik=useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: validationSchema,
        onSubmit:handleLogin
    })

    return <>
        <div className='mx-auto flex flex-wrap flex-row justify-center items-center '>
                <div className='basis-[100%]'>
                        <i onClick={()=>{handleGoBack()}} className="fa-solid fa-chevron-left text-gray-400 text-3xl mb-3 rounded p-2 hover:cursor-pointer hover:shadow-2xl hover:bg-red-600 hover:text-white transition-all duration-300 ease "></i>
                </div>
            <div className='flex flex-col-reverse  sm:flex-col-reverse  md:flex-col-reverse lg:flex-row  justify-between items-center content-center w-[100%] h-full'>
                <div className="welcome mx-auto p-2 w-[50%] ">
                    
            
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-2 ">

                                <div className=" mb-3">
                                    <input type="email" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" placeholder="name@example.com" required/>
                                    {formik.touched.email && formik.errors.email?(
                                        <div className='text-red-700'>{formik.errors.email}</div>
                                    ):null}
                                </div>

                                <div className=" mb-3">
                                    <input type="password" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" placeholder="Password" required/>
                                    <button className='text-gray-400 hover:text-black hover:cursor-pointer hover:underline transition-all duration-300 ease text-left' onClick={()=>{goForgetPassword()}}>
                                        Forget Password?
                                    </button>
                                    {formik.touched.password && formik.errors.password?(
                                        <div className='text-red-700'>{formik.errors.password}</div>
                                    ):null}
                                    
                                </div>
                                <div className=" mb-3 text-center">
                                    {error?<div className='text-red-700'>{error}</div>:null}
                                </div>

                                <div className="flex justify-center my-3">
                                    <button
                                        className="bg-gray-600 text-white px-6 py-2 rounded text-xl hover:cursor-pointer hover:shadow-lg hover:shadow-gray-400  transition-all duration-300 ease-in-out"
                                        type="submit"
                                    >
                                        {isLoading ? <Loader size="1.5em" /> :'Login' }
                                    </button>
                                </div>

                                <div>
                                <p className="m-0 text-secondary text-center">Didn't have An Account? <Link to={'/register'}  className="text-blue-600 hover:underline transition-all duration-300 ease">Sign Up</Link></p>
                                </div>
                    </div>
                    </form>

                </div>
                
                <div className="flex justify-center items-center  Img h-[100vh] p-2" > 
                    <img src={img} alt="studentImg" className='max-h-lvh  ' width={'700px'}/>
                </div>
            </div>
        </div>


           </>
}

export default Login
