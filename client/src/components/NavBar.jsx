import React, { Component } from 'react'
import { Nav, Navbar, FormControl, Button, Form, Badge } from "react-bootstrap"
import { Cart4 } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

class NavBar extends Component {

    state = {
        media: {
         data:[]
     },
        openModal: false
    }
 
    render() {
      const { cart, query, onSeachQueryUpdated,onSearchClicked,title } = this.props
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home"><Link to="/" style={{ color: "black"}}>{title}</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/backoffice">Backoffice</Link>
                  <Link className="nav-link" to="/createMovie">Information</Link>
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Back Office</Nav.Link> */}
              </Nav>
                

              <Form inline>
                    <FormControl value={query} onChange={(event)=> onSeachQueryUpdated(event.currentTarget.value)} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" onClick={onSearchClicked}>Search</Button>
                </Form>

              <Link to="/cart" className="justify-content-center d-flex mx-3" style={{ color: "black"}}>
                <Badge pill variant={cart.length ? "danger" : "secondary"}>
                    {cart.length}
                </Badge>
                <Cart4 className="ml-2" />
              </Link>

            </Navbar.Collapse>
          </Navbar>
        )
    }
}

export default NavBar