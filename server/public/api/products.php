<?php

header('Content-Type: application/json');
require_once('db_connection.php');
require_once('functions.php');

// http_response_code(500);
// dostuff();
set_exception_handler('error_handler');

if(!$conn){
  throw new Exception("Error:" . mysqli_connect_error());
};

$output = file_get_contents('dummy-products-list.json');
print($output);




?>
