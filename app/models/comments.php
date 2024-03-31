<?php 

namespace app\models;

use app\classes\DB;

class comments extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		$this->campos = ['Content', 'Date', 'ID_user','ID_publication'];
	}

	function setValores($v) {
        $this->valores = $v;
    }
}