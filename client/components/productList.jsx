import React from 'react';
import ProductListItem from './productListItem.jsx';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }
  getProducts() {
    fetch(`/api/products.php`)
      .then(res => res.json())
      .then(response => this.setState({ products: response }));
  }

  render() {
    const products = this.state.products.map(singleProductData => {
      return (
        <ProductListItem key={singleProductData.id}
          id = {singleProductData.id}
          name = {singleProductData.name}
          price = {singleProductData.price}
          image = {singleProductData.image}
          shortDescription = {singleProductData.shortDescription}
        />
      );
    });
    return (
      <div className="container">
        <div className="row">
          {products}
        </div>
      </div>
    );
  }
}
