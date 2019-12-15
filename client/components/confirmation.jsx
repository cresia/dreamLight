import React from 'react';
import ConfirmationItem from './confirmationItem.jsx';

function getCartTotalPrice(cartItems) {
  // console.log("getCartTotal",props)
  var total = 0;

  for (var i = 0; i < cartItems.length; i++) {
    total += parseFloat(cartItems[i].price * (cartItems[i].count));
  }
  return total;
}

function Confirmation(props) {
  // console.log(props);
  const total = getCartTotalPrice(props.userInfo.cart);
  // console.log(total);

  if (props.userInfo !== null && props.cartItems !== []) {
    return (
      <div className="confirmationContents rounded">
        <h3 className="ml-2 mt-3 py-2">Thank you for Shopping!</h3>
        <h3 className="ml-2 mt-3">Customer Summary</h3>
        <div className="addressSummary">
          <div className="ml-3">{props.userInfo.name + ' ' + props.userInfo.lastName}</div>
          <div className="ml-3">{props.userInfo.shippingAddress}</div>
          <div className="ml-3">{props.userInfo.city + ', ' + props.userInfo.state + ' ' + props.userInfo.zipcode}</div>
        </div>

        <div className ="row">
          <div className="col">
            <h3 className="ml-2 mt-3">Cart Summary</h3>
          </div>

          <div className="col">
            <h3 className="ml-2 mt-3">Total Purchase: $ {(total / 100).toFixed(2)}</h3>
          </div>
        </div>

        {props.userInfo.cart.map((item, index) => {
          return (
            <ConfirmationItem key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              shortDescription={item.shortDescription}
              quantity={item.count}/>
          );
        })}

        <button type="submit" className="btn btn-primary mt-4 ml-2 mb-2" onClick={() => props.setView('catalog', {})}>
          {'<'}Continue Shopping</button>

        <button type="submit" className="btn btn-primary mt-4 ml-2 mb-2" onClick={() => props.setView('home', {})}>
          {'<'}back to Home page</button>

      </div>

    );
  } else {
    return null;
  }

}

export default Confirmation;
