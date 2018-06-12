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

if (!isset($_GET['year']))
  return;

$year = $_GET['year'];

// query clients
$stmt = $client->getClientNoVisitSince($year);
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
    echo json_encode(array());
}
?>