<?php

namespace app\controllers;

use app\models\user;
use Exception;

class LoginController {
    public function __construct() {
        
    }
    //-----------------Vistas--------------------- 

    public function index() {
        require_view("login");
    }
    //---------Manejo de la informacion------------ 
    public function getdata_user() {
        if(!empty($_POST)){
            $register = in_array('_register', array_keys(filter_input_array(INPUT_POST)));
            if($register){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                print_r($this->userRegister($datos));
            }
        }
    }

    //----------Instrucciones hacia los modelos ----------------
    private function userRegister($datos){
        $user = new user();
        $user->valores  = [$datos["name"], password_hash($datos["pass"], PASSWORD_DEFAULT), $datos["email"], NULL, 2];
        $result = $user->insert();
        return $result;
        die;
    }
}
    

?>