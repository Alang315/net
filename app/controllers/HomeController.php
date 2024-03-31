<?php

namespace app\controllers;

class HomeController {
    public function __construct() {
        
    }

    public function index() {
        require_view("home");
    }
}

?>