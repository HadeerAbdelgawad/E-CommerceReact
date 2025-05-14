import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { userContext } from '../../Context/userContext';
import { whishListContext } from '../../Context/whishListContext';

function Products() {

    const [loadingProductId, setLoadingProductId] = useState(null);
    let [ productData, setProductData ] = useState([])
    let [isloading, setLoading]= useState(true)
    let{addProductToCart}= useContext(cartContext)
    const {isLogin}= useContext(userContext)
    const [favoriteItems, setFavoriteItems] = useState([]);


    let navigate= useNavigate()

    let {addProductToFav}= useContext(whishListContext)

    async function addProductToWishList(id) {
        try {
          const response = await addProductToFav(id);
          console.log(response);
          toast.success('Added To Wishlist')
          setFavoriteItems((prev) => [...prev, id]);

        } catch (error) {
          console.log(error);
          toast.error('Something Went Wrong')
        }
    }

    async function addProductItem(id) {
        try {
          const response = await addProductToCart(id);
          console.log(response);
 
          const status = response?.data?.status;
          const message = response?.data?.message;

          if(status=='success'){
            toast.success(message)
          }
          else if(isLogin){
            toast.error(message||'Login First')
          }

        } catch (error) {
          console.log(error);
        }finally {
            setLoadingProductId(null); 
          }
      }
      
    async function getProducts() {

        let response = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        .then((response)=>{
        console.log(response.data.data);
        setProductData(response.data.data)
        setLoading(false)
    }).catch((error)=>{
        console.log('Error: ',error );
        setLoading(false)
    })
        
    }
    useEffect(()=>{
        getProducts()
    },[])


    return (
        <>
          {!isloading ? (
            <div className="p-5">
              
      
              <div className="grid md:grid-cols-2 lg:grid-cols-5 sm:grid-col-1 grid-rows-1 gap-4 hover:cursor-pointer">
                {productData.map((item) => (
                  <div key={item._id} className="productDiv flex flex-col h-full">
                    <div className="relative productCard shadow-sm shadow-gray-400 rounded-2xl hover:shadow-2xl transition-all duration-300 ease h-[100%]">
                      <img src={item.imageCover} alt={item.title} className="rounded-2xl" />
                      <div className="py-1 px-2">
                        <h2 className="text-2xl text-cyan-800 font-bold tracking-wider">
                          {item.title.split(' ').slice(0, 3).join(' ')}
                        </h2>
                        <p className="text-gray-600 text-lg">
                          {item.description.split(' ').slice(0, 3).join(' ')}
                        </p>
                      </div>
                    </div>
                    <div className="absolute text-2xl p-2 flex space-x-2">
                      <span>
                        <Link to={`/productDetails/${item.id}`}>
                          <i className="fa-solid fa-eye text-lg text-gray-200 bg-blue-950 rounded-2xl p-2 hover:text-blue-500 hover:bg-gray-200 transition-all duration-300 ease"></i>
                        </Link>
                      </span>
                      <span>
                        <button>
                          <i className={`fa-solid fa-heart ${favoriteItems.includes(item._id) ? 'text-red-500' : 'text-gray-200'} text-lg text-gray-200 bg-blue-950 rounded-2xl p-2 hover:text-red-500 hover:bg-gray-200 transition-all duration-300 ease hover:cursor-pointer`}
                          onClick={()=>{addProductToWishList(item.id)}}
                          ></i>
                        </button>
                      </span>
                    </div>
                    <div>
                      <button
                          onClick={() => addProductItem(item.id)}
                          className="addBtn bg-gray-800 text-white w-full rounded-2xl p-2 text-xl hover:cursor-pointer flex justify-center items-center"
                          >
                          {loadingProductId === item.id ? <Loader /> : 'Add To Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Loader className='flex flex-row justify-center items-center content-center'/>
          )}
        </>
      );
      
}

export default Products
