<?php

if( !defined( 'INTERNAL')){
  throw new Exception('no direct calls');
}


//Use the getBodyData function to get the json body, store to variable $id
$data = getBodyData();

//See if id came in the json body data, and store it into a variable, $id, if it did,
$id = $data['id'];

//Parse int the $id variable to sanitize it, check if it is greater than 0, throw an error otherwise
if( intval($id) < 0 ){
  throw new Exception("error");
}


// Make conditional to test if $_SESSION[‘cartId’] is empty. Read more about the $_SESSION SESSION superglobal here
// If yes, store $_SESSION[‘cartId’] into a variable $cartID
// If not, store false into the variable
if(!empty($_SESSION['cartId'])){
  $cartID = $_SESSION['cartId'];
}
else{
   $cartID = false;
}

$query= "SELECT price FROM `products`";

//Send the query to the database and store the result
$result = mysqli_query($conn, $query);






?>