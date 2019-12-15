import React from 'react';
import CartSummaryItem from './cartSummaryItem.jsx';

function getCartTotal(cartItems) {
  // console.log("cart items ",cartItems);
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total += parseFloat((cartItems[i].price) * (cartItems[i].count));

    // total += parseFloat(cartItems[i].price);
  }
  return total;
}

function CartSummary(props) {
  // console.log("props from cartSummary:",props)

  if (props.allItems.length === 0) {
    return <div>
      <button className= "btn btn-link emptyCatalogLink" onClick= {() => props.setViewItem('catalog', {})}>
        {'<'}  Back to Catalog
      </button>
      <div className="noItemsText">
         No Items
      </div>

      <div>
        <i className= "fas fa-shopping-cart text-warning emptyCartIcon"/>
      </div>

    </div>;
  }

  const items = props.allItems.map((item, index) => {

    return (
      <CartSummaryItem key={index}
        image= {item.image}
        name = {item.name}
        price = {item.price}
        shortDescription= {item.shortDescription}
        quantity = {item.count}

        deleteItem = {props.deleteOneItem}
        idPropCartItem={item.id}

        incCartItem = {props.incItem }
        decCartItem = {props.decItem}

        onClickImage = {props.setViewItem}

      />
    );
  });

  const total = getCartTotal(props.allItems);
  return (

    <div className= "container">
      <button className= "btn btn-link mt-4" onClick= {() => props.setViewItem('catalog', {})}>
        {'<'}  Back to Catalog
      </button>

      <div className="row">

        <div className="col">
          <h1 className="myCartTitle mt-3 mb-5 ml-2">My Cart</h1>
        </div>

        <div className="col">
          <p className="itemTotal mt-3 mb-5 ">Total Purchase: ${(total / 100).toFixed(2)}</p>
        </div>

      </div>

      {/* <div className="cardSpaceItem" onClick={() => props.setViewItem('details', {})}> */}
      <div className="cardSpaceItem">
        {items}
      </div>

      <div className="row">
        <div className="col-md-5">
          <button onClick={() => props.setViewItem('checkout', {}) } type="button" className="btn btn-outline-dark checkOutButton" >Checkout</button>
        </div>

      </div>

    </div>
  );
}

export default CartSummary;
