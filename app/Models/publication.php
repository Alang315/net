<?php 
namespace Models;
use Models\conexion;

class publication extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Title', 'Content', 'Date','ID_user', 'ID_topic'];
	public $valores = [];
}