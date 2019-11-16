<?php

require_once('functions.php');
// set_exception_handler("error_handler");
startUp();
require_once('db_connection.php');

$data = getBodyData();


$id = intval($data['id']);

// var_dump("the id is", $id);

if($id <= 0){
  throw new Exception("Error, Invalid id");
}

var_dump("the id is", $id);

$queryDelete = "DELETE FROM `cartItems` WHERE `productID` = $id";

$deleteResult = mysqli_query($conn, $queryDelete);

if(!$deleteResult){
  throw new Exception("error, can't delete the items" . $deleteResult);
}

?>
