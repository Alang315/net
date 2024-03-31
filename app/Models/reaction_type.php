<?php 

namespace app\models;

use app\classes\DB;

class reaction_type extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		$this->campos = ['Type', 'Description'];
	}
	
	function setValores($v) {
        $this->valores = $v;
    }
}