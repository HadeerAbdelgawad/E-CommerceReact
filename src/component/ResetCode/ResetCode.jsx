import img from '../../assets/password-forgot.png'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import Loader from '../Loader/Loader'
import { userContext } from '../../Context/userContext'
import toast from 'react-hot-toast'


function ResetCode() {
    let navigate= useNavigate()
    let [userData, setUserData]= useState([])
    let [isLoading , setLoading]= useState(false)
    let {setLogin}= useContext(userContext)
    let [error, setError]= useState('')


    const handleGoBack=()=>{
        navigate(-1)
    }

    async function handleLogin(formsData){
        console.log(formsData);
        setLoading(true)
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formsData)
        .then((response)=>{
            console.log(response.data);
            setLoading(false)
            setUserData(response.data.data)
            toast.success('Reset code Correct')
            navigate('/resetPass')

        })
        .catch((error)=>{
            console.log('Error: ',error);
            setLoading(false)
            setError(error.response?.data.message)
            
        })
    }


    let validationSchema=Yup.object({
        resetCode:Yup.string().required('resetCode is required'),
    })

    let formik=useFormik({
        initialValues:{
            resetCode:'',
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
                                    <input type="text" className='border-1 border-gray-400 rounded p-2 hover:shadow-lg hover:shadow-gray-400 w-full transition-all duration-300 ease' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} name="resetCode" id="resetCode" placeholder="Enter reset code" required/>
                                    {formik.touched.resetCode && formik.errors.resetCode?(
                                        <div className='text-red-700'>{formik.errors.resetCode}</div>
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
                                        {isLoading ? <Loader size="1.5em" /> :'Send' }
                                    </button>
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

export default ResetCode
