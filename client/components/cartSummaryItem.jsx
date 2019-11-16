import React from 'react';

function CartSummaryItem(props) {
  // console.log('the props are: ', props);

  function handleClick() {
    props.deleteOneItem(props.cartItemId);

    // console.log("cartItemId",props.cartItemId);

  }

  return (
    <div className="container border">
      <div className="card-body row ">
        <div className="col">
          <img src={props.image} className="card-img summaryImg" alt="item" />
        </div>
        <div className="col short">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text badge badge-primary">{(props.price / 100).toFixed(2)}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>

        <div className="col">
          <p>Quantity:</p>

          <div className="col">
            <i className="fas fa-plus-square"></i>
          </div>

          <div className="col">
            <i className="fas fa-minus-square"></i>
          </div>
        </div>

        <div className="col">
          <button type="button" onClick={handleClick} className="btn btn-danger">Delete</button>

        </div>

      </div>
    </div>
  );
}

export default CartSummaryItem;
