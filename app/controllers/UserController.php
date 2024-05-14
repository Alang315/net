<?php

namespace app\controllers;

use app\models\user;
use stdClass;

class UserController {

    public function index() {
        $result = $this->sessionValidate();
        if(!is_null($result)){
            require_view("error404");
        }
        else{
            require_view("error404"); // funcion para reenviar vistas
        }
    }

    //Metodo que deslogue a los usuarios
    public function logout(){
        $result = self::sessionValidate();
        if(!is_null($result)){
            $this->sessionDestroy();
            header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
            header("Pragma: no-cache"); // HTTP 1.0
            header("Expires: 0"); // Proxies
            header("Location: /");
            exit;
        }
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

    //obtiene para obtener publicaciones de un usuario en especifico
    public function get_people(){
        $result = self::sessionValidate();
        if(!is_null($result)){
            if(!empty($_GET)){
                $gu = in_array('_gu', array_keys(filter_input_array(INPUT_GET)));
                if($gu){
                    print_r($this->get_Users());
                }else{
                    require_view("error404");
                    die;
                }
            }else{
                require_view("error404");
                die;
            }
        }else{
            require_view("error404");
            die;
        }
    }
    
    public function DU(){
        $result = self::sessionValidate();
        if(!is_null($result)){
            if(!empty($_GET)){
                $gu = in_array('_dU', array_keys(filter_input_array(INPUT_GET)));
                if($gu){
                    $key = filter_input_array(INPUT_GET)["uid"];
                    print_r($this->delete_User($key));
                }else{
                    require_view("error404");
                    die;
                }
            }else{
                require_view("error404");
                die;
            }
        }else{
            require_view("error404");
            die;
        }
    }

    private function get_Users(){
        $users = new user;
        $result = $users->select(["a.ID_user, a.Username, a.Email"])
        ->count([["b.ID_user", "Nposts"]])
        ->join([["publication b","b.ID_user = a.ID_user ", "left"]])
        ->where([["a.ID_user  NOT ", 1]])
        ->groupby("a.ID_user, a.Username, a.Email")
        ->getAll();
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    } 

    private function delete_User($uid){
        $user = new user();
        $result = $user->where([["ID_user", $uid]])->delete();
        if($result){
            return json_encode(["r" => true, "m" => "Se elimino el usuario satisfactoriamente"], JSON_UNESCAPED_UNICODE);
        }
        else{
            return false;
        }
    }
}

?>