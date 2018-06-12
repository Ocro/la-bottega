<?php
class Service {
 
    private $conn;
    private $table_name = "services";
 
    public $id;
    public $service;
    public $price;
 
    public function __construct($db){
        $this->conn = $db;
    }

    // read services
    function read($idService = null) {
     
        $query = "select * from $this->table_name ";

        if (!is_null($idService))
            $query .= " where id = $idService ";

        $query .= " order by service asc, id asc";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    // delete the service
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

    function create() {
 
        // query to insert record
        $query = "insert 
                    into $this->table_name 
                  set
                    service=:service, price=:price";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->service = htmlspecialchars(strip_tags($this->service));
        $this->price = htmlspecialchars(strip_tags($this->price));
     
        // bind values
        $stmt->bindParam(":service", $this->service);
        $stmt->bindParam(":price", $this->price);
     
        // execute query
        return $stmt->execute();
    }

    function update() {
 
        // query to update record
        $query = "update 
                    $this->table_name 
                  set
                    service=:service, price=:price
                  where id=:id";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->service = htmlspecialchars(strip_tags($this->service));
        $this->price = htmlspecialchars(strip_tags($this->price));
     
        // bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":service", $this->service);
        $stmt->bindParam(":price", $this->price);
     
        // execute query
        return $stmt->execute();
    }
}
?>