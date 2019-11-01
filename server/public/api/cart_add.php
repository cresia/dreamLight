<?php
//POST -- send the info to the database


// if( !defined( 'INTERNAL')){
//   throw new Exception('no direct calls');
// }


// Check if the constant INTERNAL is defined. See the "defined" function in php.net
// If yes, exit (not throw an error). Make sure to print a message not about not allowing 1. direct access
// Use the getBodyData function to get the json body, store to variable $id
// Parse int the $id variable to sanitize it, check if it is greater than 0, throw an error otherwise
// See if id came in the json body data, and store it into a variable, $id, if it did,
// Make conditional to test if $_SESSION[‘cartId’] is empty. Read more about the $_SESSION SESSION superglobal here
// If yes, store $_SESSION[‘cartId’] into a variable $cartID
// If not, store false into the variable

require_once('functions.php');

if(!INTERNAL){
  exit('no direct calls');
}

// $item = file_get_contents('php://input');

//Use the getBodyData function to get the json body, store to variable $id
$data = getBodyData();

//See if id came in the json body data, and store it into a variable, $id, if it did,
$id = $data['id'];

if ($id) { 
  if (gettype($id) !== "integer") { /* if $id is not a number, throw error */
    throw new Exception("id must be a number");
  }
  if (intval($id) < 1) { /* if intval($id) is less than zero, throw error */
    throw new Exception("id must be greater than 0");
  }
} else {                
  throw new Exception("id required to add to cart");
}


$countData = $data['count'];
// this is to grab the count of each item
if ($countData) {
  $count = $countData;
};



// Make conditional to test if $_SESSION[‘cartId’] is empty. Read more about the $_SESSION SESSION superglobal here
// If yes, store $_SESSION[‘cartId’] into a variable $cartID
// If not, store false into the variable
if(!empty($_SESSION['cartId'])){
  $cartID = $_SESSION['cartId'];
}
else{
   $cartID = false;
}


//Make a query to get the price from products for the
//given id you got from the body json
$query= "SELECT price FROM `products` WHERE `id` = $id";

//Send the query to the database and store the result
$result = mysqli_query($conn, $query);

//Check how many rows came back.
//Throw an exception if there isn’t one. It wasn’t a valid product id

if(!$result){
   throw new Exception("query error: " . mysqli_error($conn));
}


if(mysqli_num_rows($result) === 0){
    throw new Exception("Invalid product ID");
 }


 //Extract the data for the row from the database, store the results into productData
 $productData = [];
 while($row = mysqli_fetch_assoc($result)){
   $productData[] = $row;
   $price = $productData[0]['price'];
 }

 
// Send a query to the database with the words “START TRANSACTION”,
// this will start a mysql transaction set of queries that can be “rolled back” or “committed”
$cart_transaction = "START TRANSACTION";
$transactionResult = mysqli_query($conn, $cart_transaction);

if(!$transactionResult){
  throw new Exception("transaction error" . mysqli_error($conn));
}

//If our cart ID is false
if(!$cartID){
  $insertQuery = "INSERT INTO `cart` SET `created` = NOW()";
  $insertResult = mysqli_query($conn, $insertQuery);

  if(!$insertResult){
    throw new Exception("invalid result" . mysqli_error($conn));
  }

  if(mysqli_affected_rows($conn) !== 1){
    throw new Exception("affected rows needs to be 1");
  }

  $cartID = mysqli_insert_id($conn);
  $_SESSION['cartId'] = $cartID;
 
}


$insertCartItems = "INSERT INTO cartItems SET `count` = $count, `productID` = $id, `price`= $price, `cartID` = $cartID 
                    ON DUPLICATE KEY UPDATE `count` = count + 1";


$insertCartItemsResult = mysqli_query($conn, $insertCartItems);

// var_dump("hello");

if (!$insertCartItemsResult) {
  throw new Exception("failed to get insert result" . mysqli_error($conn));
};


if (mysqli_affected_rows($conn) < 1) {
  mysqli_query($conn, "ROLLBACK");
  throw new Exception("affected rows is not equal to 1");
};
mysqli_query($conn, "COMMIT");


?>
