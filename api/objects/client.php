<?php
class Client {
 
    private $conn;
    private $table_name = "clients";
 
    public $id;
    public $name;
    public $firstname;
    public $phone;
    public $address;
    public $npa;
    public $city;
 
    public function __construct($db){
        $this->conn = $db;
    }

    // read clients
    function read($idClient = null) {
     
        $query = "select * from $this->table_name ";

        if (!is_null($idClient)) {
            $idClient = htmlspecialchars(strip_tags($idClient));
            $query .= " where id = $idClient ";
        }

        $query .= " order by name asc, firstname asc";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    function create() {
 
        // query to insert record
        $query = "insert 
                    into $this->table_name 
                  set
                    name=:name, firstname=:firstname, city=:city, npa=:npa, phone=:phone;";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->npa = htmlspecialchars(strip_tags($this->npa));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
     
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":firstname", $this->firstname);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":npa", $this->npa);
        $stmt->bindParam(":phone", $this->phone);
     
        // execute query
        if ($stmt->execute()) {
          $stmt = $this->conn->prepare("select LAST_INSERT_ID() as idClient;");
          $stmt->execute();
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          extract($row);

          return $idClient;
        }

        return -1;
    }

    // delete the client
    function delete() {
     
        // delete query
        $query = "delete from $this->table_name WHERE id = ?";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
     
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);

        // execute query
        return $stmt->execute();
    }

    function update() {
 
        // query to update record
        $query = "update 
                    $this->table_name 
                  set
                    name=:name,
                    firstname=:firstname,
                    phone=:phone, 
                    npa=:npa, 
                    city=:city
                  where id=:id;";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->npa = htmlspecialchars(strip_tags($this->npa));
        $this->city = htmlspecialchars(strip_tags($this->city));
     
        // bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":firstname", $this->firstname);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":npa", $this->npa);
        $stmt->bindParam(":city", $this->city);
     
        // execute query
        return $stmt->execute();
    }

    function getClientNoVisitSince($year) {
        $query = "select
                      clients.*,
                      max(appointment.date) as last_date
                    from clients
                      inner join appointment on appointment.idclient = clients.id
                    group by clients.id
                    having YEAR(last_date) < $year;";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->year = htmlspecialchars(strip_tags($year));
     
        // bind values
        $stmt->bindParam(":year", $year);

        // execute query
        $stmt->execute();
     
        return $stmt;
    }
}
?>