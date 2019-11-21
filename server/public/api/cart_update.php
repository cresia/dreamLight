<?php
// require_once('functions.php');

if (!defined("INTERNAL")) {
  print('no direct calls');
  exit();
}
// var_dump("hello");

$data = getBodyData();

// var_dump("hello", $data);

$id = intval($data['id']);
$count = intval($data['count']);

// print("hello");

if($id <= 0){
  throw new Exception("invalid id");
}

$updateQuery = "UPDATE cartItems
                SET count = $count
                WHERE productID = $id";

$updateResult = mysqli_query($conn,$updateQuery);

if(!$updateResult){
  throw new Exception("error, can't update the item" . mysqli_error($conn));
}else{
  print(json_encode(($updateResult)));
}


?>
