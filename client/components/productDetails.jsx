import React from 'react';
// import ProductItemDetails from './productListItem.jsx';

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

  getProductDetails(props) {
    const setParamId = this.props.params;
    fetch(`/api/products.php?id=` + setParamId)
      .then(res => res.json())
      .then(response => this.setState({ product: response }));
  }

  render() {

    if (this.state.product != null) {
      return (
        <div key= {this.state.product.id} className="card mb-3">
          <a href="">back to Catalog </a>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={this.state.product.image} className="card-img" alt="OneItem" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{this.state.product.name}</h5>
                <p className="card-text">{this.state.product.shortDescription}</p>
                <p className="card-text badge badge-primary">{(this.state.product.price / 100).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

      );

    }

    return null;

  }

}
