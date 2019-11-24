import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'customerName': '',
      'customerLastName': '',
      'customerEmail': '',
      'customerPhoneNum': '',
      'creditCardInfo': '',
      'creditCardExpInfo': '',
      'creditCardCvvInfo': '',
      'shippingAddressInfo': '',
      'shippingCityInfo': '',
      'shippingStateInfo': '',
      'shippingZipCodeInfo': '',
      validate: {
        'nameState': '',
        'lastNameState': '',
        'emailState': '',
        'phoneNumState': '',
        'creditCardInfoState': '',
        'ccExpState': '',
        'cvvState': '',
        'addressState': '',
        'cityState': '',
        'stateState': '',
        'zipCodeState': ''
      }
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleCreditCardExpChange = this.handleCreditCardExpChange.bind(this);
    this.handleCreditCardCvvChange = this.handleCreditCardCvvChange.bind(this);
    this.handleShippingAddressInfo = this.handleShippingAddressInfo.bind(this);
    this.handleCityInfo = this.handleCityInfo.bind(this);
    this.handleStateInfo = this.handleStateInfo.bind(this);
    this.handleZipCodeInfo = this.handleZipCodeInfo.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validatePhoneNum = this.validatePhoneNum.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      customerName: event.target.value
    });
  }

  handleLastNameChange(event) {
    this.setState({
      customerLastName: event.target.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      customerEmail: event.target.value
    });
  }

  handlePhoneNumChange(event) {
    this.setState({
      customerPhoneNum: event.target.value
    });
  }

  validatePhoneNum(e) {
    const phoneNumRegex = RegExp(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    );

    const { validate } = this.state;
    if (phoneNumRegex.test(e.target.value)) {
      validate.phoneNumState = 'border-success';
    } else {
      validate.phoneNumState = 'border-danger';
    }
    this.setState({ validate });
  }

  handleCreditCardChange(event) {
    this.setState({
      creditCardInfo: event.target.value
    });
  }

  handleCreditCardExpChange(event) {
    this.setState({
      creditCardExpInfo: event.target.value
    });
  }

  handleCreditCardCvvChange(event) {
    this.setState({
      creditCardCvvInfo: event.target.value
    });
  }

  handleShippingAddressInfo(event) {
    this.setState({
      shippingAddressInfo: event.target.value
    });
  }

  handleCityInfo(event) {
    this.setState({
      shippingCityInfo: event.target.value
    });
  }

  handleStateInfo(event) {
    this.setState({
      shippingStateInfo: event.target.value
    });
  }

  handleZipCodeInfo(event) {
    this.setState({
      shippingZipCodeInfo: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const x = {
      'name': this.state.customerName,
      'lastName': this.state.customerLastName,
      'email': this.state.customerEmail,
      'phoneNumber': this.state.customerPhoneNum,
      'CreditCardInfo': this.state.creditCardInfo,
      'creditCardExp': this.state.creditCardExpInfo,
      'creditCardCvv': this.state.creditCardCvvInfo,
      'shippingAddress': this.state.shippingAddressInfo,
      'city': this.state.shippingCityInfo,
      'state': this.state.shippingStateInfo,
      'zipcode': this.state.shippingZipCodeInfo,
      'cart': this.props.allItems
    };
    this.props.userPaymentInfo(x);
  }

  getCartTotal() {
    var cartTotalItem = this.props.allItems;
    // console.log(cartTotalItem)
    var total = 0;
    for (var i = 0; i < cartTotalItem.length; i++) {
      total += parseFloat((cartTotalItem[i].price) * (cartTotalItem[i].count));
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

        <div className= "row">
          <div className= "col">
            <label >First Name</label>
            <input type="text" value={this.state.customerName} onChange={this.handleNameChange} className="form-control" id="exampleFormControlInput1" placeholder="enter name" />
          </div>

          <div className = "col">
            <label >Last Name</label>
            <input type="text" value={this.state.customerLastName} onChange={this.handleLastNameChange} className="form-control" id="exampleFormControlInput1" placeholder="enter name" />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input value={this.state.customerEmail} onChange={this.handleEmailChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input value={this.state.customerPhoneNum} onChange={this.handlePhoneNumChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
        {/* <input valid = {this.state.validate.phoneNumState === 'border-success'} invalid={this.state.validate.phoneNumState === 'border-danger'} value={this.state.customerPhoneNum} onChange={this.handlePhoneNumChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></input> */}
      </div>

      <div className="form-group">

        <div className="row">
          <div className= "col">
            <label>Credit Card</label>
            <input type="text" value={this.state.creditCardInfo} onChange={this.handleCreditCardChange} className="form-control" id="exampleFormControlInput1" placeholder="enter credit card" />
          </div>

          <div className= "col">
            <label>Expiration Date</label>
            <input type="text" value={this.state.creditCardExpInfo} onChange={this.handleCreditCardExpChange} className="form-control" id="exampleFormControlInput1" placeholder="01/22" />
          </div>

          <div className="col">
            <label>CVV</label>
            <input type="text" value={this.state.creditCardCvvInfo} onChange={this.handleCreditCardCvvChange} className="form-control" id="exampleFormControlInput1" placeholder="123" />
          </div>

        </div>
      </div>

      <div className="form-group">
        <label>Shipping Address</label>
        {/* <textarea value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
        <input value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
      </div>

      <div className="form-group">
        <div className="row">

          <div className= "col">
            <label>City</label>
            {/* <textarea value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
            <input value={this.state.shippingCityInfo} onChange={this.handleCityInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
          </div>

          <div className="col">
            <label>State</label>
            {/* <textarea value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
            <input value={this.state.shippingStateInfo} onChange={this.handleStateInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
          </div>

          <div className="col">
            <label>ZipCode</label>
            {/* <textarea value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
            <input value={this.state.shippingZipCodeInfo} onChange={this.handleZipCodeInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
          </div>

        </div>

      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <button className= "btn btn-link mt-4" onClick= {() => this.props.setViewItem('catalog', {})}>
              {'<'}  continue shopping
            </button>
          </div>
          <div className="col" >
            {/* <button type="submit" className="btn btn-dark placeOrderButton">Place Order</button> */}

            <button onClick={() => this.props.setViewItem('confirmation', {})} className="btn btn-dark placeOrderButton">Place Order</button>

          </div>
        </div>
      </div>

    </form>
  </>

    );
  }

}
