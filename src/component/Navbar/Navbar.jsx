import React, { useContext } from 'react'
import logo from '../../assets/logo.jpg'
import { NavLink } from 'react-router-dom'
import { counterContext } from '../../Context/counterContext'

function Navbar() {

    let {counter}= useContext(counterContext)
    return (
        <>
        <nav className='w-100 bg-dark-subtle p-2 d-flex justify-content-between align-items-center'>
            <div className='logo d-flex align-items-center flex-column flex-lg-row gap-3'>
                <img src={logo} alt="logo" width={100} className=' rounded-circle'/>
                <ul className='d-flex flex-column flex-lg-row list-unstyled gap-2 pt-2'>
                    <li><NavLink to={'/'} className='text-decoration-none'>Products</NavLink></li>
                    <li><NavLink to={'cart'} className='text-decoration-none'>Cart</NavLink></li>
                    <li><NavLink to={'brand'} className='text-decoration-none'>Brand</NavLink></li>
                    
                </ul>
            </div>


            <div className="social">
                <ul className='list-unstyled d-flex flex-column flex-lg-row gap-2'>
                    <li><NavLink to={'/login'} className='text-decoration-none p-2'>Login</NavLink></li>
                    <li><NavLink to={'/register'} className='text-decoration-none p-2'>SignUp</NavLink></li>
                    <li><NavLink className='text-decoration-none p-2'>LogOut</NavLink></li>
                    <li>
                        <i class="fa-brands fa-facebook-f px-1"></i>
                        <i class="fa-brands fa-instagram px-1"></i>
                        <i class="fa-brands fa-youtube px-1"></i>
                    </li>
                    <li>{counter}</li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar
