import React from 'react'
import about from '../../assets/about.jpeg'
import developer from '../../assets/developer.jpg'
import styles from './About.module.css'

function About() {
    return <>
    <div className='my-5 grid lg:grid-cols-2 lg:text-start md:grid-cols-1 md:text-center sm:grid-cols-1 sm:text-center gap-2 mx-auto items-center'>
        <div className='info px-3'>
            <h2 style={{fontFamily:'"Poppins", serif', fontWeight:'600',fontSize:'54px', lineHeight:'64px'}}>Our Story</h2>
            <p style={{fontFamily:'"Poppins", serif', fontWeight:'400', fontSize:'16px', lineHeight:'26px'}}>Launced in 2024, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
            <p style={{fontFamily:'"Poppins", serif', fontWeight:'400', fontSize:'16px', lineHeight:'26px'}}>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
        </div>
        <div className="aboutImg">
            <img src={about} alt="" width={'800px'} height={'600px'}/>
        </div>
    </div>

    <div className='px-3 py-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto text-center'>
        <div className='icon-box p-5 shadow-2xl rounded-2xl'>
            <i className="fa-solid fa-building rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
            <h2 style={{fontFamily:'"Inter", sans-serif', fontWeight:'700', fontSize:'32px'}}>10.5k</h2>
            <span style={{fontFamily:'"Poppins", serif',fontWeight:'400', fontSize:'16px'}}>Sallers active our site</span>
        </div>
        <div  className=' icon-box  p-5 shadow-2xl rounded-2xl'>
            <i className="fa-solid fa-building rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
            <h2 style={{fontFamily:'"Inter", sans-serif', fontWeight:'700', fontSize:'32px'}}>33k</h2>
            <span style={{fontFamily:'"Poppins", serif',fontWeight:'400', fontSize:'16px'}}>Mopnthly Produduct Sale</span>
        </div>
        <div  className='icon-box  p-5 shadow-2xl rounded-2xl'>
            <i className="fa-solid fa-building rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
            <h2 style={{fontFamily:'"Inter", sans-serif', fontWeight:'700', fontSize:'32px'}}>45.5k</h2>
            <span style={{fontFamily:'"Poppins", serif',fontWeight:'400', fontSize:'16px'}}>Customer active in our site</span>
        </div>
        <div  className='icon-box  p-5 shadow-2xl rounded-2xl'>
            <i className="fa-solid fa-building rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
            <h2 style={{fontFamily:'"Inter", sans-serif', fontWeight:'700', fontSize:'32px'}}>25k</h2>
            <span style={{fontFamily:'"Poppins", serif',fontWeight:'400', fontSize:'16px'}}>Anual gross sale in our site</span>
        </div>

    </div>

    <div className='py-5'>
        <h1 className='text-center text-3xl font-bold py-2'>Our Developer</h1>
        <div className='hover:cursor-pointer grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mx-auto px-10'  >
            {/* Shared container for image + icons */}
            <div className={`devCard ${styles.devCard} w-[400px] h-fit`}>
                <img 
                    src={developer} 
                    alt="person1" 
                    className={`devCard ${styles.devCard} w-full max-h-[600px] object-cover rounded-2xl`}
                />

                <div className={`${styles.socialBox} bg-gray-700/70 grid grid-cols-3 gap-4 p-4 w-full text-center rounded-2xl`}>
                    <a href="https://www.linkedin.com/in/hadeer-aly-8b1306244/" target='_blank' rel='noreferrer'>
                        <i className={`gitIcon fa-brands fa-github ${styles.gitIcon} text-3xl p-0 text-white hover:cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out`}></i>
                    </a>
                    <a href="https://github.com/HadeerAbdelgawad" target='_blank' rel="noreferrer">
                        <i className={`linkIcon ${styles.linkIcon} fa-brands fa-linkedin-in text-3xl p-0 text-blue-500 hover:cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out`}></i>
                    </a>
                    <a href="https://www.facebook.com/hadeer.emad.1004" target='_blank' rel="noreferrer">
                        <i className={`faceIcon ${styles.faceIcon} fa-brands fa-facebook text-blue-700 text-3xl p-0 hover:cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out`}></i>
                    </a>
                </div>
            </div>
            <div className='flex items-center justify-center content-center'>
                <p className='text-2xl text-gray-600'>
                Our talented Front-End Developer specializes in building responsive, high-performance web applications using React.
                 One of their standout projects is a modern e-commerce platform designed with clean UI/UX, seamless user experience,
                  and robust functionality. This application integrates with real-time APIs and connects to a back-end database to fetch and manage
                   dynamic product data, user authentication, shopping cart logic, and order management. With a strong command of JavaScript,
                    React, and RESTful APIs, they deliver scalable solutions tailored to today's online shopping trends.
                </p>
            </div>
        </div>
    </div>


    <div className='px-3 py-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto text-center'>
            <div className='p-5 shadow-2xl rounded-2xl'>
                <div className='mb-2'>
                    <i  className="fa-solid fa-van-shuttle rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
                </div>
                <p style={{fontFamily:'"Poppins", serif', fontWeight:'600', fontSize:'20px', lineHeight:'28px'}}>FREE AND FAST DELIVERY</p>
                <span style={{fontFamily:'"Poppins", serif', fontWeight:'400', fontSize:'14px', lineHeight:'21px'}}>Free delivery for all orders over $140</span>
            </div>
            <div className='p-5 shadow-2xl rounded-2xl'>
                <div className='mb-2'>
                    <i className="fa-solid fa-headphones-simple rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
                </div>
                <p style={{fontFamily:'"Poppins", serif', fontWeight:'600', fontSize:'20px', lineHeight:'28px'}}>24/7 CUSTOMER SERVICE</p>
                <span tyle={{fontFamily:'"Poppins", serif', fontWeight:'400', fontSize:'14px', lineHeight:'21px'}}>Friendly 24/7 customer support</span>
            </div>
            <div className='p-5 shadow-2xl rounded-2xl'>
                <div className='mb-2'>
                <i class="fa-solid fa-ranking-star rounded-full py-3 px-4 mb-3 text-2xl bg-black text-white border-4 border-gray-400 hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-300 ease"></i>
                </div>
                <p style={{fontFamily:'"Poppins", serif', fontWeight:'600', fontSize:'20px', lineHeight:'28px'}}>MONEY BACK GUARANTEE</p>
                <span tyle={{fontFamily:'"Poppins", serif', fontWeight:'400', fontSize:'14px', lineHeight:'21px'}}>We reurn money within 30 days</span>
            </div>
        </div>
    </>
}

export default About
