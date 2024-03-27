<?php
namespace Models;
use Models\conexion;

class user extends conexion {
	public function __construct() {
        parent::__construct();
        $this->setTable('users'); // Aquí puedes configurar la tabla que desees
    }
	
    protected $campos = ['Username', 'Password', 'Email', 'ID_Role'];
    public $valores = [];

}
?>