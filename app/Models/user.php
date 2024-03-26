<?php 
namespace Models;
use Models\conexion;

class user extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Username', 'Password','Email','ID_Role'];
	public $valores = [];
}