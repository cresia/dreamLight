<?php
//POST -- send the info to the database

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
  print('no direct calls');
  exit();
}


//Use the getBodyData function to get the json body, store to variable $id
$data = getBodyData();
// var_dump($data);
// var_dump("data is ", $data);

// $id = $data["product"][0]["id"]; // this is to get the total item after incrementing
// $count = $data["count"];


//See if id came in the json body data, and store it into a variable, $id, if it did,
$id =intval($data["id"]);
$count = $data["count"];
// print("id is" . $id);
// exit();

if($id <= 0){
  throw new Exception("no product id to add to the cart");
}


// Make conditional to test if $_SESSION[‘cartId’] is empty. Read more about the $_SESSION SESSION superglobal here
// If yes, store $_SESSION[‘cartId’] into a variable $cartID
// If not, store false into the variable
// if(empty($_SESSION['cartId'])){
//     $cartID = false;
// }
// else{
//    $cartID = $_SESSION['cartId'];
// }

// var_dump("check session",  $_SESSION['cartId']);

if(array_key_exists('cartId', $_SESSION)){
  //  session_unset();
  $cartID = $_SESSION['cartId'];
} else {
  $cartID = false;
};


// var_dump("cartID is ", $cartID);

$query= "SELECT `price` FROM `products` WHERE products.id = {$id}";
$result = mysqli_query($conn, $query);


if(!$result){
    throw new Exception("query error: ");
  //  throw new Exception("query error: " . mysqli_error($conn));
}


if(mysqli_num_rows($result) <= 0){
    throw new Exception("Invalid product ID" .$id);
 }

 //Extract the data for the row from the database, store the results into productData
 $productData = [];
 while($row = mysqli_fetch_assoc($result)){
   $productData[] = $row;
 }
 $price = $productData[0]['price'];

// Send a query to the database with the words “START TRANSACTION”,
// this will start a mysql transaction set of queries that can be “rolled back” or “committed”
$cart_transaction = "START TRANSACTION";
$transactionResult = mysqli_query($conn, $cart_transaction);

if(!$transactionResult){
   throw new Exception(mysqli_connect_error());
  // throw new Exception("transaction error" . mysqli_error($conn));
  //  throw new Exception("transaction error");
}else if(!mysqli_num_rows($result) && !empty($_GET['id'])){
  throw new Exception('Invalid ID: ' . $_GET['id']);
};

//If our cart ID is false
if($cartID == false){
    // var_dump("testing1", $cartID);

  $insertQuery = "INSERT INTO `cart` SET `created` = NOW()";

  $insertResult = mysqli_query($conn, $insertQuery);


  if(!$insertResult){
   throw new Exception("invalid result");
    // throw new Exception("invalid result" . mysqli_error($conn));
  }


  $cartID = mysqli_insert_id($conn);
  $_SESSION['cartId'] = $cartID;
  // var_dump("cart id" , $cartId);
}


// $insertCartItems = "INSERT INTO `cartItems` (`productID`, `count`, `price`, `added`, `updated`, `cartID`)
//                 VALUES ($id, $count, $price, NOW(), NOW(), $cartID)
//                 ON DUPLICATE KEY UPDATE `count` = `count` + {$count}";

$insertCartItems = "INSERT INTO `cartItems` SET `count`=$count, `productID`=$id, `price`=$price,
                    `cartID`= $cartID ON DUPLICATE KEY UPDATE `count`=`count`+ {$count}";


$insertCartItemsResult = mysqli_query($conn, $insertCartItems);

// var_dump("hello");

if (!$insertCartItemsResult) {
   throw new Exception("failed to get insert result");
  // throw new Exception("failed to get insert result" . mysqli_error($conn));
};


if (mysqli_affected_rows($conn) < 1) {
   $rollback = mysqli_rollback($conn);
    if(!$rollback){
        throw new Exception("Transaction is cleared");
    }

  // mysqli_query($conn, "ROLLBACK");
  // throw new Exception("affected rows is not equal to 1");
};
$resultCommit = mysqli_query($conn, "COMMIT");

if(!$resultCommit){
  throw new Exception("result failed");
}
print("connection is success to add items to cart");
?>
