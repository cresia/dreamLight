import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails() {
    const setParamId = this.props.viewParams.id;
    fetch(`/api/products.php?id=` + setParamId)
      .then(res => res.json())
      .then(response => this.setState({ product: response }));
  }

  render() {

    if (this.state.product != null) {
      return (

        <div key= {this.state.product.id} className="container itemDetails">
          <a href="">
            {'<'}  Back to Catalog
          </a>

          <div className="row productDes">
            <div className="col-12 col-md-8">
              <img src={this.state.product.image} className="card-img" alt="OneItem" />
            </div>

            <div className="col-6 col-md-4 short">
              <h5 className="card-title">{this.state.product.name}</h5>
              <p className="card-text badge badge-primary">{(this.state.product.price / 100).toFixed(2)}</p>
              <p className="card-text">{this.state.product.shortDescription}</p>
              <button onClick={() => { this.props.cartItem(this.state.product); } } type="button" className="btn btn-outline-secondary mt-4" > Add to Cart</button>
            </div>
          </div>

          <div >
            <p className = "card-text shortDes">{this.state.product.longDescription}</p>
          </div>

        </div>

      );

    }

    return null;

  }

}
