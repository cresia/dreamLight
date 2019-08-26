import React from 'react';
import Header from './header.jsx';
import ProductList from './productList.jsx';
import ProductDetails from './ProductDetails.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {},
        cart: []
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    this.getCartItems();

  }

  getCartItems() {
    fetch(`/api/cart.php`)
      .then(res => res.json())
      // .then(response => console.log(response));
      .then(response => this.setState({ cart: response }));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };

    fetch('/api/cart.php', req)
      .then(res => res.json())
      .then(countItem => {
        const allItems = this.state.view.cart.concat(countItem);
        this.setState({ cart: allItems });
      });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header text="Wicked Sales" />
          <ProductList setViewItem= {this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header text="Wicked Sales" cartItemCount= {this.state.view.cart} />
          <ProductDetails setViewItem= {this.setView} viewParams= {this.state.view.params}/>
        </div>

      );
    }

  }
}
