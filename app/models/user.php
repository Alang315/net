<?php

namespace app\models;

use app\classes\DB;

class user extends DB {
    public $table;
	public function __construct() {
        parent::__construct();
        $this->campos = ['Username', 'Password', 'Email', "Biography", "ID_Role"];
    }

    function setValores($v) {
        $this->valores = $v;
    }
}
?>