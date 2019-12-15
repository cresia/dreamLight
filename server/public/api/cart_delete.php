<?php

if (!defined("INTERNAL")) {
  print('no direct calls');
  exit();
}

$data = getBodyData();

$id = intval($data['id']);


if($id <= 0){
  throw new Exception("Error, Invalid id " . $id);
}

$queryDelete = "DELETE FROM `cartItems` WHERE `productID` = $id";


$deleteResult = mysqli_query($conn, $queryDelete);

if(!$deleteResult){
  throw new Exception("error, can't delete the items" . mysqli_error($conn));
}

print(json_encode([
  "success" => true
]));

?>
