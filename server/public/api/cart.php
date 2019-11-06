<?php


define("INTERNAL", true);
require_once('./functions.php');
set_error_handler('error_handler');
startUp();
require_once('./db_connection.php');

session_start();


//It takes in the $_SERVER SERVER superglobal “REQUEST_METHOD”
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        require_once('cart_add.php');
        break;
    case "GET":
        require_once('get_cart.php');
        break;
}




// $item = file_get_contents('php://input');

// if ($method == 'GET') {
//   readfile('dummy-cart-items.json');
// } else if ($method == 'POST') {
//   http_response_code(201);
//   print($item);
// } else {
//   http_response_code(404);
//   print(json_encode([
//     'error' => 'Not Found',
//     'message' => "Cannot $method /api/cart.php"
//   ]));
// }


?>
