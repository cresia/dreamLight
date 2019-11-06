<?php
//GET -- send the info from database to the website 
require_once('functions.php');


// Add our INTERNAL check like in cart_add
if(!INTERNAL){
  print('no direct calls');
  exit();
}

var_dump("cart id", empty($_SESSION['cartID']));


// Check if SESSION[‘cart_id’] is empty
      // If it is, print a json encoded empty array
      // Exit to stop processing, we have no cart for this person

if(empty($_SESSION['cartID'])){
  // print(json_encode("[]"));
  print_r(getBodyData([]));
  exit();
}
else{
  // Set the $cartId variable to the SESSION cart_id. To be safe, we probably should intval it, too
  $cartID = intval($_SESSION['cartID']);
  var_dump("there is an id",$cartID);
}

var_dump("cart id2");

var_dump("cart id", $_SESSION['cartID']);


// Write a query that fetches the appropriate data as found in dummy-cart-items.json
      // You’ll need a join with products table to get data from there
      // You’ll need a subquery to get the first image from images table
      // You’ll need to only get the cart where the cart ID is the one you are looking for

// $query = "SELECT cartItems.count, products.id, products.name, products.price, products.image, products.shortDescription FROM `cartItems` 
//           JOIN `products` ON cartItems.productID = products.id";

$query = "SELECT cartItems.price, cartItems.count, products.name, products.image, products.id, cartItems.cartID 
        FROM `cartItems` 
        INNER JOIN `products` ON cartItems.productID = products.id
        WHERE cartItems.cartID = {$cartId}";

// Send the query to mysql and get the result
$result = mysqli_query($conn, $query);

if(!$result){
  throw new Exception("query error: " . mysqli_error($conn));
};


// Retrieve the data you got from the query and print it out. If there is nothing there, make sure it prints out an empty array
$data = [];
while($row = mysqli_fetch_assoc($result)){
  $data[] = $row;
}

if($data === []){
  print("empty array: []");
  exit();
}else{
  print(json_encode($data));
}



?>