<?php 
namespace Models;
use Models\conexion;

class topic extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Name', 'ID_user'];
	public $valores = [];
}