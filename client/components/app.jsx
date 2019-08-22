import React from 'react';
import PageTitle from './header.jsx';
import ProductListItem from './product-list-item';
import ProductList from './product-list.jsx';

export default class App extends React.Component {
  render() {

    return (
      <React.Fragment>

        <PageTitle text="Wicked Sales"/>
        <ProductListItem/>
        <ProductList />

      </React.Fragment>

    // <div className="container">
    // </div>

    );
  }
}
