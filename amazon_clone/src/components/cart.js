import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import '../index.css'
import {connect} from 'react-redux'
import {removeCart} from './action/cartaction'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import {createOrder,clearOrder} from './action/orderAction'

class cart extends Component {

    constructor(props){
        super(props);
        this.state= {
            name:"",
            email:"",
            address:"",
            showCheckOutDialog : false
        }
        
    }

    handleClick = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    createOrder = (e)=>{
        e.preventDefault()
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce((a,c)=>a+c.price*c.count,0)
        }
        this.props.createOrder(order)
    }

    closeModel = ()=>{
        this.props.clearOrder();
        
    }

    render() {
        const {cartItems,order} = this.props
        return (
            <div className="Cart">
                <div>
        {cartItems.length === 0?<div>Your Cart is Empty</div>:<div>Cart has {" "}{cartItems.length} products</div>}
                </div>

            
                {
                    order?
                        <Modal isOpen={true} onRequestClose={this.closeModel}>
                            <button onClick={this.closeModel}>x</button>
                            <Zoom>
                                <div className="modal">
                                <div style={{color:"green"}}>
                                    <h4>Your Order has Placed</h4>
                                Order {order._id}</div>
                            <ul>
                                <li>
                                    <div>
                                        Name:      {order.name}           
                                    </div>
                                    <br/>
                                </li>
                                <li>
                                    <div>
                                        Email:     {order.email}
                                    </div>
                                    <br/>
                                </li>
                                <li>
                                    <div>
                                        Address:    {order.address}
                                    </div>
                                    <br/>
                                </li>
                                <li>
                                    <div>
                                        Date:     {order.createdAt}
                                    </div>
                                    <br/>
                                </li>
                                <li>
                                    <div>
                                        Total:     ${order.total}
                                    </div>
                                    <br/>
                                </li>
                                <li>
                                    <div>
                                        CartItems:  {order.cartItems.map((x)=>(
                                            <div>
                                                
                                                {x.count} x  {x.title }

                                                 </div>
                                        ))}
                                    </div>
                                    <div>
                                       
                                    </div>
                                </li>
                            </ul>
                                </div>
                            </Zoom>
                        </Modal>
                        :""
                    
                }

                <div>
                    <Fade left cascade>
                    <ul>
                        {
                            cartItems.map(item=>(
                                <li key={item._id}>
                                    <div>
                                        <img style={{width:"100px",height:"100px"}} src={item.image} alt={item.title}/>
                                    </div>
                                    <div style={{fontWeight:"bold"}} className="details">
                                        {"$"+item.price} x {item.count}
                                        <button onClick={()=>this.props.removeCart(item)} className="">Remove</button>
                                    </div>
                                    
                                </li>
                            ))
                        }
                    
                    </ul>
                    </Fade>

                   <div className="checkout">
                   {
                       cartItems.length!==0 &&(
                        <div>
                        Total: $
                        {
                            cartItems.reduce((a,b)=>a + b.price*b.count,0)
                        }
                        <div className="proceed">
                            <button onClick={()=>{this.setState({showCheckOutDialog:true})}}>Proceed</button>
                        </div>
                    </div>
                       )
                   }
                   </div>

                </div>
                <Fade right cascade>
                {
                    this.state.showCheckOutDialog&&(
                        <div className="container">
                            <form className="form" onSubmit={this.createOrder}>
                                <ul>
                                <label>Email</label>
                                    <li>
                                        <input placeholder="enter a email" name="email" type="email" required  onChange={this.handleClick} />
                                    </li>
                                    <label>Name</label>
                                    <li>
                                        <input placeholder= "enter a name" name="name" type="text" required  onChange={this.handleClick}  />
                                    </li>
                                    <label>Address</label>
                                    <li>
                                        <input placeholder="enter a address" name="address" type="text" required  onChange={this.handleClick}  />
                                    </li>
                                    <li>
                                        <button className="btn" type='submit'>checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    )
                }
                </Fade>

            </div>
        )
    }
}



export default connect((state)=>({
    order:state.order.order,
    cartItems:state.cart.cartItems
}),{removeCart,createOrder,clearOrder})(cart)