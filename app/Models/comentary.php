<?php 
namespace Models;
use Models\conexion;

class comentary extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Content', 'Date', 'ID_user','ID_publication'];
	public $valores = [];
}