<?php

    $layouts = ["admin_header", "main_footer", "main"];
    $styles = ["fonts", "style", "temas"];
    
    foreach ($layouts as $l) {
        require_layout($l);
    }
    
    admin_header(["styles" => $styles], $sesion);

    date_default_timezone_set('America/Mexico_City');
?>

<!--Panel del perfil-->
<div id="detailsDiv">
        <b>GreenNet</b><br>
        <p class="nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : ''; ?></p>
        <p class="email-perfil"><?php echo isset($sesion->email) ? $sesion->email : ''; ?></p>
        <ul>
            <li><button class='miperfilbtn' onclick="app.view('home')">Ir a inicio</button></li>
            <?php echo isset($sesion->sv) ? "<li><button class='miperfilbtn' onclick=\"app.view('miperfil')\">Mi Perfil</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminpublic')\">Administrar publicaciones</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminuser')\">Administrar usuarios</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<h2><button class='cerrarsesionbtn' onclick=\"app.view('logoutindex')\">Cerrar sesión</button></h2>" : "";  ?>
        </ul>
</div>

   
        <!--<br><hr>-->

<div class="container-2">
    <h2 class="text-center text-light">Administración de <span class="badge badge-danger">Temas</span></h2> 
</div> 
<!--Buscador-->
<div class="busqueda-admin">
    <div class="row-buscar">
        <div class="col-lg-12">
            <input type="search" class="search-bar" name="search" id="search3" placeholder="Buscar...">
            <button id="btnCrearTema" class='btnCrearTema' onclick="">Crear nuevo tema</button>
        </div>
        
    </div>
</div>

<div class="container">
    <div class="row-table">
        <div class="col-lg-12">
            <div class="table-responsive"> <!--Contenedor de la tabla-->
                <table id="tablaTemas" class="table table-striped table-bordered table-condensed">
                    <thead class="text-center">
                        <tr>
                            <th>Id</th>
                            <th>Nombre del tema</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="Tbody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="CrearTema" id="CrearTema">
    <div class="formularioTema">
        <form id="tema-Form" method="post">
            <div class="Title-container">
                <div class="tituloxd">
                    <span>Crear Tema</span>
                </div>
                <div class="buttonxd">
                    <button type="button" id="cerrarBTN">X</button> 
                </div>
            </div>
            <!--Titulo y contenido de la nueva publicacion-->
            <div class="Input-container">
                <input type="text" name="Titulo" placeholder="Título" id="titulo3" required>
                <textarea name="Contenido" placeholder="Escribe la descripción del tema..." id="contenido3" required></textarea>
                <button type="submit">Crear Tema</button> 
            </div>         
        </form>
    </div>
</div>

<div id="Sombreado"></div>

<?php 
    $scripts = ["app", "jquery", "sweetalert"];
    main_footer(["scripts" => $scripts, $sesion]);
?>
</html>

<script type="text/javascript">
    app.toggleTemas();
    app.getTopicsAdmin();


        
    $(function(){
        // Evento para eliminar usuario al hacer clic en el botón

       
    })
</script>