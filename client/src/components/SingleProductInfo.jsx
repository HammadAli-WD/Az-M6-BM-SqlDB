import React, { Component } from 'react'
import { Media, Button, Container, Row, Col, Card} from "react-bootstrap"
import { Link } from 'react-router-dom'

class SingleProductInfo extends Component {

    deleteBook = async (id) =>{
        const productsResp = await fetch("http://localhost:3003/products/" + id, {
            method: "DELETE"
        })
        if (productsResp.ok){
            this.props.onDelete(id)
        }
    }

 
    render() {
        const { name, brand, price, category, description, imageurl, id } = this.props.item

        return (
            
          <Container>
          <Row>
          <Col md={4} sm={6} lg={2} >
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>{name}-{brand}</Card.Header>
              <Card.Body>
                <Card.Title>{category}</Card.Title>
                <Card.Text>
                {price}
                </Card.Text>
                <Button className="ml-5" variant="danger" onClick={() => this.deleteBook(id) } >Delete</Button>
                <Button className="ml-5" variant="warning"><Link to={"/details/" + id}>Edit</Link></Button>
              </Card.Body>
            </Card>
            <br />
            </Col>
            </Row>
          </Container>
        )
    }
}

export default SingleProductInfo