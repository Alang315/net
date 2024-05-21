<?php
    use PHPMailer\PHPMailer\PHPMailer;
    require_once ROOT . "PHPMailer/src/PHPMailer.php";

    function send_mail($recipient, $subject, $message){
        $mail = new PHPMailer();
        $mail->IsSMTP();

        $mail->SMTPDebug = 0;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->Host = "smtp.gmail.com";
        $mail->Username = "greennet.webforum@gmail.com";
        $mail->Password = "eorfhewnxlyvabyn";

        $mail->isHTML(true);
        $mail->addAddress($recipient, "estimado usuario");
        $mail->setFrom("greennet.webforum@gmail.com", "GreenNet");
        $mail->Subject = $subject;
        $content = $message;

        $mail->msgHTML($content);
        if(!$mail->send()){
            //No se envió el correo
            echo "Error: " . $mail->ErrorInfo;
            return false;
        }else{
            //Se envió el correo
            echo "Correo enviado";
            return true;
        }
    }

?>