<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/client.php';

// instantiate database and client object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$client = new Client($db);

// Get the id client if exists, return all client otherwise.
$idClient = isset($_GET['id']) ? $_GET['id'] : null;

// query clients
$stmt = $client->read($idClient);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if ($num > 0) {
 
    // clients array
    $clients_arr = array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        extract($row);
 
        $client_item = array(
            "id" => $id,
            "name" => $name,
            "firstname" => $firstname,
            "phone" => $phone,
            "address" => $address,
            "npa" => $npa,
            "city" => $city
        );
 
        array_push($clients_arr, $client_item);
    }
 
    echo json_encode($clients_arr);
}
 
else{
    echo json_encode(
        array("message" => "Aucun client trouvé.")
    );
}
?>