import React from 'react';

function CartSummaryItem(props) {

  return (

    <div className="container border">
      <div className="card-body row ">
        <div className="col-12 col-md-3">
          <img src={props.image} className="card-img summaryImg" alt="item" />
        </div>
        <div className="col-6 col-md-4 short">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text badge badge-primary">{(props.price / 100).toFixed(2)}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );

}

export default CartSummaryItem;
