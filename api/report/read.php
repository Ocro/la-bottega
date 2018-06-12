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

$type = isset($_GET['type']) ? $_GET['type'] : null;
$month = isset($_GET['month']) ? $_GET['month'] : null;
$year = isset($_GET['year']) ? $_GET['year'] : null;

if (!isset($type) || !isset($month) || !isset($year))
  return false;

// query clients
$query = "select
            appointment.date,
            CONCAT(IFNULL(clients.name, ''), ' ', IFNULL(clients.firstname, '')) as client_name,
            services.service,
            services.price as service_price,
            appointmentdetails.price as appointment_price
          from clients
            inner join appointment on clients.id = appointment.idclient
            inner join appointmentdetails on appointment.idappointment = appointmentdetails.idappointment
            inner join services on appointmentdetails.idservice = services.id
          where MONTH(appointment.date) = :month && YEAR(appointment.date) = :year ";

switch ($type) {
  case 1: // client
    $query .= "order by client_name asc, service asc;";
  break;
  case 2: // service
    $query .= "order by service asc, client_name asc, date asc;";
  break;
  default: // date
    $query .= "order by date asc, client_name asc, service asc;";
  break;
}

$stmt = $db->prepare($query);

$stmt->bindParam(":month", $month);
$stmt->bindParam(":year", $year);

$stmt->execute();
$num = $stmt->rowCount();

if ($num > 0) {

    // clients array
  $result_arr = array();

    // retrieve our table contents
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $date = explode('-', explode(' ', $row['date'])[0]);
    $row['date'] = $date[2].".".$date[1].".".$date[0];
    $result_arr[] = $row;
  }

  echo json_encode($result_arr);
}

else{
  echo json_encode(
    array()
  );
}
?>