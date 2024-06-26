<?php

    $layouts = ["admin_header", "main_footer", "main"];
    $styles = ["fonts", "style", "admin_public"];
    
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
            <?php echo isset($sesion->sv) ? "<li><button class='miperfilbtn' onclick=\"app.view('adminuser')\">Administrar usuarios</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<li><button class='miperfilbtn' onclick=\"app.view('temas')\">Temas</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<h2><button class='cerrarsesionbtn' onclick=\"app.view('logoutindex')\">Cerrar sesión</button></h2>" : "";  ?>
        </ul>
</div>

   
        <!--<br><hr>-->

<div class="container-2">
    <h2 class="text-center text-light">Administración de <span class="badge badge-danger">Publicaciones</span></h2> 
</div> 

<!--Buscador-->
<div class="busqueda-admin">
    <div class="row-buscar">
        <div class="col-lg-12">
            <input type="search" class="search-bar" name="search" id="search5" placeholder="Buscar...">
        </div>
    </div>
</div>
<div class="change text-center">
    <button class="btn-changeA" id="changeA">Ver publicaciones activas</button>
    <button class="btn-changeI" id="changeI">Ver publicaciones Inactivas</button>
</div>

<div class="container">
    <div class="row-table">
        <div class="col-lg-12">
            <div class="table-responsive"> <!--Contenedor de la tabla-->
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
                    <tbody class="Tbody">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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

<div id="revisar" class="container-revisar">
    <div class="objetosVistaPrevia">
        <div class="PublicacionesDentro">
            <div class="feed"></div>
        </div>
        <div class="change text-center" id="text-center">
            <div class="btnRegresar-openView">
                
            </div>
        </div>
    </div>
</div>

<div id="Sombreado"></div>

<?php 
    $scripts = ["app", "jquery", "sweetalert"];
    main_footer(["scripts" => $scripts, $sesion]);
?>
</html>

<script type="text/javascript">
    $(function(){
        // Evento para eliminar usuario al hacer clic en el botón
        $("#changeA").click(function() {
            //agregar la lógica para eliminar el usuario
            app.getPostAdmin("1")
        });

        $("#changeI").click(function() {
            //agregar la lógica para eliminar el usuario
            app.getPostAdmin("0")
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
    app.getPostAdmin()
</script>
