<?php 

namespace app\models;

use app\classes\DB;

class topics extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		$this->campos = ['Name', 'ID_user'];
	}

	function setValores($v) {
        $this->valores = $v;
    }
}