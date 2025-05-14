import React, { useContext, useEffect, useState } from 'react'
import SliderComp from '../SliderComp/SliderComp'
import axios from 'axios'
import computerAccessories from '../../assets/computer-accessories.png'
import devices from '../../assets/devices.png'
import printer from '../../assets/printer.png'
import database from '../../assets/database-file.png'
import games from '../../assets/games.png'
import camera from '../../assets/camera.png'
import speaker from '../../assets/speaker.png'
import Loader from '../Loader/Loader'
import { userContext } from '../../Context/userContext'

function Brands() {

    let [gategory, setGategory]= useState([])
    let [isloading, setLoading]= useState(true)
    let {setLogin}= useContext(userContext)
    async function getAllSubGategories(){
        setLoading(true)
        await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories?limit=10')
        .then(({data})=>{
            console.log('SubGategory',data);
            setGategory(data.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false)
        })
    }

    useEffect(()=>{
        getAllSubGategories()
    },[])

    return <>
    <div className='p-3'>
        <h1 className="container font-bold text-4xl px-3">Our Gategories</h1>
        {isloading?<Loader/>:<SliderComp/>}
        
        <h1 className="container font-bold text-4xl px-3">Our Sub Gategories</h1>
            <div className='grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 mx-auto gap-4 my-10'>
            {isloading?<Loader/>:(
                <>
                     {gategory && gategory.map((item, index) => {
                        const name = item.name?.trim().toLowerCase();
                        let imageToShow = item.image;

                        if (name.includes("computer")) {
                            imageToShow = computerAccessories;
                        } else if (name.includes("laptops") || name.includes("tvs")) {
                            imageToShow = devices;
                        } else if (name.includes("printer")) {
                            imageToShow = printer;
                        } else if (name.includes("networking") || name.includes("data storage")) {
                            imageToShow = database;
                        } else if (name.includes("video games")) {
                            imageToShow = games;
                        } else if (name.includes("cameras & accessories")) {
                            imageToShow = camera;
                        } else if (name.includes("home")) {
                            imageToShow = speaker;
                        }
                        

                        return (
                            <div className='px-2 py-5 text-center bg-gray-300 rounded-lg flex flex-col items-center justify-center hover:cursor-pointer hover:shadow-xl hover:shadow-gray-400 transition-all duration-300' key={index}>
                                <img src={imageToShow} alt={item.name} className='w-20'/>
                                <p>{item.name}</p>
                            </div>
                        );
                    })} 
                        </>)}
           

            </div>
    </div>
        
    </>
}

export default Brands
