<?php

namespace app\controllers;

use app\models\user;
use app\models\topics;
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

    //FUNCIONES PUBLICAS Y FILTRADAS PARA CRUD
    public function filterdata_createTopic() {
        if(!empty($_POST)){
            $ct = in_array('_ct', array_keys(filter_input_array(INPUT_POST)));
            if($ct){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                print_r($this->createTopic($datos));
                return;
            }
        }
        require_view("error404");
    }

    public function filterdata_deleteTopic() {
        if(!empty($_GET)){
            $dt = in_array('_dT', array_keys(filter_input_array(INPUT_GET)));
            if($dt){
                if(isset(filter_input_array(INPUT_GET)["tid"])){
                    $tid =  filter_input_array(INPUT_GET)["tid"];
                    print_r($this->deleteTopic($tid));
                    return;
                }
            }
        }
        require_view("error404");
    }

    public function filterdata_getTopicById() {
        if(!empty($_GET)){
            $gti = in_array('_gti', array_keys(filter_input_array(INPUT_GET)));
            if($gti){
                $id = filter_input_array(INPUT_GET)["idTopic"];
                echo json_encode($this->getTopicById($id));
                return;
            }
        }
        require_view("error404");
    }

    public function filterdata_editTopic() {
        if(!empty($_POST)){
            $et = in_array('_et', array_keys(filter_input_array(INPUT_POST)));
            if($et){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                echo $this->editTopic($datos);
                return;
            }
        }
        require_view("error404");
    }


    //FUNCIONES PRIVADAS DE CRUD
    private function createTopic($data) {
        $topic = new topics();
        $topic->setValores([$data['Titulo'], $data['Contenido'], $data['ID_user']]);
        return $topic->insert();
    }

    private function deleteTopic($tid) {
        $topic = new topics();
        $result = $topic->where([["ID_topic ", $tid]])->delete();
        if($result){
            return json_encode(["r" => true, "m" => "Se elimino el tema satisfactoriamente"], JSON_UNESCAPED_UNICODE);
        }else{
            return false;
        } 
    }

    private function getTopicById($idTopic){
        $topic = new topics();                                               
        return $topic->where([["ID_topic", $idTopic]])->select(["ID_topic, Name, Description"])->getAll();
    }

    private function editTopic($datos) {
        $topic = new topics();
        $result = $topic->where([["ID_topic", $datos["idTopic"]]])
            ->update(["Name"=>$datos["TituloEditado"], "Description"=>$datos["ContenidoEditado"]]);
        return $result;
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