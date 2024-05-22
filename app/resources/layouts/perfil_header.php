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
    <title>GREENNET</title>
    <link rel="shortcut icon" type="image/x-icon" href="/resources/img/logo.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <header>
        <div class="logo" id="logo">
            <a onclick="app.view('home')"><img src="/resources/img/logo.png" alt="Logo del foro" class="img-logo"></a>
            <a onclick="app.view('home')"><h1 class="nombre-logo">GreenNet</h1></a>
        </div>
        <div class="opcionesheader">
                <p class= "nombre-perfil"><div class="iconocrear" id="iconocrear">
                <button id="btncrearposthead" class="botoncrearpub" alt="Crear publicación">
                    <img src= "/resources/img/create-note-alt-svgrepo-com.png" alt="Crear Publicación" class="img-logo" id="crearpubicon" onclick="app.newposttab()">
                </button>
                </p>
            </div>
            <div class="perfil">
                <p class= "nombre-perfil"><?php  ?></p>
                <img src= "/resources/img/perfil.jpg" alt="Foto de perfil" class="img-perfil" id="perfil_Icono">
            </div>
        </div>
    </header>
    <div id="detailsDiv">
        <b>GreenNet</b><br>
        <p class="nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : "" ?></p>
        <p class="email-perfil"><?php echo isset($sesion->email) ? $sesion->email : "" ?></p>
        <ul>
            <li><button class='miperfilbtn' onclick="app.view('home')">Ir a inicio</button></li>
            <?php echo (isset($sesion->role) && $sesion->role == 1) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminpublic')\">Administrar publicaciones</button></li>" : "";?>
            <?php echo (isset($sesion->role) && $sesion->role == 1) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminuser')\">Administrar usuarios</button></li>" : "";?>
            <?php echo (isset($sesion->role) && $sesion->role == 1) ? "<li><button class='miperfilbtn' onclick=\"app.view('temas')\">Temas</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<h2><button class='cerrarsesionbtn' onclick=\"app.view('logoutindex')\">Cerrar sesión</button></h2>" : "";  ?>
        </ul>
    </div>
<?php }?>