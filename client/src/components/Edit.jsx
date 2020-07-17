import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Row, Col, Form, Button, Image, Container} from "react-bootstrap"
//import CommentsList from './CommentsList'

class Edit extends Component {
   state = {
        id: "",
       name: "",
       brand: "",
       price: "",
       category: "",
       description:"",
       imageurl:"",
      
      
    }

   editproduct = async () =>{
    const update = {...this.state}
    

    const productsResp = await fetch("http://localhost:3003/products/" + this.state.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    })
    const product = await productsResp.json()
    console.log(product)
   }

   /* uploadCover = async () =>{ 
       const formData = new FormData()
       formData.append("avatar", this.state.selectedFile)
        const productsResp = await fetch("http://localhost:3001/products/" + this.state.id + "/upload", {
            method: "POST",
            body: formData
    })
} */


    render() {
        //const { name, email, category, price, id } = this.state
        const { name, brand, price, category, description, imageurl, id } = this.state
        return (
            <Container className="mt-5" >
            <Row>
                
                <Col className="mt-5" >
                <Form>
                        <Form.Group controlId="id">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ id: e.currentTarget.value })}
                                value={this.state.id}
                                disabled
                                placeholder="id - Unique Amazon ID" />
                        </Form.Group>
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
                                type="text" placeholder="description" />
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
                        
                        <Button variant="success" onClick={this.editproduct}>Save Changes</Button>


                        {/* <input type="file" onChange={e => this.setState({ selectedFile: e.currentTarget.files[0]}) } /> */}
                        {/* <Button variant="success" onClick={this.uploadCover}>Upload cover</Button> */}
                    </Form>

                   {/*  <CommentsList id={this.props.match.params.id} /> */}
                </Col>

            </Row>
            </Container>
        )
    }
    
    componentDidMount = async ()=>{
        const id = this.props.match.params.id;
        const productsResp = await fetch("http://localhost:3003/products/" + id)
        const product = await productsResp.json()
        console.log("BEFORE COMPONENT DID MOUNT", this.state)

        this.setState({...product})
    }
}

export default withRouter(Edit)