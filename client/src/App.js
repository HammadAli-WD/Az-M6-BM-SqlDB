import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button} from "react-bootstrap"
import Navigation from "./components/NavBar"
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import HomePage from './components/HomePage';
import BackOffice from './components/BackOffice';
import { DashCircleFill, PlusCircleFill } from "react-bootstrap-icons"
import Edit from "./components/Edit"
import Cart from "./components/Cart"
import SearchField from './components/SearchField';


class App extends React.Component {

  state = {
    products:[],
    cart: [],
    page: 0,
    pageSize: 10,
    searchQuery: "",
    navigationTitle: "StriveZon"
  }

  setPage = async (page) => {
    this.setState({
      page:page
    }, async () => {
      await this.fetchData()
    })
  }

  handleProductAddedToCartOnline = async () => {
    await this.fetchCart()
  }

  handleProductAddedToCard = async (id) => {
    const element = this.state.cart.find(prd => prd.id === id)
    if (element) {
      element.quantity ++
      element.total = element.quantity * element.unitary_price
      this.setState({
        cart: this.state.cart
      })
    }
    else{
      const product = this.state.products.find(prd => prd.id === id)
      this.setState({
        cart: [...this.state.cart, {
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          description: product.description,
          unitary_price: product.price,
          quantity: 1,
          total: product.price
        }]
      })
    }
  }
handleProductRemovedFromCartOnline = async () => {
  await this.fetchCart()
}

handleProductRemovedFromCart = async (id) => {
  const element = this.state.cart.find(prd => prd.id === id)
  if (element.quantity > 1){
    element.quantity --
    element.total = element.quantity * element.unitary_price
    this.setState({
      cart: this.state.cart
    })
  }
  else {
    this.setState({
      cart: this.state.cart.filter( x => x.id !== id)
    })
  }
}
  render() {
    return (
      <Router>
      <div>

       <Navigation
        title={this.state.navigationTitle}
        cart={this.state.cart}
        query={this.state.searchQuery}
        onSeachQueryUpdated={(value) => this.setState({ searchQuery: value })}
        onSearchClicked={this.fetchData}
        />
        <SearchField />
        
        <Switch>
          <Route path="/details/:id">
            <Edit />
          </Route>
          <Route path="/backoffice">
            <BackOffice />
          </Route>
          <Route path="/" exact>
          <Row className="my-4 justify-content-center">
              {this.state.page > 0 && <Button variant="success" onClick={() => this.setPage(this.state.page-1)}><DashCircleFill /></Button>}
              <Button variant="success"  onClick={() => this.setPage(this.state.page + 1)}><PlusCircleFill /></Button>
          </Row>
             <HomePage 
             onImageClicked={(newValue) => this.setState({navigationTitle: newValue})}
             onProductAddedToCart={this.handleProductAddedToCard}
             products={this.state.products} />
          </Route>
          <Route path="/cart" exact >
            <Cart 
            onProductRemovedFromCart={this.handleProductRemovedFromCart}
            cart={this.state.cart} />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }


fetchData = async () => {
  if (this.state.searchQuery.length > 0){
    const res = await fetch(`http://localhost:3003/products/search/${this.state.searchQuery}?limit=${this.state.pageSize}&offset=${this.state.page * this.state.pageSize}`)
    const products = await res.json()
    this.setState({
      products: products
    })
  }
  else {
    const res = await fetch(`http://localhost:3003/products?limit=${this.state.pageSize}&offset=${this.state.page * this.state.pageSize}`)
    const products = await res.json()
    this.setState({
      products: products
    })
  }
  
}

fetchCart = async () => {
  const res = await fetch(`http://localhost:3003/cart/1`)
  const products = await res.json()
  this.setState({
    cart: products
  })
}

componentDidMount = async () => {
  await this.fetchData()
  await this.fetchCart()
}
}

export default App;