import React from 'react';
import Header from './header.jsx';
import ProductList from './productList.jsx';
import ProductDetails from './ProductDetails.jsx';
import CartSummary from './CartSummary.jsx';
import CheckoutForm from './checkoutForm.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cartQuantity: 0
    };
    this.setView = this.setView.bind(this);
    this.getCartItemQuantity = this.getCartItemQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, id) {
    this.setState({
      view: {
        name: name,
        params: id
      }
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItemQuantity(cart) {
    let cartQuantity = 0;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        cartQuantity += parseInt(cart[i].count);
      }
      this.setState({ cartQuantity });
    }
  }

  getCartItems() {
    fetch(`/api/cart.php`)
      .then(res => res.json())
      // .then(response => this.setState({ cart: response }));
      .then(cart => {
        this.setState({ cart }, () => this.getCartItemQuantity(cart));
      });
  }

  addToCart(productId, quantity) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(productId),
        count: quantity
      })
    };

    fetch('/api/cart.php', req)
      .then(res => res.json())
      .then(countItem => {
        const allItems = this.state.cart.concat(countItem);
        this.setState({ cart: allItems });
      });

    this.getCartItems();
  }

  placeOrder(userOrderInfo) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userOrderInfo)
    };

    fetch('/api/orders.php', req)
      .then(res => res.json())
      .then(orderItem => {
        this.setState({ cart: [] });
        this.setState({ view:
          {
            name: 'catalog',
            params: {} }
        }
        );
      });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cart.length}/>
          <ProductList setViewItem= {this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        // <div onClick= {() => this.props.setViewItem('catalog', {})}>
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cart.length} />
          <ProductDetails setViewItem= {this.setView} viewParams= {this.state.view.params} cartItem = {this.addToCart}/>
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cart.length} />
          <CartSummary allItems= {this.state.cart} setViewItem = {this.setView} cartQuantity={this.state.cartQuantity}/>
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cart.length} />
          <CheckoutForm userPaymentInfo = {this.placeOrder} setViewItem = {this.setView} allItems= {this.state.cart} />
        </div>
      );
    }
  }
}
