import React, { Component } from 'react';
import Modal from 'react-modal'

import Fade from 'react-reveal/Fade'

import Zoom from 'react-reveal/Zoom'
import {addtocart} from './action/cartaction'
import {fetchProduct} from './action/action'
import {connect}  from 'react-redux'

import '../index.css'
class Display extends Component {

    constructor(props){
        super(props);
        this.state = {
            product:null
        }
    }

    modelView = (product)=>{
        this.setState({product})
    }

    closeModel = () =>{
        this.setState({product:null})
    }

    componentDidMount(){
        this.props.fetchProduct()
    }

    render() {

        const {product} = this.state

        return (
            <div >
                <Fade bottom cascade>
                {
                    !this.props.products?(<div>Loading..</div>)
                    :<ul className="product">
                    {
                        this.props.products.map((product)=>(
                            <li key={product._id}>
                                <div className="products">
                                <a href={"#" + product.title } onClick={()=>this.modelView(product)} >
                                    <img src={product.image} alt={product.title} />
                              </a>
                              <p>
                                  {product.title}
                              </p>
                              <div className="productPrize">
                                  <div className="price">
                                     ${product.price}
                                  
                                      <button onClick={()=>this.props.addtocart(product)} className="btn">Add to Cart</button>
                                  </div>
                              </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                }
                </Fade>
                {
                    product&&(
                        <Modal isOpen={true} onRequestClose={this.closeModel}>
                            <div>
                            <button onClick={this.closeModel}>x</button>
                            </div>
                            <h4>{product.title}</h4>
                            <div className="model">
                            <Zoom>
                                <img src={product.image} style={{height:"580px",width:"430px"}} alt="dress" />
                            </Zoom>
                            
                            <Fade right cascade>
                                <div className="description" >
                                    
                                      <h4>Description</h4> 
                                
                                <p style={{padding:"20px"}}>
                                {product.description}
                                </p>
                                <div className="details">
                                 Available Size:
                                <button> {product.availableSizes}</button>
                            </div>
                            <div style={{paddingLeft:"30px",fontWeight:"bold"}}>
                                Price:${product.price}
                            </div>
                            <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <button onClick={()=>this.props.addToCart(product)} className="add">Add to Cart</button>
                            </div>
                                </div>
                            </Fade>
                            </div>
                            
                        </Modal>
                    )
                }
                
            </div>
        )
    }
}


export default connect((state)=>({products:state.products.items}),{
    fetchProduct,
    addtocart
})(Display)
