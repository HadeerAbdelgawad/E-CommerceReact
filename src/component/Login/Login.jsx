import React from 'react'
import {useFormik} from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

function Login() {

    let navigate= useNavigate()

    const handleLogin = async(formsData) =>{
       try{
        console.log('Logined');
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formsData)
        console.log(response.data);
        navigate('/')


       }catch(error){
        console.log(error.response?.data.message);
        
       }
           
    }
    
    let validationSchema = Yup.object(
        {
        email:Yup.string().required('email is required').email('invalid email'),
        password:Yup.string().required('password is required').matches(/^.{6,}$/),
        }
    )

    let formik= useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema:validationSchema,  
        onSubmit:handleLogin,
        
    })
    return <>
    <div className='flex flex-wrap justify-center items-center h-screen'>
        <h2 className='basis-[100%] text-center font-bold text-2xl'>Login Page</h2>
        <form onSubmit={formik.handleSubmit}  id='sign-up' className='bg-blue-700 p-3 rounded shadow w-[60%] flex flex-col justify-center items-center'>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="user-email" placeholder='Email' className='w-full bg-amber-50 mx-2 focus:border-2 focus:border-gray-400 my-2 rounded p-2'/>
            {
                formik.touched.email && formik.errors.email?
                (<div className='text-red-600'>{formik.errors.email}</div>):null
            }
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="user-pass" placeholder='Password' className='w-full bg-amber-50 mx-2 focus:border-2 focus:border-gray-400 my-2 rounded p-2'/>
            {
                formik.touched.password && formik.errors.password?
                (<div className='text-red-600'>{formik.errors.password}</div>):null
            }
            <button type="submit" className='rounded px-2 py-3 bg-gray-700 text-white hover:cursor-pointer hover:bg-gray-800 focus:bg-white focus:text-gray-700 '>Login</button>

        </form>

    </div>
    </>
        
    
}

export default Login
