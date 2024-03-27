<?php
namespace Models;
use PDO, PDOException;

class conexion extends PDO {
    private $servername= "localhost";
    private $username= "root";
    private $password= "";
    private $dbname= "greennet";
    protected $table = "";

    public function __construct() {
        try{
            parent::__construct("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function setTable($table) {
        $this->table = $table;
    }

    public function select($campos = ['*'], $condiciones = []) {
        $campos = implode(', ', $campos);
        $sql = "SELECT $campos FROM $this->table";
        if($condiciones)
            $sql .= " WHERE " . implode(' AND ', array_map(fn($key) => "$key = :$key", array_keys($condiciones)));
        $stmt = $this->prepare($sql);
        if($condiciones)
            foreach ($condiciones as $key => $value)
                $stmt->bindValue(":$key", $value);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function insert($valores) {
        $columnas = implode(', ', array_keys($valores));
        $keys = implode(', ', array_fill(0, count($valores), '?'));
        $query = "INSERT INTO $this->table ($columnas) VALUES ($keys)";
        $stmt = $this->prepare($query);
        return $stmt->execute(array_values($valores));
    }

    public function delete($condiciones) {
        $sql = "DELETE FROM $this->table WHERE " . implode(' AND ', array_map(fn($key) => "$key = :$key", array_keys($condiciones)));
        $stmt = $this->prepare($sql);
        foreach ($condiciones as $key => $value)
            $stmt->bindValue(":$key", $value);
        return $stmt->execute();
    }

    public function update($valores, $condiciones) {
        $sql = "UPDATE $this->table SET " . implode(', ', array_map(fn($key) => "$key = :$key", array_keys($valores))) . 
        ' WHERE ' . implode(' AND ', array_map(fn($key) => "$key = :$key", array_keys($condiciones)));
        $stmt = $this->prepare($sql);
        foreach ($valores as $key => $value)
            $stmt->bindValue(":$key", $value);
        foreach ($condiciones as $key => $value)
            $stmt->bindValue(":$key", $value);
        return $stmt->execute();
    }
}
?>