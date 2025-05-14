import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function SliderComp() {

    let [brands, setBrand]= useState([])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      async function getAllBrands() {

        await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then(({data})=>{
          console.log('Gatogory',data);
            setBrand(data.data)
        }).catch((error)=>{
            console.log(error);
            
        })
    }
 
        
        useEffect(()=>{
            getAllBrands()
        },[])
        
      
    return <>
        <div className='overflow-x-hidden'>
        <Carousel responsive={responsive}>
                {brands && brands.map((item, index)=>{
                    return <div key={index} className='px-2 text-center'>
                            <img src={item?.image} alt={item?.name} className='w-2xl shadow-lg rounded-2xl h-[300px]'/>
                            <h2 className='font-medium text-xl'>{item.name}</h2>
                          </div>
                })}
        </Carousel>
            
        </div>
      
    </>
}

export default SliderComp
