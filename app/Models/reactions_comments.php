<?php 

namespace app\models;

use app\classes\DB;

class reactions_comments extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		$this->campos = ['ID_user', 'ID_type', 'ID_comment','Date'];
	}

	function setValores($v) {
        $this->valores = $v;
    }
}