<?php

namespace app\controllers;

class ErrorController {
    public function __construct() {
        
    }

    public function error404() {
        require_view("error404");
    }
}

?>