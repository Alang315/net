<?php
function perfil_header($args = [], $sesion = null){
?>

<?php
    if (isset($args['styles'])) {
        foreach ($args['styles'] as $s) {
            echo_link_style($s);
        }
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <title>GREENNET</title>
    <link rel="shortcut icon" type="image/x-icon" href="/resources/img/logo_mission_vision.png">
</head>
<body>
    <header>
        <div class="logo" id="logo">
            <button class="logobutton" onclick="app.view('home')">
                <img src= "/resources/img/logo_mission_vision.png" alt="Logo de mi foro" class="img-logo">
                <h1 class="nombre-logo">GreenNet</h1>
            </button>
        </div>
        <div class="perfil">
            <p class= "nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : ""; ?></p>
            <img src= "/resources/img/perfil.jpg" alt="Foto de perfil" class="img-perfil" id="perfil_Icono">
        </div>
    </header>
<?php }?>