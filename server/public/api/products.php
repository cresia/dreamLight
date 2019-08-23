<?php

header('Content-Type: application/json');
require_once('db_connection.php');
require_once('functions.php');

// http_response_code(500);
// dostuff();
set_exception_handler('error_handler');
set_error_handler('error_handler');

startup();


$query = "SELECT * FROM `products`";
$result = mysqli_query($conn, $query);
if (!$result) {
  print("Error: " . mysqli_error($db));
  exit();
}


$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
}
print(json_encode($output));


if(!$conn){
  throw new Exception("Error:" . mysqli_connect_error());
};
$output = file_get_contents('dummy-products-list.json');
print($output);


?>
