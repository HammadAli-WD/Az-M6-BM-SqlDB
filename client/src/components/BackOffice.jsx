import React, { Component } from 'react'
import SingleProductInfo from "./SingleProductInfo"
import { Col, Container, Row, Button } from 'react-bootstrap'
import CreateProductInfo from './CreateProductInfo'

class BackOffice extends Component {
   state = {
    products: [],
       openModal: false
   }

    render() {
        return (
            <Container>
                <h1>Welcome to the backoffice <Button onClick={() => this.setState({ openModal: true})}>Create New</Button></h1>
                <CreateProductInfo show={this.state.openModal} 
                            onClose={() => this.setState({ openModal: false})}
                            onNewProductInfo={(ProductInfo)=> this.setState({
                                products: this.state.products.concat(ProductInfo),
                                openModal: false
                            })}
                            />
                <Row className="mt-5" >
                    
                {this.state.products.map(ProductInfo => 
                <Col xs={6} md={4}>
                    <SingleProductInfo item={ProductInfo}
                        onDelete={(id) => 
                            this.setState({
                            products: this.state.products.filter(ProductInfo => ProductInfo.id !== id)
                        }) }
                        
                 
                    /> 
                    </Col>
                )}
                
                </Row> 
            </Container>
        )
    }

    componentDidMount = async () => {
        const productsResp = await fetch("http://localhost:3003/products")
        const products = await productsResp.json()
        console.log('std', products)
        this.setState({
            products: products
        })
    }
}

export default BackOffice