import React from 'react';
import PageTitle from './header.jsx';
import ProductListItem from './product-list-item';

export default class App extends React.Component {
  render() {

    return (
      <React.Fragment>

        <PageTitle text="Wicked Sales"/>
        <ProductListItem/>

      </React.Fragment>

    // <div className="container">
    // </div>

    );
  }
}
