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
      <div className="confirmationContents">

        <div className="row">
          <div className="col">
            <h3 className="confirmationTitle">Thank you for Shopping!
              <img className="thankImg" src="/images/smile.gif" alt="thankYouImg" />
            </h3>
          </div>
        </div>

        <h3 className="myCartSumTitle">Customer Summary</h3>

        <div className="row">
          <div className="col">
            <div className="addressInfoSummary">
              <div>Name: {props.userInfo.name + ' ' + props.userInfo.lastName}</div>
              <div>Shipping Address: </div>
              <div>{props.userInfo.shippingAddress}</div>
              <div>{props.userInfo.city + ', ' + props.userInfo.state + ' ' + props.userInfo.zipcode}</div>
            </div>

          </div>

          <div className="col">
            <h3 className="confirmItemTotal">Total Purchase: $ {(total / 100).toFixed(2)}</h3>
          </div>
        </div>

        {/* <div className="addressInfoSummary">
          <div>Name: {props.userInfo.name + ' ' + props.userInfo.lastName}</div>
          <div>Shipping Address: </div>
          <div>{props.userInfo.shippingAddress}</div>
          <div>{props.userInfo.city + ', ' + props.userInfo.state + ' ' + props.userInfo.zipcode}</div>
        </div>

        <h3 className="confirmItemTotal">Total Purchase: $ {(total / 100).toFixed(2)}</h3> */}

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

        {/* <button type="submit" className="btn btn-dark mt-5 ml-5 mb-2" onClick={() => props.setView('home', {})}>
          back to Home page</button> */}

        <button type="submit" className="btn btn-dark continueShop" onClick={() => props.setView('catalog', {})}>
          Continue Shopping</button>

      </div>

    );
  } else {
    return null;
  }

}

export default Confirmation;
