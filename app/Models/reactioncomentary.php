<?php 
namespace Models;
use Models\conexion;

class reactioncomentary extends conexion {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['ID_user', 'ID_type', 'ID_comment','Date'];
	public $valores = [];
}