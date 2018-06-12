<?php

class Database {

  const DUMP_FILE_NAME = "dump.sql";
 
  private $host = "localhost";
  private $db_name = "la_bottega";
  private $username = "root";
  private $password = "1234";
  public $conn;
  
    // get the database connection
  public function getConnection() {
   
    $this->conn = null;
    
    try {
      $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
      $this->conn->exec("set names utf8");
    } catch(PDOException $exception) {
      echo "Connection error: " . $exception->getMessage();
    }
    
    return $this->conn;
  }

  public function dump() {
    
    shell_exec("C:\wamp64\bin\mysql\mysql5.7.19\bin\mysqldump --single-transaction --user=$this->username --password=$this->password --host=$this->host $this->db_name > ".self::DUMP_FILE_NAME);

    return self::DUMP_FILE_NAME;
  }

  public function removeDump() {
    unlink(self::DUMP_FILE_NAME);
  }
}
?>