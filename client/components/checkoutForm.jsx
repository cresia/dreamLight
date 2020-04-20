import React from 'react';

// import { Input, InputGroup, FormFeedback} from 'reactstrap';

export default class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'customerName': '',
      'customerLastName': '',
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
        'creditCardInfoState': '',
        'ccExpState': '',
        'cvvState': '',
        'addressState': '',
        'cityState': '',
        'stateState': '',
        'zipCodeState': ''
      },
      letterRegex: /^[A-Za-z]{2,32}$/
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleCreditCardExpChange = this.handleCreditCardExpChange.bind(this);
    this.handleCreditCardCvvChange = this.handleCreditCardCvvChange.bind(this);
    this.handleShippingAddressInfo = this.handleShippingAddressInfo.bind(this);
    this.handleCityInfo = this.handleCityInfo.bind(this);
    this.handleStateInfo = this.handleStateInfo.bind(this);
    this.handleZipCodeInfo = this.handleZipCodeInfo.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleFieldCheck = this.handleFieldCheck.bind(this);
  }

  handleNameChange(event) {
    this.validateFirstName(event);
    this.setState({
      customerName: event.target.value
    });
  }

  handleLastNameChange(event) {
    this.validateLastName(event);
    this.setState({
      customerLastName: event.target.value
    });
  }

  handleCreditCardChange(event) {
    this.validateCreditCard(event);
    this.setState({
      creditCardInfo: event.target.value
    });
  }

  handleCreditCardExpChange(event) {
    this.validateExpDate(event);
    this.setState({
      creditCardExpInfo: event.target.value
    });
  }

  handleCreditCardCvvChange(event) {
    this.validateCvv(event);
    this.setState({
      creditCardCvvInfo: event.target.value
    });
  }

  handleShippingAddressInfo(event) {
    this.validateAddress(event);
    this.setState({
      shippingAddressInfo: event.target.value
    });
  }

  handleCityInfo(event) {
    this.validateCity(event);
    this.setState({
      shippingCityInfo: event.target.value
    });
  }

  handleStateInfo(event) {
    this.validateState(event);
    this.setState({
      shippingStateInfo: event.target.value
    });
  }

  handleZipCodeInfo(event) {
    this.validateZipCode(event);
    this.setState({
      shippingZipCodeInfo: event.target.value
    });
  }

  validateFirstName(e) {
    const { validate } = this.state;
    if (this.state.letterRegex.test(e.target.value)) {
      validate.nameState = 'has-success';
    } else {
      validate.nameState = 'has-danger';
    }

    this.setState({ validate });
  }

  validateLastName(e) {
    const { validate } = this.state;
    if (this.state.letterRegex.test(e.target.value)) {
      validate.lastNameState = 'has-success';
    } else {
      validate.lastNameState = 'has-danger';
    }

    this.setState({ validate });
  }

  validateCreditCard(e) {
    const creditCardRegex = /^\d{16}$/;
    const { validate } = this.state;
    if (creditCardRegex.test(e.currentTarget.value)) {
      validate.creditCardInfoState = 'has-success';
    } else {
      validate.creditCardInfoState = 'has-danger';
    }
    this.setState({ validate });
  }

  validateExpDate(e) {
    const creditCardExpRegex = /^(1[0-2]|0[1-9]|\d)\/([2-9]\d[1-9]\d|[1-9]\d)$/;
    const { validate } = this.state;
    if (creditCardExpRegex.test(e.currentTarget.value)) {
      validate.ccExpState = 'has-success';
    } else {
      validate.ccExpState = 'has-danger';
    }
    this.setState({ validate });
  }

  validateCvv(e) {
    const creditCardCvvRegex = /^[0-9]{3}$/;
    const { validate } = this.state;
    if (creditCardCvvRegex.test(e.currentTarget.value)) {
      validate.cvvState = 'has-success';
    } else {
      validate.cvvState = 'has-danger';
    }
    this.setState({ validate });
  }

  validateAddress(e) {
    const addressRegex = /[A-Za-z0-9]{6,42}/;
    const { validate } = this.state;
    if (addressRegex.test(e.currentTarget.value)) {
      validate.addressState = 'has-success';
    } else {
      validate.addressState = 'has-danger';
    }
    this.setState({ validate });
  }

  validateCity(e) {
    const cityRegex = /^[A-Za-z]{3,50}$/;
    const { validate } = this.state;
    if (cityRegex.test(e.currentTarget.value)) {
      validate.cityState = 'has-success';
    } else {
      validate.cityState = 'has-danger';
    }
    this.setState({ validate });
  }

  validateState(e) {
    const stateRegex = /^[A-Za-z]{2,}$/;
    const { validate } = this.state;
    if (stateRegex.test(e.currentTarget.value)) {
      validate.stateState = 'has-success';
    } else {
      validate.stateState = 'has-danger';
    }
    this.setState({ validate });
  }

  validateZipCode(e) {
    const zipCodeRegex = /^[0-9]{5}$/;
    const { validate } = this.state;
    if (zipCodeRegex.test(e.currentTarget.value)) {
      validate.zipCodeState = 'has-success';
    } else {
      validate.zipCodeState = 'has-danger';
    }
    this.setState({ validate });
  }

  handleSubmit(event) {
    event.preventDefault();

    const arr = Object.values(this.state.validate);
    // console.log(arr);
    let hasDanger = arr.includes('has-danger'); // is-invalid
    let isBlank = arr.includes('');

    if (hasDanger || isBlank) {
      return; // can't go to the next page
    }

    const x = {
      'name': this.state.customerName,
      'lastName': this.state.customerLastName,
      'CreditCardInfo': this.state.creditCardInfo,
      'creditCardExp': this.state.creditCardExpInfo,
      'creditCardCvv': this.state.creditCardCvvInfo,
      'shippingAddress': this.state.shippingAddressInfo,
      'city': this.state.shippingCityInfo,
      'state': this.state.shippingStateInfo,
      'zipcode': this.state.shippingZipCodeInfo,
      'cart': this.props.cartItems
    };
    this.props.placeOrder(x); // props is from checkout.jsx

  }

  getCartTotal() {
    var cartTotalItem = this.props.cartItems; // coming from checkout of cartItems props
    // console.log("cart total Items: ",cartTotalItem);
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
    <div className="row">
      <div className="col-4">
        <h1 className="checkOutTitle">Checkout</h1>
      </div>

      <div className="col-8">
        <p className="checkoutPrice">Total Purchase: ${(this.getCartTotal() / 100).toFixed(2)}</p>
      </div>

    </div>

    <div className="card col-12 cardMargin">

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">

          <div className="form-row">
            <div className="col colCheckout nameError" data-error="Firstname must contain only letters with 2 or more characters">
              <label id="firstName" >First Name</label>
              <input type="text" value={this.state.customerName} onChange={this.handleNameChange} className={`form-control ${this.state.validate.nameState === '' ? '' : this.state.validate.nameState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="nameInput" placeholder="Enter first name" required />
            </div>

            <div className="col colCheckout">
              <label id="lastName" >Last Name</label>
              <input type="text" value={this.state.customerLastName} onChange={this.handleLastNameChange} className={`form-control ${this.state.validate.lastNameState === '' ? '' : this.state.validate.lastNameState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="nameInput" placeholder="Enter last name" required minLength="2" maxLength="32" />
            </div>
          </div>

        </div>

        <div className="form-group">
          <label id="shipAddress">Shipping Address</label>
          <input value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className={`form-control ${this.state.validate.addressState === '' ? '' : this.state.validate.addressState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="addressInput" placeholder="e.g: 1357 Spectrum" required minLength="6" maxLength="42"></input>

          <div className="form-row">

            <div className="col colCheckout">
              <label id="lastName">City</label>
              <input value={this.state.shippingCityInfo} onChange={this.handleCityInfo} className={`form-control ${this.state.validate.cityState === '' ? '' : this.state.validate.cityState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="FormTextarea" placeholder="City" required minLength="3" maxLength="32"></input>
            </div>

            <div className="col colCheckout">
              <label id="lastName">State</label>
              <input value={this.state.shippingStateInfo} onChange={this.handleStateInfo} className={`form-control ${this.state.validate.stateState === '' ? '' : this.state.validate.stateState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="FormTextarea" placeholder="State" required minLength="2"></input>
            </div>

            <div className="col colCheckout">
              <label id="lastName">Zip</label>
              <input value={this.state.shippingZipCodeInfo} onChange={this.handleZipCodeInfo} className={`form-control ${this.state.validate.zipCodeState === '' ? '' : this.state.validate.zipCodeState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="FormTextarea" placeholder="Zip Code - 5 digits" required minLength="5" maxLength="5"></input>
            </div>

          </div>
        </div>

        <div className="form-group inputForm">

          <div className="form-row">
            <div className="col colCheckout inputSpaceCard">
              <label id="creditNumExpDate">Credit Card</label>
              <input type="text" value={this.state.creditCardInfo} onChange={this.handleCreditCardChange} className={`form-control ${this.state.validate.creditCardInfoState === '' ? '' : this.state.validate.creditCardInfoState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="FormTextarea" placeholder="Enter 16 digit numbers" required minLength="16" maxLength="16" />
            </div>

            <div className="col colCheckout">
              <label id="creditNumExpDate">Expiration Date</label>
              <input type="text" value={this.state.creditCardExpInfo} onChange={this.handleCreditCardExpChange} className={`form-control ${this.state.validate.ccExpState === '' ? '' : this.state.validate.ccExpState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="FormTextarea" placeholder="e.g: 12/25" required minLength="5" maxLength="7"/>
            </div>

            <div className="col colCheckout">
              <label id="cvvStyle">CVV</label>
              <input type="text" value={this.state.creditCardCvvInfo} onChange={this.handleCreditCardCvvChange} className={`form-control ${this.state.validate.cvvState === '' ? '' : this.state.validate.cvvState === 'has-success' ? 'is-valid' : 'is-invalid'}`} id="FormTextarea" placeholder="e.g: 123" required minLength="3" maxLength="4"/>
            </div>

          </div>
        </div>

        <div className="container">
          <div className="form-row">
            {/* <div className="col">
        <button className= "btn btn-link mt-4" onClick= {() => this.props.setView('catalog', {})}>
          {'<'}  continue shopping
        </button>
      </div> */}
            <div className="col colCheckout" >
              {/* <button className="btn btn-dark placeOrderButton" type="submit" onSubmit={() =>this.props.placeOrder}>Place Order</button> */}
              <button className="btn btn-dark placeOrderButton" type="submit" >Place Order</button>

            </div>
          </div>
        </div>

      </form>

    </div>

        {/* <button className="btn btn-dark placeOrderButton" type="button" onClick={ this.handleSubmit}>Place Order</button> */}
  </>

    );
  }

}
