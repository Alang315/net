<?php

namespace app\models;

use app\classes\DB;

class codes extends DB {
    public $table;
	public function __construct() {
        parent::__construct();
        $this->campos = ['email', 'code', 'expire'];
    }

    public function setValores($v) {
        $this->valores = $v;
    }
}
?>