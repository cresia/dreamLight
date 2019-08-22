import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  componentDidMount() {
    this.getProductDetails();

  }

  getProductDetails() {
    fetch(`/api/products.php?id=1`)
      .then(res => res.json())
      .then(response => this.setState({ products: response }));
  }

  render() {
    return null;
  }

}
