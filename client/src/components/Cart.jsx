import React, { Component } from 'react'
import CartItem from "./CartItem"
import { Container, Row } from 'react-bootstrap'

class Cart extends Component {
    render() {
        console.log(this.props.cart.reduce((tot, item) => tot + parseFloat(item.total), 0))

        return (
            <Container className="my-5">
                <h2>Total: € {Math.round(this.props.cart.reduce((tot, item) => tot + parseFloat(item.total), 0))}</h2>
                {this.props.cart.map(product => 
                        <CartItem
                        key={product.id}
                        onproductRemovedFromCart={this.props.onproductRemovedFromCart}
                        item={product} />)}
            </Container>
        )
    }
}

export default Cart