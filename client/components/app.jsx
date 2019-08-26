import React from 'react';
import Header from './header.jsx';
import ProductList from './productList.jsx';
import ProductDetails from './ProductDetails.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {},
        cart: []
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch(`/api/cart.php`)
      .then(res => res.json())
      // .then(response => console.log(response));
      .then(response => this.setState({ cart: response }));
  }

  render() {
    this.getCartItems();

    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header text="Wicked Sales" />
          <ProductList setViewItem= {this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header text="Wicked Sales" />
          <ProductDetails setViewItem= {this.setView} viewParams= {this.state.view.params}/>
        </div>

      );
    }

  }
}
