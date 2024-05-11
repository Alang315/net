<?php

namespace app\classes;

/** uses de los controladores */
use app\controllers\HomeController as Home;
use app\controllers\LoginController as Login;
use app\controllers\ErrorController as ErrorController;
use app\controllers\PerfilController as Perfil;
use app\controllers\AdminuserController as Adminuser;
use app\controllers\AdminpublicController as Adminpublic;
use app\controllers\PostController as Post;
use app\controllers\UserController as User;

class Router {
    private $uri = "";

    public function __construct()
    {
        
    }

    public function route() {
        $this->filterRequest();
        $controller = $this->getController();
        $action     = $this->getAction();
        $params     = $this->getParams();
        switch($controller){
            case 'HomeController':
                $controller = new Home();break;
            case 'LoginController':
                $controller = new Login();break;
            case 'PostController':
                $controller = new Post(); break;
            case 'PerfilController':
                $controller = new Perfil(); break;
            case 'AdminpublicController':
                $controller = new Adminpublic(); break;
            case 'AdminuserController':
                $controller = new Adminuser(); break;
            case 'UserController':
                $controller = new User(); break;
            default :
                $controller = new ErrorController();
                $action = 'error404';
        }
        $controller->$action($params);
        return;
    }

    private function filterRequest() {
        $peticion = filter_input_array(INPUT_GET);
        if(isset($peticion['uri'])){
            $this->uri = $peticion['uri'];
            $this->uri = rtrim($this->uri, '/');
            $this->uri = filter_var($this->uri, FILTER_SANITIZE_URL);
            $this->uri = explode("/", ucfirst(strtolower($this->uri)));
            return;
        }
    }

    private function getController() {
        if(isset($this->uri[0])){
            $controller = $this->uri[0];
            unset($this->uri[0]);
        } else {
            $controller = "Home";
        }
        $controller = ucfirst($controller) . 'Controller';
        return $controller;
        
    }

    private function getAction() {
        if(isset($this->uri[1])){
            $action = $this->uri[1];
            unset($this->uri[1]);
        } else {
            $action = "index";
        }
        return $action;
    }

    private function getParams() {
        $params = [];
        if(!empty($this->uri)){
            $params = $this->uri;
        }
        return $params;
    }
}

?>