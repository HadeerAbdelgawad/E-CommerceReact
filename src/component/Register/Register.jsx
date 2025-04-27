import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/userContext';


function Register() {

    let {setLogin}= useContext(userContext)

    let navigate= useNavigate()
    async function handleRegister(formsData){
        console.log('Register', formsData);
        

        try{
            let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formsData)

            console.log('Full resposnse : ', response);
            console.log('Certain response : ', response.data);
            if(response.data.message==='success'){
                localStorage.setItem('UserToken', response.data.token)
                setLogin(response.data.token)
                navigate('/login')
            }
        }catch(error){
            console.log('Error:', error.response?.data || error.message);
            
        }
       
        // console.log('Certain response : ', response.data);
        
        
        
    }

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        },
        onSubmit:handleRegister
    })
    return <>
    <form onSubmit={formik.handleSubmit} className='container'>
        <div className="mb-3">
        <label className="form-label" htmlFor="username">Username</label>
        <input className="form-control" type="text" id="username" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        <div className="mb-3">
            <label htmlFor="repassword" className="form-label">rePassword</label>
            <input type="password" className="form-control" id="repassword" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        <div className="mb-3">
            <label htmlFor="phone" className="form-label">phone</label>
            <input type="tel" className="form-control" id="phone" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked />
            <label className="form-check-label" htmlFor="exampleCheck1">Always sign in on this device</label>
        </div>
        <div className="text-end">
            <button type="submit" className="btn btn-subtle me-2">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>
    </>
}

export default Register
