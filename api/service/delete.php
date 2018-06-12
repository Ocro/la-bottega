<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/service.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare service object
$service = new Service($db);
 
// get service id
$data = json_decode(file_get_contents("php://input"));

if (empty($data) || empty($data->id))
  return;
 
// set service id to be deleted
$service->id = $data->id;
 
// delete the service
echo json_encode($service->delete());
?>