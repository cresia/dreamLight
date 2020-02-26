import React from 'react';

function ProductListItem(props) {
  const name = 'details';
  const params = { id: props.id };

  return (

    // <div onClick={() => props.onClickOneItem(name, params)} className="card col-11 mx-1 my-1 col-sm-3 mx-md-3 my-md-3" >
    <div onClick={() => props.onClickOneItem(name, params)} className="card col-11 col-xl-3 mx-1 col-md-5 mx-md-1 col-sm-5 mx-sm-1 mb-4" >
      <div className="card-body">
        <img src={props.image} className="card-img-top catalogImg" alt="item1" />
        <h5 className="card-title">{props.name}</h5>
        {/* <p className="card-text">{props.shortDescription}</p> */}
        <p className="card-textPrice"> ${(props.price / 100).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
