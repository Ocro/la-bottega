<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate client object
include_once '../objects/client.php';
 
$database = new Database();
$db = $database->getConnection();
 
$client = new Client($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

if (empty($data) || empty($data->name))
  return;
 
// set client property values
$client->name = $data->name;
$client->firstname = $data->firstname ?? "";
$client->phone = $data->phone ?? "";
//$client->address = $data->address;
$client->npa = (int)($data->npa ?? 0);
$client->city = $data->city ?? "";
 
// create the client
echo json_encode($client->create());
?>