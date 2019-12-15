import React from 'react';
import CheckoutForm from './checkoutForm.jsx';
import Confirmation from './confirmation.jsx';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'form',
      userInfo: null
    };
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleCheckout(userSumInfo) {
    this.setState({
      userInfo: userSumInfo,
      view: 'confirmation'
    });
    this.props.userPaymentInfo(userSumInfo);
  }

  render() {
    if (this.state.view === 'form') {
      return (
        <CheckoutForm setView = {this.props.setViewItem} cartItems = {this.props.allItems} placeOrder = {this.handleCheckout} />
      );
    } else if (this.state.view === 'confirmation') {
      return (
        // <Confirmation setView = {this.props.setViewItem} userInfo = {this.state.userInfo} cartItems= {this.props.allItems} />
        <Confirmation setView = {this.props.setViewItem} userInfo = {this.state.userInfo} />
      );
    }
    return null;
  }
}
