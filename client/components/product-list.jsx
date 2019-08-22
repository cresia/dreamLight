import React from 'react';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
  }

  getProducts() {
    fetch(`/api/products.php`)
      .then(res => res.json);

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
          One of three columns
          </div>
          <div className="col-sm">
          One of three columns
          </div>
          <div className="col-sm">
          One of three columns
          </div>
        </div>
      </div>
    );
  }
}
