<?php
$layouts = ["main_header", "main_footer", "main"];
$styles = ["fonts", "style"];

foreach ($layouts as $l) {
    require_layout($l);
}

main_header(["styles" => $styles],$sesion);
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
<div class="divNewpost" id="divnewpost">
    <form id="publi-form" method="post" class="form-publi">        
            <div class="mi-perfil">
                
                <div class="image-container">
                    <div class="cerrarbtn">
                        <button class="cancel" id="cerrartabbtn">X</button>
                    </div>
                    <div class="datos">
                        <span>Crear Post</span>
                        <img src= "/resources/img/perfil_img.jpg" alt="Imagen">
                        <button type="submit">Enviar</button> 
                    </div>
                </div>
                <!--Titulo y contenido de la nueva publicacion-->
                <div class="input-container">
                    <input type="text" name="titulo" placeholder="Título" id="titulo" required>
                    <input hidden type="text" value="<?php echo isset($sesion->key) ? $sesion->key: null; ?>" name="key" id="key"> 
                    <input hidden type="text" value=" <?php echo date("d-m-Y h:i a"); ?>" name="date" id="date">
                    <input hidden type="text" value="1" name="tid" id="tid">
                    <textarea name="contenido" placeholder="Escribe tu idea..." id="contenido" required></textarea>
                    <input type="file" id="imagen" name="imagen" class="publifile">
                    <select class="temastab" name="temastab" id="temastab" required>
                        <option value="Me gusta">Elige tu tema</option>
                    </select>
                </div>
            </div>
    </form>
</div>
<div class="app">
    <!-- PANEL IZQUIERDO -->
    <aside class="navegacion">
        <!--Mostrar temas-->
        <div class="temas">
            <h2>Temas</h2>
            <div class="temasopciones">
            <ul>
                <li>FIN DE LA POBREZA</li>
                <li>HAMBRE CERO</li>
                <li>SALUD Y BIENESTAR</li>
                <li>EDUCACIÓN DE CALIDAD</li>
                <li>IGUALDAD DE GÉNERO</li>
                <li>AGUA LIMPIA Y SANEAMIENTO</li>
                <li>ENERGÍA ASEQUIBLE Y NO CONTAMINANTE</li>
            </ul>
            </div>
        </div>
        <!--Buscador-->
        <div class="busqueda">
            <h2>¿Buscas algo?</h2>
            <input type="search" class="search-bar" name="search" id="search" placeholder="Escribe aquí...">
            <div class="populares">
            <h2>Popular</h2>
            <ul>
                <li>¿3ra guerra mundial 2024?</li>
                <li>La destrucción de la tierra</li>
                <li>MrBeast construye 100 pozos en África</li>
            </ul>
            </div>
        </div>
        <span class="copyright">Copyright 2024© GreenNet</span>
    </aside>
    <!-- PANEL CENTRAL -->
    <main class="publicaciones">
        <!--Panel para crear publicaciones-->
        <div class="publicacion-crear">
        
        </div>
        <!--Ciclo para imprimir publicaciones-->
        <section class="feed">
            <h1>PUBLICACIONES</h1>
        </section>
    </main>
    <!-- PANEL DERECHO -->
    <section class="comentarios">
        <div class="publicacion-unidad">
            <div class="contenido">

            </div>
        </div>
    </section>
</div>
<div id="Sombreado"></div>
</body>
<?php scripts();
$scripts = ["app", "jquery"];
main_footer(["scripts" => $scripts]);?>
<script type="text/javascript">
    $(function(){
        const lf = $("#publi-form");
        const select = $("#temastab");
        const Sombreado = $('#Sombreado');
        const divnewpost = $('#divnewpost');
        lf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("titulo",$("#titulo").val());
            data.append("contenido",$("#contenido").val());
            data.append("key",$("#key").val());
            data.append("date",$("#date").val());
            data.append("tid",$("#temastab").val());
            data.append("imagen", $("#imagen")[0].files[0]);
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
                    Sombreado.css('display', 'none');
                    divnewpost.css('display', 'none');
                }else{
                    alert("No se pudo realizar la accion");
                }
            }).catch( err => console.error( err ))            
        })
        select.click(function() { 
            
        });
        
        app.getTopics();
        // hacer variables js que se emparejen con las de php para poder enviarlas
        app.publications();
        //app.lastPost(1);
        app.user.sv = "<?=isset($sesion->sv) ?'true':'false'?>";

        app.user.id = "<?=isset($sesion->key) ? $sesion->key : 0 ?>";
    });
</script>
<?php main_footer(); ?>