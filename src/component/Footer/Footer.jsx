import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return <>
        <div className='bg-gray-800 w-[100%] p-2 text-white'>
            <div className='grid text-center md:grid-cols-4 lg:grid-cols-4 sm:grid-col-1 md:gap-4 ls-gap-4 sm:gap-10 justify-center items-center '>
                <div className='flex flex-col justify-center items-center'>
                    <ul>
                        <li className='py-1 '><h1 className=' font-bold text-2xl hover:underline hover:decoration-gray-500'><Link className='' to={'/'}><i class="fa-solid fa-e"></i> - <i class="fa-solid fa-c"></i>ommerce</Link></h1></li>
                        <li className='py-1 hover:underline hover:decoration-gray-500'><Link to={'/register'}>Subscribe</Link></li>
                        <li className='py-1 hover:underline hover:decoration-gray-500'>Get 10% off your first order</li>
                        <li className='py-1 '><input id="email" name="email" placeholder='Enter your email?' type="email" className="rounded-2xl border-1 p-2"/></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <ul>
                        <li className='py-1'><h1 className='text-2xl hover:underline hover:decoration-gray-500'>Developer</h1></li>
                        <li className='py-1 hover:underline hover:decoration-gray-500'>Our Front-end Developer</li>
                        <li className='py-1 hover:underline hover:decoration-gray-500'><a href={`mailto:${'hadeer.abdelgawad44@gmail.com'}`} target="_blank" rel="noreferrer">hadeer.abdelgawad44@gmail.com</a></li>
                        <li className='py-1 hover:underline hover:decoration-gray-500'><a href="https://wa.me/+201221534968" target="_blank" rel="noreferrer">Chat On WhatsApp</a></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <ul>
                        <li className='py-1'><h1 className=' font-bold text-2xl'>Account</h1></li>
                        <li className='py-1'>My Account</li>
                        <li className='py-1'><Link to={'/login'} className='hover:underline hover:decoration-gray-500'>Login </Link>/ <Link to={'/register'} className='hover:underline hover:decoration-gray-500'>Register</Link></li>
                        <li className='py-1'><Link to={'/cart'}>Cart</Link></li>
                        <li className='py-1'><Link to={'/wishlist'}>WhisList</Link></li>
                        <li className='py-1'><Link to={'/'}>Shop</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <ul>
                        <li className='py-1'><h1 className=' font-bold text-2xl'>Quick Link</h1></li>
                        <li className='py-1'>Privacy Policy</li>
                        <li className='py-1'>Terms Of Use</li>
                        <li className='py-1'>FAQ</li>
                        <li className='py-1'>Contact</li>
                    </ul>
                </div>
            </div>

        </div>
    </>
}

export default Footer
