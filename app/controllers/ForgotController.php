<?php

namespace app\controllers;
use app\models\codes;
use app\models\user;
use PHPMailer\PHPMailer\PHPMailer;
require_once ROOT . "PHPMailer/src/PHPMailer.php";
require_once ROOT . "PHPMailer/src/Exception.php";
require_once ROOT . "PHPMailer/src/SMTP.php";

class ForgotController {
    public function __construct() {
        
    }
    
    public function index() {
        if(session_status() !== PHP_SESSION_ACTIVE) session_start();
        $error = array();
        $mode = "enter_mail";

        if(count($_POST) > 0){
            $mode = $_POST['mode'];

            switch($mode){
                case 'enter_mail':
                    $email = $_POST['email'];
                    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                        $error[] = "Correo inválido";
                    }elseif(!$this->valid_email($email)){
                        $error[] = "Correo no encontrado";
                    }else{
                        $_SESSION['email'] = $email;
                        $this->send_email($email);
                        $mode = 'enter_code';
                    }
                    break;

                case 'enter_code':
                    $code = $_POST['code'];
                    $result = $this->is_code_correct($code);
                    if($result == "Código correcto"){
                       $_SESSION['code'] = $code;
                        $mode = 'enter_password';
                    }else{
                       $error[] = $result;
                    }
                    break;

                case 'enter_password':
                    $password = $_POST['password'];
                    $password2 = $_POST['password2'];
                    if($password !== $password2){
                       $error[] = "Las contraseñas no coinciden";
                    }else{
                        $this->save_password($password);
                       header("Location: login");
                       die;
                    }
                    break;

                default:
                    break;
            }

        }   
        require_view("forgot", "", ["error" => $error, "mode" => $mode]);
    }

    // Metodo para los datos del correo
    public function send_email($email){
        $expire = time() + (60*1);
        $code = rand(10000, 99999);
        $email = addslashes($email);

        $codeObj = new codes();
        $codeObj->setValores([$email, $code, $expire]);

        $query = $codeObj->insert();
        if($query){
            $to = $email;
            $subject = "Recover your password";
            $message = "Your recovery code is: " . $code;
            $this->send_mail($to, $subject, $message);
        }
    }

    // Metodo para enviar el correo
    public function send_mail($to, $subject, $message){
        $mail = new PHPMailer(exceptions: true);
        $mail->IsSMTP();
        $mail->SMTPOptions = ['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]];

        $mail->SMTPDebug = 0;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->Host = "smtp.gmail.com";
        $mail->Username = "greennet.webforum@gmail.com";
        $mail->Password = "ylmtdajymevldzwn";
    
        $mail->IsHTML(true);
        $mail->AddAddress($to);
        $mail->SetFrom("greennet.webforum@gmail.com", "GreenNet");
        $mail->Subject = $subject;
        $content = $message;
    
        $mail->MsgHTML($content);
        if(!$mail->Send()){
            return false;
        }else{
            return true;
        }
    }

    // Metodo para verificar el codigo
    public function is_code_correct($code){
        $code = addslashes($code);
        $expire = time();
        $email = addslashes($_SESSION['email']);

        $codeObj = new codes();
        $query = $codeObj->where([['email', $email], ['code', $code]])->getAll();
        if($query){
            if(count((array) $query) > 0){
                $row = $query[0]; // $query[0] es un objeto stdClass
                if($row->expire > $expire){
                    return "Código correcto";
                } else {
                    return "Código expirado";
                }
            } else {
                return "Código incorrecto";
            }
        }
        return "Código incorrecto";
    }

    // Metodo para guardar la contraseña
    public function save_password($password){
        $password = password_hash($password, PASSWORD_BCRYPT);
        $email = addslashes($_SESSION['email']);

        $user = new user();
        $query = $user->where([['Email', $email]])
                      ->update(["Password"=>$password]);

    }

    // Metodo para validar el correo
    public function valid_email($email){
        $email = addslashes($email);
        $user = new user();
        $query = $user->where([['email', $email]])->getAll();
        if($query){
            if(count($query) > 0){
                return true;
            }
        }
        return false;
    }

}
    
?>