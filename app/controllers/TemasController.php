<?php

namespace app\controllers;

use app\models\user;
use stdClass;

class TemasController {
    public function __construct() {
        
    }

    public function index() {
        $result = $this->sessionValidate();
        if(!is_null($result) && $_SESSION["key"] == 1){
            $sesion = new stdClass();
            $sesion->sv = true;
            $sesion->key = $_SESSION["key"];
            $sesion->passwd = $_SESSION["passwd"];
            $sesion ->user = $_SESSION["user"];
            $sesion->email = $_SESSION["email"];
            $sesion->role = $_SESSION["role"];
            require_view("temas", $sesion);
        }
        else{
            require_view("error404"); // funcion para reenviar vistas
        }
    }

    //Metodo que deslogue a los usuarios
    public function logout(){
        $this->sessionDestroy();
        header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
        header("Pragma: no-cache"); // HTTP 1.0
        header("Expires: 0"); // Proxies
        header("Location: /");
        exit;
    }

    //Metodo que valida la sesion de los usuarios 
    private function sessionValidate(){ //Se valida la sesion desde la bd
        $user = new user();
        session_start();
        if(session_status() == PHP_SESSION_ACTIVE && count($_SESSION) > 0){
            $datos = $_SESSION;
            $result = $user->where([["Password",$datos["passwd"]],
                                    ["Email",$datos["email"]]])->getAll(); //libreria base de datos
            if(count($result) > 0 && $datos['IP'] == $_SERVER['REMOTE_ADDR']){
                session_write_close();
                return $result;
            }
        } else {
            session_write_close();
            $this->sessionDestroy();
            return null;
        }
    }
    
    // Metodo que destruye la sesion
    private function sessionDestroy(){ // se destruye la sesion  y se desvalida
        session_start();
        $_SESSION = [];
        session_destroy();
        session_write_close();
        return;
    }
}

?>