<?php

    $layouts = ["main_header", "main_footer", "main"];
    $styles = ["fonts", "style", "admin_public"];
    
    foreach ($layouts as $l) {
        require_layout($l);
    }
    
    main_header(["styles" => $styles], $sesion);

    date_default_timezone_set('America/Mexico_City');
    
?>

<!--Panel del perfil-->
<div id="detailsDiv">
        <b>GreenNet</b><br>
        <p class="nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : ''; ?></p>
        <p class="email-perfil"><?php echo isset($sesion->email) ? $sesion->email : ''; ?></p>
        <ul>
            <?php echo isset($sesion->sv) ? "<li><button class='miperfilbtn' onclick=\"app.view('miperfil')\">Mi Perfil</button></li>" : "";?>
            <?php echo (isset($sesion->role) && $sesion->role == 1) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminpublic')\">Administrar publicaciones</button></li>" : "";?>
            <?php echo (isset($sesion->role) && $sesion->role == 1) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminuser')\">Administrar usuarios</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<h2><button class='cerrarsesionbtn' onclick=\"app.view('logoutindex')\">Cerrar sesión</button></h2>" : "";  ?>
        </ul>
</div>

   
        <!--<br><hr>-->

<div class="container-2">
    <h2 class="text-center text-light">Administración de <span class="badge badge-danger">Publicaciones</span></h2> 
</div> 

<div class="busquedaAdmin">
    <div class="row">
        <div class="col-lg-12">
            <input type="search" class="search-bar" name="search" id="search" placeholder="Buscar...">
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaPublicaciones" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Activa</th>
                            <th>Categoría</th>
                            <th>         </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>¿Qué es el calentamiento global?</td>
                            <td>13-04-2024</td>
                            <td>Sí</td>
                            <td>Medio Ambiente</td>
                            <td>
                                <div class="text-center">
                                    <div class="btn-group">
                                        <button type="button" class="btnEditar">Editar</button>
                                        <button type="button" class="btnEliminar">x</button>
                                    </div>
                                </div>
                            </td>

                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="buttonnew">
            <button id="btnNuevo" type="button" class="btn btn-success">Nuevo</button>
        </div>
    </div>
</div>
<div id="Sombreado"></div>

<?php 
    $scripts = ["app", "jquery"];
    main_footer(["scripts" => $scripts, $sesion]);
?>
</html>

<script type="text/javascript">
    $(function(){
        // Evento para eliminar usuario al hacer clic en el botón
        $(".btnEliminar").click(function() {
            //agregar la lógica para eliminar el usuario

            alert("Eliminar usuario"); // alerta
        });

        const lf = $("#publi-form");
        lf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("titulo",$("#titulo").val());
            data.append("contenido",$("#contenido").val());
            data.append("key",$("#key").val());
            data.append("tid",$("#tid").val());
            data.append("date",$("#date").val());
            data.append("_cp","");
            fetch(app.urls.createPost,{
                method : "POST",
                body : data
            })
            .then ( resp => resp.json())
            .then ( resp => {
                if(resp.r !== false){
                    alert("Se creo la publicacion")
                    $("#titulo").val(''); //Borra el campo de titulo
                    $("#contenido").val(''); //Borra el campo de contenido
                }else{
                    alert("No se pudo realizar la accion");
                }
            }).catch( err => console.error( err ))            
        })
    })
</script>
