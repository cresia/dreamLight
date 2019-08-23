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

// function ProductItemDetails(props){
//   return (
//     <div class="card mb-3" style="max-width: 540px;">
//   <div class="row no-gutters">
//     <div class="col-md-4">
//       <img src={props.image} class="card-img" alt="OneItem" />
//     </div>
//     <div class="col-md-8">
//       <div class="card-body">
//         <h5 class="card-title">{props.name}</h5>
//         <p class="card-text">{(props.price/100).toFixed(2)}</p>
//         <p class="card-text">{props.shortDescription}</p>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }
export default ProductListItem;
