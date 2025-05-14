import axios from "axios"
import { createContext } from "react"


let headers={
    token :localStorage.getItem("UserToken")
}

export let whishListContext= createContext()

export default function WhishListProvider(props){

    async function addProductToFav(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
            {productId:productId},
            {headers:headers}
        ).then((response)=>{
            console.log('Added To Fav',response);
            return response
        }).catch((error)=>error)
    }

    async function getProductsFromFav(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {headers:headers}
        ).then((response)=>{
            console.log('response',response);
            return response
        }
        ).catch((error)=>error)
    }

    async function deleteProductFromFav(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {headers:headers}
        ).then((response)=>{
            console.log('response',response);
            setCartNumber(response.data.numOfCartItems)
            return response
        })
        .catch((error)=>error)
    }

    return<whishListContext.Provider value={{addProductToFav,getProductsFromFav,deleteProductFromFav}}>
            {props.children}
        </whishListContext.Provider>
}