<?php
// database.php

class Database {
    private $host = DB_HOST;
    private $dbname = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    public $conn;

    public function connect(){
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbname, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection Error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>