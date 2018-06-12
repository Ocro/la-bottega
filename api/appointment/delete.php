<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/appointment.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare appointment object
$appointment = new Appointment($db);
 
// get appointment id
$data = json_decode(file_get_contents("php://input"));

if (empty($data) || empty($data->id))
  return;
 
// set appointment id to be deleted
$appointment->id = $data->id;
 
// delete the appointment
echo json_encode($appointment->delete());
?>