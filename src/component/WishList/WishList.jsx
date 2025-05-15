import React, { useContext, useEffect, useState } from 'react'
import { whishListContext } from '../../Context/whishListContext'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/cartContext';


function WishList() {
    
    let {getProductsFromFav,deleteProductFromFav}= useContext(whishListContext)
    let {addProductToCart} = useContext(cartContext)
    let [favProducts, setFavProducts]= useState([])
    let [isloading, setLoading] = useState(true)
    const [loadingProductId, setLoadingProductId ] = useState(null);
    const [favoriteItems, setFavoriteItems] = useState([]);


    async function deleteProduct(productId){
        console.log(productId);
        let {data}= await deleteProductFromFav(productId)
        console.log(data);
        // setFavProducts(data?.data.products)
        setFavProducts((prev) => prev.filter(item => item.id !== productId));

        setFavoriteItems((prev) => [...prev, productId]);

    
      }

    async function getProductsFromWish() {
        try {
          const response = await getProductsFromFav();
          console.log(response);
          setFavProducts(response?.data?.data)
          setLoading(false)
        } catch (error) {
          console.log(error);
          setLoading(false)
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

    useEffect(()=>{
        getProductsFromWish()
    },[])
    
    return <>
    {!isloading ? (
        <div className='p-5 mx-auto'>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-col-1 grid-rows-1 gap-4 hover:cursor-pointer mx-auto">
                {favProducts && favProducts.length>0 ? (
                    <>
                    {favProducts.map((item) => (
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
                                <i className={`fa-solid fa-heart ${favoriteItems.includes(item.id) ? 'text-gray-200' : 'text-red-500'} text-lg text-gray-200 bg-blue-950 rounded-2xl p-2 hover:text-red-500 hover:bg-gray-200 transition-all duration-300 ease hover:cursor-pointer`}
                                onClick={()=>{deleteProduct(item.id)}}
                                ></i>
                                </button>
                            </span>
                            </div>
                            <div>
                            <button
                                onClick={() => addProductItem(item.id)}
                                className="addBtn bg-gray-800 text-white w-full rounded-2xl p-2 text-xl hover:cursor-pointer flex justify-center items-center"
                                >
                                {isloading === item.id ? <Loader /> : 'Add To Cart'}
                            </button>
                            </div>
                        </div>))}
                    </>
                ):(
                    <p className='text-red-500 text-2xl'>No Fav Products</p>
                )}
            </div>
        </div>
    ):(<><Loader/></>)}
    </>
}

export default WishList
