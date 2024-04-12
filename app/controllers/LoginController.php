<?php

namespace app\controllers;

use app\models\user;
use Exception;
use stdClass;

class LoginController {
    public function __construct() {
        $this->sv = false;        
    }

    private $sv; //Sesion validada
    private $name;
    private $id;

    //-----------------Vistas--------------------- 

    public function index() {
        $sesion = $this->sessionValidate();
        if(!is_null($sesion)){
            header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
            header("Pragma: no-cache"); // HTTP 1.0
            header("Expires: 0"); // Proxies
            header("Location: /");
            exit;
        }else{
            require_view("login");
        }
    }
    //---------Manejo de la informacion------------ 
    public function getdata_user() {
        if(!empty($_POST)){
            $register = in_array('_register', array_keys(filter_input_array(INPUT_POST)));
            if($register){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                print_r($this->userRegister($datos));
            }else{
                require_view("error404");
            }
        }else{
            require_view("error404");
        }
    }

    public function getdata_login(){
        if(!empty($_POST)){
            $register = in_array('_login', array_keys(filter_input_array(INPUT_POST)));
            if($register){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                print_r($this->userLogin($datos));
            }else{
                require_view("error404");
            }
        }else{
            require_view("error404");
        }
    }

    // Salir de la sesion
    public function logout(){
        $this->sessionDestroy();
        header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
        header("Pragma: no-cache"); // HTTP 1.0
        header("Expires: 0"); // Proxies
        header("Location: /login");
        exit;
    }

    //----------Instrucciones hacia los modelos ----------------
    private function userRegister($datos){
        $user = new user();
        $remail = $user->where([["Email", $datos["email"]]])->getAll();
        $ruser = $user->where([["Username", $datos["name"]]])->getAll();
        if(count($remail) > 0 || count($ruser) > 0){
           return json_encode(["r" => false, "m" => "El usuario ya esta registrado"]);
           die;
        }
        $user->valores  = [$datos["name"], password_hash($datos["pass"], PASSWORD_DEFAULT), $datos["email"], NULL, 2];
        $result = $user->insert();
        return $result;
        die;
    }
    
    private function userLogin($data) {
        try {
            $user = new user();
            $result = $user->where([["Email", $data["mail"]]])->getAll();
            if (count($result) > 0) {
                // Si hay resultados para el correo electrónico proporcionado
                $storedPassword = $result[0]->Password;
                if (password_verify($data["passw"], $storedPassword)) {
                    // Las contraseñas coinciden, iniciar sesión
                    return $this->sessionCreate($result);
                } else {
                    // Contraseña incorrecta
                    $this->sessionDestroy();
                    return json_encode(["r" => false]);
                }
            } else {
                // No se encontró ningún usuario con el correo electrónico proporcionado
                $this->sessionDestroy();
                return json_encode(["r" => false]);
            }
        } catch(Exception $e) {
            // Manejo de errores
            echo $e->getMessage();
        }
    }
    
    private function sessionCreate($datos){//Se crea una sesion y se guardan sus datos
        session_start();
        $_SESSION['IP'] = $_SERVER['REMOTE_ADDR'];
        $_SESSION['email'] = $datos[0]->Email; // seleccionamos el atributo
        $_SESSION['user'] = $datos[0]->Username;
        $_SESSION['passwd'] = $datos[0]->Password;
        $_SESSION["key"] = $datos[0]->ID_user;
        session_write_close();
        return json_encode(["r" => true]);
    }

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
        }else {
            session_write_close();
            $this->sessionDestroy();
            return null;
        }
    }

    private function sessionDestroy(){ // se destruye la sesion  y se desvalida
        session_start();
        $_SESSION = [];
        session_destroy();
        session_write_close();
        return;
    }

}
    

?>