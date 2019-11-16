<?php

require_once('functions.php');
set_exception_handler("error_handler");
startUp();
require_once('db_connection.php');

$data = getBodyData();

$id = intval($data['id']);
$count = intval($data['count']);

if($id <= 0){
  throw new Exception("invalid id");
}

$updateQuery = "UPDATE `cartItems`
                SET count = $count
                WHERE productID = $id";

$updateResult = mysqli_query($conn,$updateQuery);

if(!$updateResult){
  throw new Exception("error, can't update the item" . $updateResult);

}


?>
