import React, { Component } from 'react'
//import BookListItem from './BookListItem'
import HomePage from './HomePage'

class SearchField extends Component {
    state = {
        searchQuery: "",
        products: []
    }

    searchSomething = async () => {
        const res = await fetch(`http://localhost:3003/products/search/` + this.state.searchQuery)
        const products = await res.json()
        this.setState({
          products: products
        })
    }

    render() {
        return (
            <div>
                <input placeholder="Please search here..."
                    value={this.state.searchQuery}
                    onChange={e => this.setState({searchQuery: e.currentTarget.value})}
                    />

                <button onClick={this.searchSomething}>SearchCategory</button>

                {this.state.products.map(x => <HomePage item={x} />)}
            </div>
        )
    }
}
export default SearchField