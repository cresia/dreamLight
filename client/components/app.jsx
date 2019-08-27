import React from 'react';
import Header from './header.jsx';
import ProductList from './productList.jsx';
import ProductDetails from './ProductDetails.jsx';
// import CartSummaryItem from './CartSummaryItem.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
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
        const allItems = this.state.cart.concat(countItem);
        this.setState({ cart: allItems });
      });

  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header text="Wicked Sales" cartItemCount = {this.state.cart.length}/>
          <ProductList setViewItem= {this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header text="Wicked Sales" cartItemCount = {this.state.cart.length} />

          <ProductDetails setViewItem= {this.setView} viewParams= {this.state.view.params} cartItem = {this.addToCart}/>
        </div>

      );
    }

  }
}
