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

  getProductDetails() {
    fetch(`/api/products.php?id=1`)
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(response => this.setState({ product: response }));
  }

  render() {
    return (

      <div className="card mb-3" style="max-width: 540px;">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={this.state.image} className="card-img" alt="OneItem" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{this.state.name}</h5>
              <p className="card-text">{(this.state.price / 100).toFixed(2)}</p>
              <p className="card-text">{this.state.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

    );

    // return (<ProductItemDetails key={this.state.product.id}
    // id = {this.state.id}
    // name = {this.state.name}
    // price = {this.state.price}
    // image = {this.state.image}
    // shortDescription = {this.state.shortDescription}/>)

  }

}
