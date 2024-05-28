import { Fetch_Product } from "../constant";


export const ProductReducer = (state = {},action)=>{
    switch(action.type){
        case Fetch_Product:
            return{
                items:action.payload
            }
        default:
            return state    
    }
}