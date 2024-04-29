<?php
    $layouts = ["main_header", "main_footer", "main"];
    $styles = ["fonts", "style", "admin_user"];
    
    foreach ($layouts as $l) {
        require_layout($l);
    }
    
    main_header(["styles" => $styles], $sesion);

    date_default_timezone_set('America/Mexico_City');
    
?>
    <header>
        <h3 class="text-center text-light">GreenNet</h3>
        <h4 class="text-center text-light">Administracion de <span class="badge badge-danger">Usuarios</span></h4> 
    </header>

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <button id="btnNuevo" type="button" class="btn btn-success">Nuevo</button>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaPersonas" class="table table-striped table-bordered table-condensed"
                        style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Id</th>
                                <th>Nombre de usuario</th>
                                <th>Correo electrónico</th>
                                <th>Purikitaka si</th>
                                <th>Purikitaka no</th>
                            </tr>
                           </thead>
                        <tbody>
                               <tr>
                                <td>1</td>
                                <td>Karla</td>
                                <td>karlarmlp@gmail.com</td>
                                <td>takaraka tiki</td>
                                <td>takaraka tiki taka</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="Sombreado"></div>
</body>
<?php 
    $scripts = ["app", "jquery"];
    main_footer(["scripts" => $scripts, $sesion]);
?>
</html>

<script type="text/javascript">
    $(function(){
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