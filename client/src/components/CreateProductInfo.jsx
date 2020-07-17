import React, { Component } from 'react'
import { Modal, Button, Form } from "react-bootstrap"
      
class CreateProductInfo extends Component {
      
    state = {
        name: "",
        brand: "",
        category: "",
        price: 0,
        imageurl: "",
        //id: "",
        description: "",
    }

    createproduct = async () => {
        const newproduct = {
            ...this.state
        }

        const productResp = await fetch("http://localhost:3003/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newproduct)
        })
        
        if (productResp.ok) {// check if the response is ok
            this.props.onNewProductInfo(newproduct)// tell the parent we have a new kid in town
        }
    }

    render() {
        const { onClose, show } = this.props

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert product in catalogue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group controlId="id">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ id: e.currentTarget.value })}
                                value={this.state.id}
                                placeholder="id - Unique product ID" />
                        </Form.Group> */}
                        <Form.Group controlId="name">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.currentTarget.value })}
                                type="text" placeholder="name" />
                        </Form.Group>
                        <Form.Group controlId="brand">
                            <Form.Label>brand</Form.Label>
                            <Form.Control
                                value={this.state.brand}
                                onChange={(e) => this.setState({ brand: e.currentTarget.value })}
                                type="text" placeholder="brand" />
                        </Form.Group> 
                        <Form.Group controlId="category">
                            <Form.Label>category</Form.Label>
                            <Form.Control
                                value={this.state.category}
                                onChange={(e) => this.setState({ category: e.currentTarget.value })}
                                type="text" placeholder="category" />
                        </Form.Group>                        
                        <Form.Group controlId="description">
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                value={this.state.description}
                                onChange={(e) => this.setState({ description: e.currentTarget.value })}
                                description="text" placeholder="description" />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                value={this.state.price}
                                onChange={(e) => this.setState({ price: e.currentTarget.value })}
                                type="number" placeholder="price" />
                        </Form.Group>
                        <Form.Group controlId="imageurl">
                            <Form.Label>imageurl</Form.Label>
                            <Form.Control
                                value={this.state.imageurl}
                                onChange={(e) => this.setState({ imageurl: e.currentTarget.value })}
                                type="text" placeholder="imageurl" />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.createproduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateProductInfo