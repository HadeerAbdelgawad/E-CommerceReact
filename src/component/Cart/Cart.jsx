import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { whishListContext } from '../../Context/whishListContext'
import toast from 'react-hot-toast'

function Carts() {
  let [cartProducts, setCartProducts] = useState(null)
  let { getProductToCart, deleteProductFromCart, updateProductCount } = useContext(cartContext)
  let [isloading, setLoading] = useState(true)
  let [cartId, setCartId]= useState(null)
  const [favoriteItems, setFavoriteItems] = useState([]);
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

  async function getCartProducts() {
    try {
      const {data} = await getProductToCart();
      console.log('Added',data.data.products);
      setCartProducts(data?.data.products)
      console.log('Cart Id', data?.data._id);
      setCartId(data?.data._id);
      // console.log('Cart Id',cartId);
      setLoading(false) 
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  async function deleteProduct(productId){
    console.log(productId);
    let {data}= await deleteProductFromCart(productId)
    console.log(data);
    setCartProducts(data?.data.products)

  }

  async function updateProducts(producId, count){
    console.log(producId, count);
    let {data}= await updateProductCount(producId, count)
    console.log(data);
    setCartProducts(data?.data.products);
    
  }

  let totalPrice = cartProducts?.reduce((acc, item) => acc + (item.price * item.count), 0);

  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <>
    
      {!isloading ? (
        <div className="p-5">
          <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-8">
              <div className="lg:col-span-2 md:col-span-1 space-y-4">
              {cartProducts && cartProducts.length > 0?(<>
              
                {cartProducts && cartProducts.map((item, index) => (
                  <div className="mt-6 " key={index}>
                    <div className=" mx-auto ">
                      <div className="space-y-6">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                          <div className="space-y-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                            <a href="#" className="col-span-1">
                              <img src={item.product.imageCover} alt={item.product.title} className='h-20 w-20' draggable="false" />
                            </a>
                            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 items-center">
                              <div className="col-span-2 gap-2">
                                <button className="hover:cursor-pointer"
                                  onClick={() => {
                                    const newCount = item.count - 1;
                                    if (newCount >= 1) {
                                      updateProducts(item.product.id, newCount);
                                    }
                                   }}><i className="fa-solid fa-minus"></i>
                                </button>
                                <input type="number" min='1' value={item.count} readOnly className="text-center border border-gray-200 w-[50%] mx-1" />
                                <button className="hover:cursor-pointer" onClick={() =>  {
                                  const newCount = item.count + 1;
                                  if (newCount >= 1) {
                                    updateProducts(item.product.id, newCount);
                                  }
                                  }
                                  }><i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                              <div className="text-center col-span-1">
                                <p className="text-base font-bold">{item.price}EGP</p>
                              </div>
                            </div>
                            <div className="col-span-2 mx-auto">
                              <h1 className="text-base font-bold">{item.product.title}</h1>
                              <p><span className='font-medium'>Category : </span>{item.product.category.name}</p>
                              {/* <p><span className='font-medium'>Brand : </span>{item.product.brand.name}</p> */}
                              <div className="flex items-center gap-4 mt-2">
                                <button type="button" className="text-sm text-gray-500 hover:text-gray-900 hover:cursor-pointer" onClick={()=>{addProductToWishList(item.product.id)}}>Add to Favorites</button>
                                <button type="button" className="text-sm text-red-600 hover:underline hover:cursor-pointer" 
                                onClick={()=>{
                                  deleteProduct(item.product.id)
                                }}>Remove</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>):
              <p className='text-red-500 font-medium text-center text-2xl'>No Products Added To Cart Yet!</p>}
                

              </div>
              <div className="col-span-1 space-y-4 mt-6">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total price</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">{totalPrice}EGP</dd>
                      </dl>
                
                    </div>
                  </div>

                  <Link to={`/checkout/${cartId}`}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700
                     px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none
                    focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 
                    dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-gray-200 hover:text-black transition-all duration-300 ease">
                    Proceed to Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <Link to={'/'} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500 hover:text-white transition-all duration-300 ease">
                      Continue Shopping
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </Link>
                  </div>
                </div>

                
              </div>
            </div>
            </div>
          </section>
        </div>
      ) : (
        <Loader className='flex flex-row justify-center items-center content-center' />
      )}
              
              
    </>
  )
}

export default Carts
