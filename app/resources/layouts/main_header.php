<?php
function main_header($args = [],$sesion = null){
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>GREENNET</title>
    <link rel="shortcut icon" type="image/x-icon" href="/resources/img/logo.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel="stylesheet">

    <?php
    if (isset($args['styles'])) {
        foreach ($args['styles'] as $s) {
            echo_link_style($s);
        }
    }
    ?>
    <link rel="shortcut icon" type="image/x-icon" href="<?php  ?>">
</head>
<body>
    <header>
        <div class="logo" id="logo">
            <a onclick="app.view('home')"><img src="/resources/img/logo.png" alt="Logo del foro" class="img-logo"></a>
            <h1 class="nombre-logo">GreenNet</h1>
        </div>
        <div class="opcionesheader">
            <div class="iconocrear" id="iconocrear">
            <p class="nombre-perfil"><?php echo !isset($sesion->sv) ? "" : "<button class='botoncrearpub' id='btncrearposthead' alt='Crear publicación'>
                    <img src= '/resources/img/create-note-alt-svgrepo-com.png' alt='Crear Publicación' class='img-logo' id='crearpubicon' onclick=\"app.newposttab()\">
                </button>" ?> </p>
            </div>
            <div class="perfil">
                <p class="nombre-perfil"><?php echo !isset($sesion->sv) ? "<h2><button class='registerbtn' onclick=\"app.view('login')\"> Registrate o Inicia sesion</button></h2>" : "" ?> </p><!--Pone en el header el boton para registrarse o no -->
                <img src="/resources/img/perfil_img.jpg" alt="Foto de perfil" class="img-perfil" id="perfil_Icono">
            </div>
        </div>
    </header>

<?php scripts(); }?>