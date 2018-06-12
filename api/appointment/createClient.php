<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate appointment object
include_once '../objects/appointment.php';
 
$database = new Database();
$db = $database->getConnection();
 
$appointment = new Appointment($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

if (empty($data) || empty($data->idClient) || empty($data->serviceDate) || empty($data->services))
  return;
 
// set appointment property values
$appointment->idClient = $data->idClient;
$appointment->date = $data->serviceDate;

foreach ($data->services as $apDetails) {
  $apDetailsTmp = new AppointmentDetails();
  $apDetailsTmp->idService = $apDetails->service->id;
  $apDetailsTmp->price = $apDetails->price;
  $apDetailsTmp->comment = $apDetails->comment ?? "";
  $appointment->appointmentDetails[] = $apDetailsTmp;
}
 
// create the appointment
echo json_encode($appointment->createForClient());

?>