import { Cart_Items, Remove_Cart } from "../constant";


export const cartReducer = (state={cartItems:JSON.parse(localStorage.getItem("cartItems") || "[]")},action)=>{

    switch(action.type){
        case Cart_Items:
            return{
                cartItems:action.payload.cartItems
            }
        
        case Remove_Cart:
            return{
                cartItems:action.payload.cartItems
            }
        default:
            return state        
    }

}