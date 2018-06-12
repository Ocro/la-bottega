<?php

include_once '../objects/service.php';

class Appointment {

  private $conn;
  private $table_name = "appointment";

  public $id;
  public $idClient;
  public $date;
  public $appointmentDetails = array();

  public function __construct($db){
    $this->conn = $db;
  }

    // read appointment with details
  function readFromClient($idClient) {

    $idClient = htmlspecialchars(strip_tags($idClient));

    $query = "
      select
        appointmentdetails.idappointment,
        date,
        appointmentdetails.price,
        services.price as service_price,
        color,
        comment,
        services.id as service_id,
        service
      from $this->table_name 
        inner join clients on idclient = clients.id 
        inner join appointmentdetails on appointmentdetails.idappointment = $this->table_name.idappointment
        inner join services on services.id = appointmentdetails.idservice
      where idclient = $idClient
      order by date desc, appointmentdetails.idappointment desc, services.service asc";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
  }

  function createForClient() {

    // insert appointment.
    $query = "
      insert 
        into $this->table_name 
      set
        idclient=:idclient, date=from_unixtime(:date);";

    $this->conn->beginTransaction();

    $stmt = $this->conn->prepare($query);

    // sanitize
    $this->idClient = htmlspecialchars(strip_tags($this->idClient));
    $this->date = htmlspecialchars(strip_tags(strtotime($this->date)));

    $stmt->bindParam(":idclient", $this->idClient);
    $stmt->bindParam(":date", $this->date);

    if (!$stmt->execute()) {
      $this->conn->rollBack();
      return false;
    }

    $stmt = $this->conn->prepare("select LAST_INSERT_ID() as idAppointment;");
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    if (!$this->insertAppointmentDetails($idAppointment)) {
      $this->conn->rollBack();
      return false;
    }

    $this->conn->commit();
    return true;
  }

  function updateForClient() {

    $this->conn->beginTransaction();

    // Deleting existing appointments details for simplicity purpose.
    $query = "delete from appointmentdetails where idappointment = :idappointment;";
 
    $stmt = $this->conn->prepare($query);
    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bindParam(":idappointment", $this->id);

    if (!$stmt->execute()) {
      $this->conn->rollBack();
      return false;
    }

    // Updating appointment date
    $query = "update 
                $this->table_name 
              set
                date=from_unixtime(:date)
              where idappointment=:idappointment;";

    $stmt = $this->conn->prepare($query);

    $this->date = htmlspecialchars(strip_tags(strtotime($this->date)));

    $stmt->bindParam(":idappointment", $this->id);
    $stmt->bindParam(":date", $this->date);

    if (!$stmt->execute()) {
      $this->conn->rollBack();
      return false;
    }

    // Creating new appointments details.
    if (!$this->insertAppointmentDetails($this->id)) {
      $this->conn->rollBack();
      return false;
    }

    $this->conn->commit();
    return true;
  }

  private function insertAppointmentDetails($idAppointment) {
    foreach ($this->appointmentDetails as $apDetails) {
      // insert appointment details.
      $query = "
        insert 
          into appointmentdetails
        set
          idappointment=:idappointment, idservice=:idservice, price=:price, comment=:comment, color=null";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $apDetails->idService = htmlspecialchars(strip_tags($apDetails->idService));
      $apDetails->price = htmlspecialchars(strip_tags($apDetails->price));
      $apDetails->comment = htmlspecialchars(strip_tags($apDetails->comment));

      // bind values
      $stmt->bindParam(":idappointment", $idAppointment);
      $stmt->bindParam(":idservice", $apDetails->idService);
      $stmt->bindParam(":price", $apDetails->price);
      $stmt->bindParam(":comment", $apDetails->comment);

      // execute query
      if (!$stmt->execute()) {
        return false;
      }
    }
    return true;
  }

  function delete() {
   
    // delete query
    $query = "
    begin;
    delete from appointmentdetails where idappointment = :idappointment;
    delete from $this->table_name where idappointment = :idappointment;
    commit;";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id = htmlspecialchars(strip_tags($this->id));
 
    // bind id of record to delete
    $stmt->bindParam(":idappointment", $this->id);

    // execute query
    return $stmt->execute();
  }
}

class AppointmentDetails {

  public $idService;
  public $price;
  public $color;
  public $comment;

}


?>