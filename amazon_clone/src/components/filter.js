import React, { Component } from 'react'

import '../index.css'

export default class filter extends Component {
    render() {
        return (
            <div className="component">
                <div className="count">Products:{this.props.count}</div>
                <div className="order">
                 Order   <select value={this.props.sort} onChange={this.props.sortProduct}>
                        <option value="">latest</option>
                        <option value="lowest">lowest</option>
                        <option value="highest">highest</option>
                    </select>
                </div>
                <div className="filter">
                    filter <select value={this.props.size} onChange={this.props.sizeProduct} style={{fontSize:"13px"}}>
                        <option value="">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        )
    }
}
