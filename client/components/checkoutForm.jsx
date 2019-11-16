import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'customerName': '',
      'creditCardInfo': '',
      'shippingAddressInfo': ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressInfo = this.handleShippingAddressInfo.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ customerName: event.target.value });
  }

  handleCreditCardChange(event) {
    this.setState({ creditCardInfo: event.target.value });
  }

  handleShippingAddressInfo(event) {
    this.setState({ shippingAddressInfo: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const x = {
      'name': this.state.customerName,
      'CreditCardInfo': this.state.creditCardInfo,
      'shippingAddress': this.state.shippingAddressInfo,
      'cart': this.props.allItems

    };
    this.props.userPaymentInfo(x);
  }

  getCartTotal() {
    var cartTotalItem = this.props.allItems;
    var total = 0;
    for (var i = 0; i < cartTotalItem.length; i++) {
      total += parseFloat(cartTotalItem[i].price);
    }
    return total;
  }

  render() {
    return (
    <>

    <h1 className="checkOutTitle">Checkout</h1>
    <p className="checkoutPrice">Order Total:${(this.getCartTotal() / 100).toFixed(2)}</p>

    <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label >Name</label>
        <input type="text" value={this.state.customerName} onChange={this.handleNameChange} className="form-control" id="exampleFormControlInput1" placeholder="enter name" />
      </div>

      <div className="form-group">
        <label>Credit Card</label>
        <input type="text" value ={this.state.creditCardInfo} onChange={this.handleCreditCardChange} className="form-control" id="exampleFormControlInput1" placeholder="enter credit card" />
      </div>

      <div className="form-group">
        <label>Shipping Address</label>
        <textarea value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <button className= "btn btn-link mt-4" onClick= {() => this.props.setViewItem('catalog', {})}>
              {'<'}  continue shopping
            </button>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-dark placeOrderButton ">Place Order</button>

          </div>
        </div>
      </div>

    </form>
  </>

    );
  }

}
