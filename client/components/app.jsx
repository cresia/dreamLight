import React from 'react';
import Header from './header.jsx';
import ProductList from './productList.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header text="Wicked Sales" />
        <ProductList />

      </div>
    );
  }
}
