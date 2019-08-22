import React from 'react';

function ProductListItem(props) {
  return (

    <div className="card col-md-3 mb-3">
      <div className="card-body">
        <img src={props.image} className="card-img-top" alt="item1" />
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text"> ${(props.price / 100).toFixed(2)}</p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );
}
export default ProductListItem;
