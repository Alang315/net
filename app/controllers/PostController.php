<?php 

namespace app\controllers;

use app\models\comments;
use app\models\publication;
use app\models\reaction_type;
use app\models\reactions_publications;
use app\models\topics;
use app\classes\ImageUpload;
use LDAP\Result;

class PostController{

    public function index(){
        require_view("error404");
    }
    
    //Obtiene para obtener publicaciones
    public function getP(){
        if(!empty($_GET)){
            $pp = in_array('_pp', array_keys(filter_input_array(INPUT_GET)));
            if($pp){
                print_r($this->getPost());
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        }
    }
   
    //Obtiene para crear publicacion
    public function get_Publidata(){
        if(!empty($_POST)){
            $cp = in_array('_cp', array_keys(filter_input_array(INPUT_POST)));
            if($cp){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                $datos["imagen"] = ImageUpload::upload_image('imagen');
                print_r($this->createPost($datos));
            }else{
                require_view("error404");
            }
        }else{
            require_view("error404");
        }

    }

    //Obtiene para edita publicacion
    public function edit_post_data(){
        if(!empty($_POST)){
            $cp = in_array('_ep', array_keys(filter_input_array(INPUT_POST)));
            if($cp){
                $datos = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
                $datos["imagen"] = ImageUpload::upload_image('imagen');
                print_r($this->editPost($datos));
            }else{
                require_view("error404");
            }
        }else{
            require_view("error404");
        }

    }

    //obtiene para obtener publicaciones de un usuario en especifico
    public function get_user_P(){
        if(!empty($_GET)){
            $up = in_array('uid', array_keys(filter_input_array(INPUT_GET)));
            if($up){
                $key = filter_input_array(INPUT_GET)["uid"];
                print_r($this->getPost("","", $key));
            }else{
                require_view("error404");
                die;
            }
        }else{
            require_view("error404");
            die;
        }
    }

    //Obtiene para obtener temas de todas las publicaciones
    public function getT(){
        if(!empty($_GET)){
            $gt = in_array('_gt', array_keys(filter_input_array(INPUT_GET)));
            if($gt){
                print_r(self::getTopics());
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        } 
    }
    
    //crea las reacciones y obtiene la cantidad de las reacciones
    public function getEmotes(){
        if(!empty($_GET)){
            $gt = in_array('_ge', array_keys(filter_input_array(INPUT_GET)));
            if($gt){
                $user = filter_input_array(INPUT_GET)["uid"];
                $pid =  filter_input_array(INPUT_GET)["pid"];
                $type = filter_input_array(INPUT_GET)["type"];
                print_r(self::insertReactions("",$user, $pid, $type));
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        } 
    }

    public function getEmotesResult(){
        if(!empty($_GET)){
            $gt = in_array('_gE', array_keys(filter_input_array(INPUT_GET)));
            if($gt){
                $pid =  filter_input_array(INPUT_GET)["pid"];
                print_r(self::getReactions("",$pid));
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        } 
    }

    public function openpost(){
        if(!empty($_GET)){
            $op = in_array('_Op', array_keys(filter_input_array(INPUT_GET)));
            if($op){
                if(isset(filter_input_array(INPUT_GET)["pid"])){
                    $pid =  filter_input_array(INPUT_GET)["pid"];
                    print_r(self::getPost(1, $pid));
                }else{
                    require_view("error404");
                }
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        } 
    }

    public function DP(){
        if(!empty($_GET)){
            $op = in_array('_dP', array_keys(filter_input_array(INPUT_GET)));
            if($op){
                if(isset(filter_input_array(INPUT_GET)["pid"])){
                    $pid =  filter_input_array(INPUT_GET)["pid"];
                    print_r(self::delete_Post($pid));
                }else{
                    require_view("error404");
                }
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        } 
    }

    public function Ac(){
        if(!empty($_GET)){
            $op = in_array('_aC', array_keys(filter_input_array(INPUT_GET)));
            if($op){
                if(isset(filter_input_array(INPUT_GET)["pid"])){
                    $pid =  filter_input_array(INPUT_GET)["pid"];
                    print_r(self::activePost($pid));
                }else{
                    require_view("error404");
                }
            }else{
                require_view("error404");
                die();
            }
        }else{
            require_view("error404");
            die();
        } 
    }

    


 //---------------------------- Modelos y BD----------------------------------------------------------------------------------------


//OBTENER LA CUENTA DE CADA TIPO DE REACCION DE CADA PUBLICACION
    private function getPost($limit="", $pid = "", $uid = ""){
        $posts = new publication();
        $resultP = $posts->select(['a.ID_publication', 'a.Title', 'a.Content', 'b.Username','t.Name as topic','t.ID_topic as ID_topic', 'a.Date', 'a.Image', 'a.Active'])
                        ->count([["DISTINCT rp.ID_reaction", "reacciones"], ["DISTINCT c.ID_comment", "comments"]])
                         ->group_concat("DISTINCT rt.ID_type", "reacciones_IDS")
                         ->join([['user b', 'a.ID_user = b.ID_user', " "], 
                         ["reactions_publications rp", "a.ID_publication = rp.ID_publication", "left"],
                         ["reactions_comments rc", "a.ID_publication = rc.ID_comment", "left"],
                         ["reaction_type rt", "rp.ID_type = rt.ID_type OR rc.ID_type = rt.ID_type", "left"],
                         ["comments c", "a.ID_publication = c.ID_publication", "left"], 
                         ["topics t", "a.ID_topic = t.ID_topic", "inner"]
                         ])                                                 //Operador terniario dentro de otro operador 
                                                                    //terniario, obtiene las publicaciones de un usuario o una publicacion especifica
                         ->where($pid != "" ? [['a.ID_publication', $pid], /*["a.Active", 1]*/] : ($uid != "" ? [['a.ID_user', $uid]/*, ["a.Active", 1]*/] : [["a.Active  NOT", "2"]]))
                         ->groupby($pid != "" ?  "" : "a.ID_publication DESC")
                         ->limit($limit)
                         ->getAll();
            if($pid!= "" || $limit==1){
                $comments = new comments();
                $resultC = $comments->select(['a.ID_comment, a.Content, a.Date, u.Username, u.Email'])
                                    ->join([["user u ", "a.ID_user = u.ID_user", "inner"],
                                    ["publication pu ", "pu.ID_publication = a.ID_publication", "inner"]])
                                    ->where([['a.ID_publication', $pid]])
                                    ->getAll();
                $result = array_merge($resultP, $resultC);
            }else{
                $result = $resultP;
            }
            return json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    
    //Crear Publicacion
    private function createPost($datos){
        $post = new publication();
        $post->setValores([$datos["titulo"], $datos["contenido"], $datos["date"], $datos["key"], $datos["tid"], $datos["state"], $datos["imagen"]]);
        $result = $post->insert();
        return $result;
    }

    //Editar Publicacion
    private function editPost($datos) {
        $post = new publication();
        if(isset($datos['imagen'])){
            $result = $post->where([["ID_publication ", $datos["idPost"]]])
            ->update(["Title"=>$datos["titulo"], "Content"=>$datos["contenido"], "ID_topic"=>$datos["tid"], "Image"=>$datos["imagen"]]);
        } else {
            $result = $post->where([["ID_publication ", $datos["idPost"]]])
            ->update(["Title"=>$datos["titulo"], "Content"=>$datos["contenido"], "ID_topic"=>$datos["tid"]]);
        }
        return $result;
    }

    //Obtiene temas
    private function getTopics(){
        $topic = new topics();                                               
        $result = $topic->select(["ID_topic, Name, Description"])->getAll(); // Obtiene los atributos "ID, el Nombre y la Descripción" de los Temas
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    // Inserta Interaciones
    public function insertReactions($killed ,$uid, $pid, $num){
		$like = new reactions_publications();
		$like_exists = $like->select(['ID_reaction', 'ID_type'])
							->where([['ID_publication',$pid],['ID_user', $uid]])
							->getAll();
		if(count($like_exists) < 1){
			$like->setValores([$uid,$num,$pid,date("d-m-Y h:i a")]);
			$like->insert();
		}else{
			$likeData = $like_exists[0];
			$tipo = $likeData->ID_type;
			if ($tipo != $num) {
				$like->where([['ID_publication', $pid], ['ID_user', $uid]])->update(['ID_type' => $num]);
			} else {
				$like->where([['ID_publication', $pid], ['ID_user', $uid]])->delete();
			}
        }
        $reactions = self::getReactions("", $pid);
        return $reactions;
		//return $like->count()->where([['ID_publication',$pid]])->getAll();
    }

    //Obtiene reacciones
    private function getReactions($killed, $pid){
        $like = new reactions_publications();
        $liky = $like->select(["ID_publication", "ID_type"])->count()->where([['ID_publication', $pid],['ID_type', 1]])->getAll();
        $angry = $like->select(["ID_publication", "ID_type"])->count()->where([['ID_publication', $pid],['ID_type', 2]])->getAll();
        $sad = $like->select(["ID_publication", "ID_type"])->count()->where([['ID_publication', $pid],['ID_type', 3]])->getAll();
        $sorprised = $like->select(["ID_publication", "ID_type"])->count()->where([['ID_publication', $pid],['ID_type', 4]])->getAll();
        $funny = $like->select(["ID_publication", "ID_type"])->count()->where([['ID_publication', $pid],['ID_type', 5]])->getAll();
        $iloveit = $like->select(["ID_publication", "ID_type"])->count()->where([['ID_publication', $pid],['ID_type', 6]])->getAll();
        $reactions = json_encode(array_merge($liky, $angry, $sad, $sorprised, $funny, $iloveit), JSON_UNESCAPED_UNICODE);

        return $reactions;
    }

    private function delete_Post($pid){
        $publi = new publication();
        $post = json_decode($this->getPost(1, $pid))[0];
        if(!is_null($post->Image))
            unlink(addslashes(PUBLIC_DIRECTORY . "images" . DS . $post->Image));
        $result = $publi->where([["ID_publication", $pid]])->delete();
        if($result){
            return json_encode(["r" => true, "m" => "Se elimino la publicacion satisfactoriamente"], JSON_UNESCAPED_UNICODE);
        }else{
            return false;
        } 
    }

    private function activePost($pid){
        $publi = new publication();
        $result = $publi->where([["ID_publication", $pid]])->update(["Active" => "1"]);
        if($result){
            return json_encode(["r" => true, "m" => "Se Activo la publicacion satisfactoriamente"], JSON_UNESCAPED_UNICODE);
        }else{
            return json_encode(["r" => false], JSON_UNESCAPED_UNICODE);;
        } 
    }

}


?>