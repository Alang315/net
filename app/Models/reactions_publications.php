<?php 

namespace app\models;

use app\classes\DB;

class reactions_publications extends DB {
	public $table;
	function __construct(){
		parent::__construct();
		$this->campos = ['ID_user', 'ID_type', 'ID_publication','Date'];
	}

	function setValores($v) {
        $this->valores = $v;
    }
}