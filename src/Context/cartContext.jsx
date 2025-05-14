    import axios from "axios";
    import { createContext, useState } from "react";

    // let headers={
    //     token :localStorage.getItem("UserToken")
    // }
    export let cartContext= createContext()

    export default function CartContextProvider(props){

        let [cartNumber, setCartNumber]= useState(0)
        
        async function addProductToCart(producId){
            const token = localStorage.getItem("UserToken");
            return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {productId:producId},
                {headers:{token}}
            ).then((response)=>{
                console.log('response',response);
                setCartNumber(response.data.numOfCartItems)
                return response
            })
            .catch((error)=>error)
        }

        async function getProductToCart(){//GET FROM CART
            const token = localStorage.getItem("UserToken");
            return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                {headers:{token}}
            ).then((response)=>{
                console.log('response',response);
                setCartNumber(response.data.numOfCartItems)
                return response
                
            }
            ).catch((error)=>error)
            
        }

        async function deleteProductFromCart(productId){
            const token = localStorage.getItem("UserToken");
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {headers:{token}}
            ).then((response)=>{
                console.log('response',response);
                setCartNumber(response.data.numOfCartItems)
                return response
            })
            .catch((error)=>error)
        }
        
        async function updateProductCount(productId,count){
            const token = localStorage.getItem("UserToken");
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {count:count},
                {headers:{token}}
            ).then((response)=>response)
            .catch((error)=>error)
        }
        return<cartContext.Provider value={{addProductToCart, getProductToCart,deleteProductFromCart,updateProductCount,cartNumber}}>
            {props.children}
        </cartContext.Provider>
    }

