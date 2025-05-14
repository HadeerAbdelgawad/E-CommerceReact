import React, { useContext, useState } from 'react'
import img from '../../assets/E-commerceReg.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../Loader/Loader';
import { userContext } from '../../Context/userContext';

function Register() {

    let navigate= useNavigate()
    let [userData, setUserData]= useState([])
    let [isLoading , setLoading]= useState(false)
    let {setLogin}= useContext(userContext)
    let [error, setError]= useState('')


    const handleGoBack=()=>{
        navigate(-1)
    }
    async function handleRegister(formsData){
        console.log(formsData);
        setLoading(true)

        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formsData)
        .then((response)=>{
            setLoading(false)
            console.log(response.data);
            setUserData(response.data)
            setLogin(response.data.token)
            localStorage.setItem('UserToken', response.data.token)
            navigate('/login')

        })
        .catch((error)=>{
            console.log('Error: ',error);
            setLoading(false)
            setError(error.response?.data.message)
            
        })
    }

    let validationSchema=Yup.object({
        name:Yup.string().required('name is required').min(3,'min length is 3'). max(15,'max lenght is 10'),
        email:Yup.string().required('email is required').email('invalid email'),
        phone:Yup.string().required('phone is required').matches(/^01[1205][0-9]{8}$/),
        password:Yup.string().required('password is required').matches(/^.{6,}$/),
        rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'password not match')
    })

    let formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        },
        validationSchema: validationSchema,
        onSubmit:handleRegister
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
                                <div className="mb-3 w-[100%]">
                                    <input type="text" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="UserName" placeholder="UserName" required/>
                                    {formik.touched.name && formik.errors.name?(
                                        <div className='text-red-700'>{formik.errors.name}</div>
                                    ):null}
                                </div>

                                <div className=" mb-3">
                                    <input type="email" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" placeholder="name@example.com" required/>
                                    {formik.touched.email && formik.errors.email?(
                                        <div className='text-red-700'>{formik.errors.email}</div>
                                    ):null}
                                </div>

                                <div className=" mb-3">
                                    <input type="password" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" placeholder="Password" required/>
                                    {formik.touched.password && formik.errors.password?(
                                        <div className='text-red-700'>{formik.errors.password}</div>
                                    ):null}
                                </div>

                                <div className=" mb-3">
                                    <input type="password" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" placeholder="rePassword" required/>
                                    {formik.touched.rePassword && formik.errors.rePassword?(
                                        <div className='text-red-700'>{formik.errors.rePassword}</div>
                                    ):null}
                                </div>

                                <div className=" mb-3">
                                    <input type="tel" className='border-1 border-gray-400 rounded p-2  hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" placeholder="phone" required/>
                                    {formik.touched.phone && formik.errors.phone?(
                                        <div className='text-red-700'>{formik.errors.phone}</div>
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
                                        {isLoading ? <Loader />  :'Register' }
                                    </button>
                                </div>

                                <div>
                                <p className="m-0 text-secondary text-center">Already have an account? <Link to={'/login'}  className="text-blue-600 hover:underline transition-all duration-300 ease">Sign in</Link></p>
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

export default Register
