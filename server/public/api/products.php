<?php
require_once('./functions.php');
set_exception_handler('error_handler');
startUp();
require_once('./db_connection.php');



// if (empty($_GET['id'])) {
//   $whereClause = "";
// } else if (!is_numeric($_GET['id'])) {
//   throw new Exception("id needs to be a number");
// } else {
//   $whereClause = "WHERE products.id=" . $_GET['id'];
// }


if (empty($_GET['id'])) {
  $whereClause = " GROUP BY products.id";
} else if (!is_numeric($_GET['id'])) {
  throw new Exception("id needs to be a number");
} else {
  $whereClause = " WHERE products.id=" . $_GET['id'];
}



// $query = "SELECT * FROM `products`" . $whereClause;

// task-list: 1
// $query = " SELECT products.id, products.name, products.shortDescription, products.price, (SELECT `url` FROM `images` WHERE `productId` = products.`id` LIMIT 1) AS image
//  FROM `products` " . $whereClause;

//task-list: 2
// $query = "SELECT products.id, products.name, products.shortDescription, products.price, images.url
// FROM products
// JOIN images
// ON products.id = images.productId" . $whereClause ;

//task-list: 3
$query = "SELECT products.id, products.name, products.price, products.shortDescription, products.longDescription,
GROUP_CONCAT(DISTINCT images.url ORDER BY images.url ASC) AS images
FROM products
JOIN images
ON products.id = images.productId". $whereClause;



$result = mysqli_query($conn, $query);

 if (!$result) {
   throw new Exception(mysqli_error($conn));
 }
 else if(!mysqli_num_rows($result) && !empty($_GET['id']) ){
    throw new Exception('Invalid ID: ' . $_GET['id']);
 }


//after modifying based on task-list: 3 --> specifically add explode() to split the url by
$output = [];
while($row = mysqli_fetch_assoc($result)) {
  $row['images'] = explode(",", $row['images']);
  $output[]=$row;
};

print(json_encode($output));

?>
