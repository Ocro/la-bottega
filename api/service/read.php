<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/service.php';

// instantiate database and service object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$service = new Service($db);

// Get the id service if exists, return all service otherwise.
$idService = isset($_GET['id']) ? $_GET['id'] : null;

// query services
$stmt = $service->read($idService);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if ($num > 0) {
 
    // services array
    $services_arr = array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        extract($row);
 
        $service_item = array(
            "id" => $id,
            "service" => $service,
            "price" => $price
        );
 
        array_push($services_arr, $service_item);
    }
 
    echo json_encode($services_arr);
}
 
else{
    echo json_encode(
        array("message" => "Aucun service trouvé.")
    );
}
?>