import { Fetch_Product } from "../constant"
import {Filter_Product} from "../constant"

export const fetchProduct = ()=>async(dispatch)=>{


    const result = await fetch("/api/products")
    const data = await result.json()


    dispatch({
        type:Fetch_Product,
        payload:data
    })
}


export const filterProducts = (products,size)=>(dispatch)=>{
dispatch({
    type:Filter_Product,
    payload:{
        size:size,
        items:
        size === ""
        ?products
        :products.filter((x)=>x.availableSizes.indexOf(size)>=0)
    }
})
}



