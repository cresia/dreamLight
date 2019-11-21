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
      view: {
        name: 'catalog',
        params: {}

      },
      cart: [],
      // count: 0, // this is for the update quantity
      cartQuantity: 0
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

    // this.incrementItem();
    // this.decrementItem();

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
    // let item = this.state.view.params.id;
    // let newCount = this.state.cartQuantity;
    this.updateCartItems(id, quantity);

  }

  incrementItem(id, quantity) {
    // let currentCount = this.state.cartQuantity;
    // let newCount = ++currentCount;
    // this.setState({ cartQuantity: newCount });
    this.updateCart(id, quantity);
  }

  decrementItem(id, quantity) {
    // let currentCount = this.state.cartQuantity;
    // let newCount = --currentCount;
    if (this.state.cartQuantity >= 1) {
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
    // this.getCartItems();
    // this.setViewItem('cart', '');
  }

  getCartItemQuantity(cart) { // this is to retrieve an item to be added to the cart
    // console.log('total cart', cart);
    let cartQuantity = 0;
    // if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      cartQuantity += parseInt(cart[i].count);
    }
    this.setState({ cartQuantity });
    // };
  }

  getCartItems() { // this is the one that retrieve all the total items after being added from getCat
    fetch(`/api/cart.php`)
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart }, () => this.getCartItemQuantity(cart));
      });
  }

  addToCart(productId, quantity) {
    // debugger;
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
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cartQuantity}/>
          <ProductList setViewItem= {this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        // <div onClick= {() => this.props.setViewItem('catalog', {})}>
        <div>
          <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cartQuantity} />
          <ProductDetails setViewItem= {this.setView} viewParams= {this.state.view.params} cartItem = {this.addToCart}/>
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
          {/* <Header text="Wicked Sales" setViewItem = {this.setView} cartItemCount = {this.state.cart.length} /> */}
          <Header text="Wicked Sales" setViewItem={this.setView} cartItemCount={this.state.cartQuantity} />
          <CheckoutForm userPaymentInfo = {this.placeOrder} setViewItem = {this.setView} allItems= {this.state.cart} />
        </div>
      );
    }
  }
}
