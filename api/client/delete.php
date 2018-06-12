<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/client.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare client object
$client = new Client($db);
 
// get client id
$data = json_decode(file_get_contents("php://input"));

if (empty($data) || empty($data->id))
  return;
 
// set client id to be deleted
$client->id = $data->id;
 
// delete the client
echo json_encode($client->delete());
?>