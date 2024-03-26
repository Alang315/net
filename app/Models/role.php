<?php 
namespace Models;
use Models\conexion;

class role extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Position', 'Description'];
	public $valores = [];
}