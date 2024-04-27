<?php
    $layouts = ["perfil_header", "perfil_footer", "main"];
    $styles = ["fonts", "perfil"];
    
    foreach ($layouts as $l) {
        require_layout($l);
    }
    
    perfil_header(["styles" => $styles], $sesion);

    date_default_timezone_set('America/Mexico_City');
    
?>
<!--Panel del perfil-->
    <div id="detailsDiv">
        <b>GreenNet</b><br>
        <p class="nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : "" ?></p>
        <p class="email-perfil"><?php echo isset($sesion->email) ? $sesion->email : "" ?></p>
        <ul>
            <li><button class='miperfilbtn' onclick="app.view('home')">Regresar a inicio</button></li>
            <h2><button class='cerrarsesionbtn' onclick="app.view('logoutperfil')">Cerrar sesion</button></h2>
        </ul>
    </div>
    <div class="miperfil-arriba">
        <div class="mitad">
            <div class="foto-miperfil"><img src= "/resources/img/perfil.jpg" width="40%" alt="Foto de perfil"></div>
            <p class="nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : "" ?></p>
            <hr><br>
            <p class="email-perfil"><?php echo isset($sesion->email) ? $sesion->email : "" ?></p>
        </div>  
        <!--<br><hr>-->
    </div>
    <div class="app">
        <aside class="navegacion">
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
                        <li>TRABAJO DECENTE Y CRECIMIENTO ECONÓMICO</li>
                        <li>INDUSTRIA, INNOVACIÓN E INFRAESTRUCTURA</li>
                        <li>REDUCCIÓN DE LAS DESIGUALDADES</li>
                        <li>CIUDADES Y COMUNIDADES SOSTENIBLE</li>
                        <li>PRODUCCIÓN Y CONSUMO RESPONSABLE</li>
                        <li>ACCIÓN POR EL CLIMA</li>
                        <li>VIDA SUBMARINA</li>
                        <li>VIDA DE ECOSISTEMAS TERRESTRES</li>
                        <li>PAZ, JUSTICIA E INSTITUCIONES SÓLIDAS</li>
                        <li>ALIANZAS PARA LOGRAR LOS OBJETIVOS</li>
                        
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
        <!-- PUBLICACIONES -->
        <main class="publicaciones">
            <!--Panel para crear publicaciones-->
            <div class="publicacion-crear">
                <form id="publi-form" method="post">
                    <div class="mi-perfil">
                        <div class="image-container">
                            <span>Crear Post</span>
                            <img src= "/resources/img/perfil_img.jpg" alt="Imagen">
                            <button type="submit">Enviar</button> 
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
            <div class="feedmain">
            <h3>MIS PUBLICACIONES</h3>
            <!--Ciclo para imprimir publicaciones-->
            <section class="feed">
                
            </section>
            </div>
        </main>
        <!--Ciclo para imprimir comentarios-->
        <section class="comentarios">
            <div class="publicacion-unidad">
                <div class="contenido">

                </div>
            </div>
        </section>
    </div>
    <div id="Sombreado"></div>
</body>
<?php 
    $scripts = ["app", "jquery"];
    perfil_footer(["scripts" => $scripts, $sesion]);
   scripts();
?>
</html>

<script type="text/javascript">
    $(function(){
        const lf = $("#publi-form");
        const select = $("#temastab");
        lf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("titulo",$("#titulo").val());
            data.append("contenido",$("#contenido").val());
            data.append("key",$("#key").val());
            data.append("date",$("#date").val());
            data.append("tid",$("#temastab").val());
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
        app.user.sv = <?=$sesion->sv?'true':'false'?>;
        app.user.id = "<?=$sesion->key?>";
        // hacer variables js que se emparejen con las de php para poder enviarlas
        app.userPosts(app.user.id);
        select.click(function() { 
            
        });
        app.getTopics();
    })
</script>