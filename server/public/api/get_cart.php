<?php
//GET -- send the info from database to the website
require_once('functions.php');
require_once('cart.php');
set_exception_handler("error_handler");

// Add our INTERNAL check like in cart_add
if(!defined("INTERNAL")){
  print('no direct calls');
  exit();
}


// var_dump("cart id",($_SESSION['cartID']));
// print("hello");


// Check if SESSION[‘cart_id’] is empty
      // If it is, print a json encoded empty array
      // Exit to stop processing, we have no cart for this person

if(empty($_SESSION['cartId'])){
  print(json_encode([]));
  exit();
}
// Set the $cartId variable to the SESSION cart_id. To be safe, we probably should intval it, too
$cartID = intval($_SESSION['cartId']);

// print("hello");
// var_dump("there is an id",$cartID);


// var_dump("cart id2");
// var_dump("cart id", $_SESSION['cartID']);


// Write a query that fetches the appropriate data as found in dummy-cart-items.json
      // You’ll need a join with products table to get data from there
      // You’ll need a subquery to get the first image from images table
      // You’ll need to only get the cart where the cart ID is the one you are looking for

$query = "SELECT cartItems.count, products.id, products.name, products.price, products.image, products.shortDescription FROM `cartItems`
          JOIN `products` ON cartItems.productID = products.id
          WHERE cartItems.cartID = $cartID";


// var_dump("the query is", $query);



// Send the query to mysql and get the result
$result = mysqli_query($conn, $query);

// var_dump("result from get: ", $result);

if(!$result){
  throw new Exception("query error: ");
};

// var_dump("hello3");

// Retrieve the data you got from the query and print it out. If there is nothing there, make sure it prints out an empty array
$data = [];

while($row = mysqli_fetch_assoc($result)){
  $data[] = $row;
}

if($data === []){
  print(json_encode([]));
  exit();
}else{
  print(json_encode($data));
}

?>
