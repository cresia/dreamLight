import React from 'react';
import CartSummaryItem from './cartSummaryItem.jsx';

function getCartTotal(cartItems) {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price;
  }
  return total;
}

function CartSummary(props) {
  const items = props.allItems.map((item, index) => {
    if (props.cartItems.length === 0) {
      return <CartSummaryItem text="No Item"/>;

    } else if (props.cartItems.length > 0) {
      return <CartSummaryItem />;
    }

    return (
      <CartSummaryItem key={index}
        image= {item.image}
        name = {item.name}
        price = {item.price}
        shortDescription={item.shortDescription}/>
    );

  });

  const total = getCartTotal(props.allItems);
  return (

    <div className= "container">
      <button className= "btn btn-link mt-4" onClick= {() => props.setViewItem('catalog', {})}>
        {'<'}  Back to Catalog
      </button>

      <h1 className= "myCartTitle mt-3 mb-5 ml-2">My Cart</h1>

      <div className= "cardSpaceItem">
        {items}
      </div>

      <p className="itemTotal">
      Item Total ${(total / 100).toFixed(2)}
      </p>

    </div>

  );
}

export default CartSummary;
