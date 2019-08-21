import React from 'react';

function ProductListItem(props) {
  return (

    <div className= "container">

      <div className="card mb-3">
        <img src="https://bit.ly/2JtVNE6" className="card-img-top" alt="item1" />
        <div className="card-body">
          <h5 className="card-title">Shake Weight</h5>
          <p className="card-text">$29.99</p>
          <p className="card-text">Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.</p>
        </div>
      </div>

    </div>

  );
}

export default ProductListItem;
