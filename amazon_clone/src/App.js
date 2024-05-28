import React from 'react';

import './index.css'
import data from './data.json'
import Product from './components/product';
import Filter from './components/filter';
import Cart from './components/cart';
import { Provider } from 'react-redux'

import store from './store'


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      products:data.products,
      size:"",
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
      sort:""
    }
  }

  sizeProduct = (event)=>{
    console.log(event.target.value)

    if(event.target.value === ""){
      this.setState({
        size:event.target.value,
        products:data.products
      })

    }
    else{
      this.setState({
        size:event.target.value,
        products:data.products.filter((product)=>product.availableSizes.indexOf(event.target.value)>=0)
      })
    }


  }

  sortProduct = (event)=>{
    const sort = event.target.value;
    this.setState((state)=>({
      sort:sort,
      products:this.state.products
      .slice()
      .sort((a,b)=>
      sort === "lowest"
      ?a.price > b.price
      ?1:-1
      :sort === "highest"
      ?a.price < b.price
      ?1:-1
      :a._id > b._id
      ?1:-1
      )
    }))
  }


  render(){
    return (
      <Provider
      store={store}
      >

      <div className="gridcontainer">
        <div className="header">
          <a href="/">amazon</a>
        </div>
        <div className="main">
         <div className="content">
           <div className="maincontent">
             <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} 
             
             sizeProduct = {this.sizeProduct}

             sortProduct = {this.sortProduct}

             />
             <Product />
           </div>

           <div className="sidebar">
             <Cart  />
           </div>
         </div>
        </div>
        <div className="footer">
          All rights is reserved
        </div>
  
      </div>

      </Provider>
  
    );
  }
}

export default App;
