<?php 
namespace Models;
use Models\conexion;

class reactiontype extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Type', 'Description'];
	public $valores = [];
}