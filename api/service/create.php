<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate service object
include_once '../objects/service.php';
 
$database = new Database();
$db = $database->getConnection();
 
$service = new Service($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
if (empty($data) || empty($data->service))
  return;

// set service property values
$service->service = $data->service;
$service->price = $data->price ?? 0;
 
// create the service
echo json_encode($service->create());
?>