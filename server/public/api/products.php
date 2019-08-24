<?php

header('Content-Type: application/json');
require_once('functions.php');
set_exception_handler('error_handler');
set_error_handler('error_handler');
require_once('db_connection.php');

// http_response_code(500);
// dostuff();


startup();

// if(empty($_GET['id']){
//   $WhereClause = readFile('dummy-products-list.json');
// }
// else{
//   $WhereClause = "WHERE `id` = 3";
// }


// $query = "SELECT * FROM `products` {$WhereClause}";


$result = mysqli_query($conn, $query); //send the query to conn
if (!$result) {
  throw new Exception("Connect failed: " . mysqli_error());
}


$output = array();
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
}
print(json_encode($output));


if(!$conn){
  throw new Exception("Error:" . mysqli_connect_error());
};
// $output = file_get_contents('dummy-products-list.json');
// print($output);


?>
