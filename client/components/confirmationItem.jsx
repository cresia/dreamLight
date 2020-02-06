import React from 'react';
// import Checkout from './checkout.jsx';

function ConfirmationItem(props) {
  // console.log("props from confirmation item", props);
  return (
    <div className="container">

      <div className="card-body sumCardBodyFinal border row ">
        <div className="col-sm-3">
          <img src={props.image} className="card-img confirmImg" alt="item" />
        </div>

        <div className="col-md-4 marginConfirm">
          <h5 className="confirmTitle">{props.name}</h5>
          <p className="confirmPrice">${((props.quantity) * (props.price / 100)).toFixed(2)}</p>
          {/* <p className="card-text badge badge-primary">Price: {((props.price / 100)).toFixed(2)}</p> */}
          <p className="confirmShortDes">{props.shortDescription}</p>
        </div>

        <div className="col-sm-4 confirmQuantity">
          <p>Quantity: {props.quantity}</p>
        </div>

      </div>
    </div>

  );
}

export default ConfirmationItem;
