// import React from 'react';

// function CartSummary(props){
//   //props.cartItems -> return an object of the item which are the number of items inside the cart state on the app
//   // need to map it through then pass the function getCartTotal
//   // console.log(props.cartItems)
//   const myArray = props.cartItems.map(item => {
//     return( getCartTotal(item.price));
//   });
// }

// // function getCartTotal(cartItems) {
// //   // cartItems is an object
// //   var total = 0;
// //   for (var i = 0; i < cartItems.length; i++){
// //     total += cartItems[i].price;
// //   }
// //   return total;
// // }

// render(){
//    //check if the cartSummary total is 0
//     if (myArray.length === 0) {
//       return (
//         <div>
//           <Header text="Wicked Sales" cartItemCount = {this.state.cart.length}/>
//           <CartSummaryItem text= "no Item"/>
//         </div>
//       );
//     } else if (myArray.length > 0) {
//       //check if the there is an item in the cartSummary and print the total Item
//       return (
//         <div>
//           <Header text="Wicked Sales" cartItemCount = {this.state.cart.length} />
//           <CartSummaryItem />
//         </div>
//       );
//     }

//   }

// export default CartSummary;
