import React from 'react';
import Header from './header.jsx';
import ProductList from './productList.jsx';
import ProductDetails from './ProductDetails.jsx';
import CartSummary from './CartSummary.jsx';
import Checkout from './checkout.jsx';
import Home from './home.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'home',
        params: {}

      },
      // shopperInfoReceipt : [],
      // productReceipt:[],
      cart: [],
      cartQuantity: 1
    };
    this.setView = this.setView.bind(this);
    this.getCartItemQuantity = this.getCartItemQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeItems = this.removeItems.bind(this);
    this.deleteCartItems = this.deleteCartItems.bind(this);
    this.getCartItems = this.getCartItems.bind(this);

    this.updateCartItems = this.updateCartItems.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
    this.decrementItem = this.decrementItem.bind(this);

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

  updateCartItems(productId, quantity) {
    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(productId),
        count: parseInt(quantity)
      })
    };

    fetch('/api/cart.php', req)
    // .then(res => res.json())
    // .then(countItem => {
    //   const allItems = this.state.cart.concat(countItem);
    //   this.setState({ cart: allItems });
    // })
      .then(this.getCartItems);
    // this.getCartItems();
  }

  updateCart(id, quantity) {
    this.updateCartItems(id, quantity);
  }

  incrementItem(id, quantity) {
    this.updateCart(id, quantity);
  }

  decrementItem(id, quantity) {
    if (quantity >= 1) {
      this.updateCart(id, quantity);
    }
  }

  deleteCartItems(productId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(productId)
      })
    };

    fetch('/api/cart.php', req)
    // .then(res => res.json())
    // .then(countItem => {
    //   const allItems = this.state.cart.concat(countItem);
    //   this.setState({ cart: allItems });
    // })
      .then(this.getCartItems);

  }

  removeItems(productId) {
    this.deleteCartItems(productId);
  }

  getCartItemQuantity(cart) { // this is to retrieve an item to be added to the cart
    // console.log('total cart', cart);
    let cartQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
      cartQuantity += parseInt(cart[i].count);
    }
    this.setState({ cartQuantity });
  }

  getCartItems() { // this is the one that retrieve all the total items after being added from getCat
    fetch(`/api/cart.php`)
      .then(res => res.json())
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
      .then(res => { this.getCartItems(); });
  }

  placeOrder(userOrderInfo) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userOrderInfo)
    };

    fetch('/api/orders.php', req)
      .then(orderItem => {
        this.setState({
          cart: [],
          cartQuantity: 0
        });
      });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header text="DreamLight" setViewItem = {this.setView} cartItemCount = {this.state.cartQuantity}/>
          <ProductList setViewItem= {this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        // <div onClick= {() => this.props.setViewItem('catalog', {})}>
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cartQuantity} />
          <ProductDetails setViewItem= {this.setView} viewParams= {this.state.view.params} cartItem = {this.addToCart} resetQuantity = {this.placeOrder} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cartQuantity} />
          <CartSummary allItems= {this.state.cart} setViewItem = {this.setView} cartQuantity={this.state.cartQuantity} deleteOneItem = {this.removeItems} incItem = {this.incrementItem} decItem = {this.decrementItem} />
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header text="Wicked Sales" setViewItem={this.setView} cartItemCount={this.state.cartQuantity} />
          <Checkout userPaymentInfo = {this.placeOrder} setViewItem={this.setView} allItems={this.state.cart} />
        </div>
      );
    } else if (this.state.view.name === 'home') {
      return (
        <div>
          <Home setViewItem={this.setView}/>
        </div>
      );
    }

  }
}
