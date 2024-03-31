<?php 

namespace app\models;

use app\classes\DB;

class role extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		//$this->table = $this;
	}

	protected $campos = ['Position', 'Description'];
	public $valores = [];
}