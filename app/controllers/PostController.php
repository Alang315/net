<?php 

namespace app\controllers;

use app\models\comments;
use app\models\publication;
use app\models\reaction_type;

class PostController{

    public function index(){
        require_view("error404");
        $this->getPost();
    }
    
    public function getP(){
        if($_GET){
            $pp = in_array('_pp', array_keys(filter_input_array(INPUT_GET)));
            if($pp){
                print_r($this->getPost());
            }
        }
    }

    private function getPost($limit="", $pid = ""){
        $posts = new publication();
        $resultP = $posts->select(['a.ID_publication', 'a.Title', 'a.Content', 'b.Username','a.ID_topic', 'a.Date'])
                         ->join('user b', 'a.ID_user = b.ID_user')
                         ->where($pid != "" ? [['a.ID_publication', $pid]] : [['a.ID_publication', 2]])
                         ->orderBy([['a.Date', 'DESC']])
                         ->limit($limit)
                         ->getAll();
        print_r($resultP);
        /*if($pid!="" || $limit==1){
            $comments = new comments();
            $resultC = $comments->select(['id'])
                                ->count()
                                ->where([['postId',json_decode($resultP)[0]->id]])
                                ->getAll();
            //$interacts = new ();
            $resultL = $interacts->select(['id'])
                                 ->count()
                                 ->where([['postId',json_decode($resultP)[0]->id],['tipo',1]])
                                 ->get();
            $resultML = $interacts->select(['id'])
                                  ->count()
                                  ->where([['postId',json_decode($resultP)[0]->id],['tipo',1],
                                             ['userId',$this->userId]])
                                  ->get();
            $resultLo = $interacts->select(['id'])
                                  ->count()
                                  ->where([['postId',json_decode($resultP)[0]->id],['tipo',2]])
                                  ->get();
             $resultMLo = $interacts->select(['id'])
                                   ->count()
                                   ->where([['postId',json_decode($resultP)[0]->id],['tipo',2],
                                              ['userId',$this->userId]])
                                   ->get();
            $resultH = $interacts->select(['id'])
                                  ->count()
                                  ->where([['postId',json_decode($resultP)[0]->id],['tipo',3]])
                                  ->get();
             $resultMH = $interacts->select(['id'])
                                   ->count()
                                   ->where([['postId',json_decode($resultP)[0]->id],['tipo',3],
                                              ['userId',$this->userId]])
                                   ->get();
            $result = json_encode(array_merge(
                        json_decode($resultP),
                        json_decode($resultC),
                        json_decode($resultL),
                        json_decode($resultML),
                        json_decode($resultLo),
                        json_decode($resultMLo),
                        json_decode($resultH),
                        json_decode($resultMH)));
        }else{
            $result = $resultP;
        }
        return $result;
        */
    }




}


?>