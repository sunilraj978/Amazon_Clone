import { Cart_Items, Remove_Cart } from "../constant";


export const addtocart = (product) =>(dispatch,getState)=>{

    const cartItems = getState().cart.cartItems.slice()

    let alreadyExists = false;

    cartItems.forEach((x)=>{
        if(x._id === product._id){
            alreadyExists = true
            x.count++;
        }
    })
    if(!alreadyExists){
        cartItems.push({...product,count:1});
    }

    dispatch({
        type:Cart_Items,
        payload:{
            cartItems
        }
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
}



export const removeCart = (product)=>(dispatch,getState)=>{
    const cartItems = getState().cart.cartItems.slice().filter(x=>x._id!==product._id);

    dispatch({
        type:Remove_Cart,
        payload:{
            cartItems
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(cartItems))
}

