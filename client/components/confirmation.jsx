import React from 'react';

function Confirmation(props) {
  return (

    <React.Fragment>

      <div className="container">

        <h1>Confirmation</h1>

        <h1>Thank you for shopping! your order is on the way</h1>

        <h1>Summary Info</h1>

        <div>Name:</div>
        <div>Address:</div>
        <div>Total Purchase: </div>

        <button className="btn btn-link emptyCatalogLink" onClick={() => props.setViewItem('catalog', {})}>
          {'<'}  Continue Shopping
        </button>

      </div>
    </React.Fragment>

  );

}

export default Confirmation;
