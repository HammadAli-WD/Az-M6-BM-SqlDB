import React, { Component } from 'react'
//import SingleProduct from "./SingleProduct"
import { Card,Col,Table, Container, Row, ListGroup, Button } from 'react-bootstrap'

class HomePage extends Component {
   state = {
       products: []
   }

   addToCard = async () => {
    const resp = await fetch("http://localhost:3003/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                productid: this.props.productid,
                userid: 1
            }
        )
    })
    if (resp.ok)
        this.props.onProductAddedToCart(this.props.productid)
    else 
        alert("something went wrong!!")
}

    render() {
        return (
            <Container>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">

                {this.state.products.map(prd =>                 
                 <>
                 {/* <ListGroup>
                  <ListGroup.Item>{prd.title}-{prd.year} <br />
                  {prd.TimeOfArrival}
                  </ListGroup.Item>                  
                </ListGroup> */}
                <Col className="mb-2">
                <Card style={{ width: '12rem' }}>
                    <Card.Img variant="top" src={prd.imageurl} />
                    <Card.Body>
                        <Card.Title>{prd.name}</Card.Title>
                        <Card.Text>
                        {prd.description}
                        </Card.Text>
                        <Button variant="primary" onClick={this.addToCard}>Add to Cart</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                
                </>
                )}
                </Row>
            </Container>
        )
    }

    componentDidMount = async () => {
        const productsResp = await fetch("http://localhost:3003/products")
        const products = await productsResp.json()
        console.log(products)
        this.setState({
            products: products
        })
    }
}

export default HomePage