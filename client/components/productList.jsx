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
          onClickOneItem = {this.props.setViewItem}
          id = {singleProductData.id}
          name = {singleProductData.name}
          price = {singleProductData.price}
          image = {singleProductData.images[0]}
          shortDescription = {singleProductData.shortDescription}
          longDescription = {singleProductData.longDescription}
        />
      );
    });
    return (
      <div className="container col-12">
        <div className="row catalogRow justify-content-center justify-content-sm-between">
          {products}
        </div>
      </div>
    );
  }
}
