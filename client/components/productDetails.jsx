import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import NightLight from './carousel.jsx';
// import { throws } from 'assert';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      modal: false,
      buttonLabel: ''
      // LongDesResult: ''
    };
    this.getProductDetails = this.getProductDetails.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (this.state.modal) {
      return;
    }
    this.setState({ modal: !this.state.modal });
    setTimeout(() => { this.setState({ modal: !this.state.modal }); }, 1800);
  }

  componentDidMount() {
    this.getProductDetails(this.props.id);
  }

  getProductDetails(props) { // to retrieve the cart by id
    const setParamId = this.props.viewParams.id;
    fetch(`/api/products.php?id=` + setParamId)
      .then(res => res.json())
      .then(response => this.setState({ product: response }));
  }

  addItemToCart() {
    let product = this.state.product[0];
    let quantity = this.state.quantity;
    this.props.cartItem(product.id, quantity);
    // console.log("inside addItemCart");
  }

  incrementQuantity() {
    let quantity = this.state.quantity;
    let newQuantity = ++quantity;
    this.setState({ quantity: newQuantity });
  }

  decrementQuantity() {
    let quantity = this.state.quantity;
    let newQuantity = --quantity;
    if (this.state.quantity > 1) {
      this.setState({ quantity: newQuantity });
    }
  }

  render() {
    let quantity = this.state.quantity;
    // let result = this.state.LongDesResult;

    if (this.state.product != null) {
      // console.log('the states are:', this.state);
      let longDes = this.state.product[0].longDescription;
      // let splitLongDes = longDes.split(', ');
      // for (var i = 0; i < splitLongDes.length; i++) {
      //   result += '- ' + splitLongDes[i] + '\n';
      // }
      // console.log(result);

      const resultLongDes = (
        <ul>
          {
            longDes.split(', ').map((line, index) => {
              return <li key={index}>{line}</li>;
            })
          }
        </ul>
      );

      return (

        <div key={this.state.product.id} className="card cardDetails col-12 mx-6 my-6">
          {/* <button className= "btn btn-secondary" onClick= {() => this.props.setViewItem('catalog', {})}>
              Back to Catalog
          </button> */}

          <div className="card-body bodyDes">

            <div className="row justify-content-center">

              <div className="col-12 col-sm-6 col-md-6">
                <NightLight className="card-img-top" carouselImages={this.state.product[0].images} alt="OneItem" />
              </div>

              <div className="col-12 col-sm-6 col-md-6 marginDetails">
                <h5 className="card-titleDetails">{this.state.product[0].name}</h5>
                <p className="card-titlePrice">${(this.state.product[0].price / 100).toFixed(2)}</p>

                <div className= "row card-Icons">
                  <div className= "col ">
                    <i onClick={this.decrementQuantity} className="minusPlusButton far fa-minus-square"></i>
                  </div>

                  <div className= "col">
                    <div className="quantityProDect">{quantity}</div>
                  </div>

                  <div className= "col">
                    <i onClick={this.incrementQuantity} className="minusPlusButton2 far fa-plus-square "></i>
                  </div>
                  <Button className="addToCartButton" color="success" onClick={() => { this.toggle(); this.addItemToCart(); }} type="button"> {this.state.buttonLabel} Add To Cart </Button>

                </div>

                <Button className="backToCatalogButton" color="dark" onClick={() => this.props.setViewItem('catalog', {})}> Back to Catalog </Button>

                <div className="detailTitle">
                  Details:
                </div>
                {/* <p className="longDes">{this.state.product[0].longDescription}</p> */}
                {/* <p className="longDes">{result}</p> this is when using for loop n css */}

                <div className="longDes">{resultLongDes}</div>

              </div>
            </div>
          </div>

          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader> DreamLight! </ModalHeader>

              <ModalBody>
               The item is being added to the cart
              </ModalBody>

            </Modal>
          </div>

        </div>

      );

    }

    return null;

  }

}
