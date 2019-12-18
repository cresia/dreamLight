// import React from 'react';
// import NightLight from './carousel.jsx';

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import NightLight from './carousel.jsx';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      modal: false,
      buttonLabel: ''
    };
    this.getProductDetails = this.getProductDetails.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    setTimeout(() => { this.setState({ modal: !this.state.modal }); }, 1500);
  }

  componentDidMount() {
    this.getProductDetails(this.props.id);
    // this.props.resetQuantity();
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

    if (this.state.product != null) {
      // console.log('the states are:', this.state);
      return (

        <div key= {this.state.product.id} className="container itemDetails">
          <button className= "btn btn-link" onClick= {() => this.props.setViewItem('catalog', {})}>
            {'<'}  Back to Catalog
          </button>

          <div className="row productDes">

            <div className="col-12 col-md-8">
              <NightLight className="card-img-top" carouselImages={this.state.product[0].images} alt="OneItem" />

            </div>

            <div className="col-6 col-md-4 short">
              <h5 className="card-title">{this.state.product[0].name}</h5>
              <p className="card-text badge badge-primary">{(this.state.product[0].price / 100).toFixed(2)}</p>

              <div className = "row">
                <div className= "col-4 col-sm-2">
                  <i onClick={this.decrementQuantity} className="fas fa-minus-square"></i>
                </div>

                <div className= "col-4 col-sm-2">
                  <div>{quantity}</div>
                </div>

                <div className= "col-4 col-sm-2">
                  <i onClick={this.incrementQuantity} className="fas fa-plus-square"></i>
                </div>

              </div>

              <p className="card-text">{this.state.product[0].shortDescription}</p>
              {/* <button onClick={() => { this.props.cartItem(this.state.product); } } type="button" className="btn btn-outline-secondary mt-4" > Add to Cart</button> */}
              {/* <button onClick={this.addItemToCart} type="button" className="btn btn-outline-secondary mt-4"> Add to Cart</button> */}

              <Button color="secondary" onClick={() => { this.toggle(); this.addItemToCart(); }} type="button"> {this.state.buttonLabel} Add To Cart </Button>
            </div>

          </div>

          <div>
            <p className = "card-text">{this.state.product[0].longDescription}</p>
          </div>

          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.className}>
              <ModalHeader toggle={this.toggle}> DreamLight! </ModalHeader>

              <ModalBody>
               This Item is being added to the Cart
              </ModalBody>

            </Modal>
          </div>

        </div>

      );

    }

    return null;

  }

}
