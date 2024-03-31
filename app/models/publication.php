<?php 

namespace app\models;

use app\classes\DB;

class publication extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		$this->campos = ['Title', 'Content', 'Date','ID_user', 'ID_topic'];
	}
	
	function setValores($v) {
        $this->valores = $v;
    }
}