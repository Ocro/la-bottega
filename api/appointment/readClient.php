<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/appointment.php';

// instantiate database and appointment object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$appointment = new Appointment($db);

// Get the id client
$idClient = isset($_GET['id']) ? $_GET['id'] : null;

// query appointments
$stmt = $appointment->readFromClient($idClient);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if ($num > 0) {
 
    // appointments array
    $appointments_arr = array();
    $appointment_item = array();

    $currentIdAppointment = -1;
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        extract($row);

        if ($currentIdAppointment < 0)
            $currentIdAppointment = $idappointment;

        if ($currentIdAppointment != $idappointment) {
            $currentIdAppointment = $idappointment;
            array_push($appointments_arr, $appointment_item);
            $appointment_item = array();
        }

        // Populate first depth
        if (empty($appointment_item))
            $appointment_item = array (
                "id" => $idappointment,
                "date" => $date,
                "client" => null
            );

        // Populate second depth
        $appointment_item["appointmentsDetails"][] = array(
            "id" => $idappointment,
            "price" => $price,
            "color" => $color,
            "comment" => $comment,
            "service" => array(
                "id" => $service_id,
                "service" => $service,
                "price" => $service_price
            )
        );
    }

    array_push($appointments_arr, $appointment_item);
 
    echo json_encode($appointments_arr);
} else {
    echo json_encode(array());
}
?>