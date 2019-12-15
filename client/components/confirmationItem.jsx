import React from 'react';
// import Checkout from './checkout.jsx';

function ConfirmationItem(props) {
  // console.log("props from confirmation item", props);
  return (
    <div className="container border">

      <div className="card-body row ">

        <div className="col">
          <img src={props.image} className="card-img summaryImg" alt="item" />
        </div>

        <div className="col short">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text badge badge-primary">Price: {((props.quantity) * (props.price / 100)).toFixed(2)}</p>
          {/* <p className="card-text badge badge-primary">Price: {((props.price / 100)).toFixed(2)}</p> */}
          <p className="card-text">{props.shortDescription}</p>
        </div>

        <div className="col">
          <p>Quantity: {props.quantity}</p>
        </div>

      </div>

    </div>

  );
}

export default ConfirmationItem;
