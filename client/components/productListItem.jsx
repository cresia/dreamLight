import React from 'react';

function ProductListItem(props) {
  const name = 'details';
  const params = { id: props.id };

  return (

    <div onClick={() => props.onClickOneItem(name, params)} className="card col-md-3 mb-3" >
      <div className="card-body">
        <img src={props.image} className="card-img-top" alt="item1" />
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.shortDescription}</p>
        <p className="card-text badge badge-primary"> ${(props.price / 100).toFixed(2)}</p>

      </div>
    </div>
  );
}

export default ProductListItem;
