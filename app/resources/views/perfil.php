<?php
    $layouts = ["perfil_header", "perfil_footer"];
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
            <li><button onclick="app.view('home')">Regresar a inicio</button></li>
            <li><button onclick="app.view('logoutperfil')">Cerrar sesion</button></li>
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
                            <input type="text" name="titulo" placeholder="Título" id="titulo">
                            <input hidden type="text" value="<?php echo isset($sesion->key) ? $sesion->key: null; ?>" name="key" id="key"> 
                            <input hidden type="text" value=" <?php echo date("d-m-Y h:i a"); ?>" name="date" id="date">
                            <input hidden type="text" value="1" name="tid" id="tid">
                            <textarea name="contenido" placeholder="Escribe tu idea..." id="contenido"></textarea>
                        </div>
                    </div>
                </form>
         

            <h3>MIS PUBLICACIONES</h3>
            <!--Ciclo para imprimir publicaciones-->
            <section class="feed">
            <?php /* foreach($publis as $p){ ?>
                <div class="publicacion">
                    <div class="publicacion-unidad">
                        <h2> <?php echo $p['Title']; ?> </h2>
                        
                        <div class="contenido"><p> <?php echo $p['Content'];?></p></div>
                        <h><?php echo $p['Date']; ?></h><br>
                    </div><br>
                    <div class="opciones-miperfil">
                        
                        <button id="Edit_Button" title="Editar publicación" onclick="openEdit(<?php echo $p['ID_publication']; ?>)">
                        <img src="/resources/img/edit-3-svgrepo-com.png"></button>
                        <div class="EditarDiv" id="EditDiv">
                            <form action="index.php" method="POST" class="EditForm">
                                    <div class="image-container">
                                        <span>Editar Post</span>
                                    </div>
                                    <div class="input-container">
                                        <input type="text" name="titulo" placeholder="Título" required value="<?php echo $p['Title']; ?>"> 
                                        <textarea name="contenido" placeholder="Escribe tu idea..." required><?php echo $p['Content']; ?>"</textarea> 
                                    </div>
                                    <div class="button-container">
                                        <button name="editB" value="" <?php echo $p["ID_publication"] ?> title="Editar publicación">Editar</button>
                                        <button type="button" id="CancelarButton_Edit" class="CancelarButton">Cancelar</button>
                                    </div>
                                    <input type="hidden" name="m" value="">
                            </form>
                        </div>

                        <form action="index.php" method="POST">
                            
                            <button id="Delete_Button" name="deleB" value= "<?php echo $p["ID_publication"] ?>" title="Eliminar publicación">
                            <img src="/resources/img/delete-2-svgrepo-com.png"></button>
                            <input type="hidden" name="m" value="deletePubli">
                        </form>
                        <button name="vercomments" class="vercomments" value="" title="Ver comentarios de la publicación">
                            <img src="/resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png"></img></button>
                    </div>
                </div>
            <?php } ?>
            ?>*/ ?>
            </section>
        </main>
        <!--Ciclo para imprimir comentarios-->
        <section class="comentarios">
            <!--
                <div class="publicacion-unidad">
                    <div class="contenido">
                    <h1>COMENTARIOS</h1><br>
                    <h2>Aquí se abre un panel con los comentarios de la publicación seleccionada</h2><br><br>
                    <h3>EJEMPLO DE COMENTARIO</h3><br>
                    <h3>En algún punto de mi vida comencé a cuestionarme el hecho de que tanto la familia como la sociedad en general, marcan un camino de por dónde deberías ir o cuáles deberían ser tus metas.</h3><br>
                    <h3>En lugar de intentar adoctrinar a las personas desde pequeñas y hacerles sentir mal por no ser el modelo "perfecto" que se desea; se debería inculcar el encontrar la felicidad.</h3><br>
                    <h3>No todos desean tener una gran empresa y estar entre ejecutivos, el sueño de toda mujer no es casarse y ser ama de casa, no a todas las personas les agrada la idea de vivir en la ciudad de por vida, y así hay varios ejemplos más.</h3><br>
                    </div>
                </div>
            -->
        </section>
    </div>
    <div id="Sombreado"></div>
</body>
<?php 
    $scripts = ["app", "jquery"];
    perfil_footer(["scripts" => $scripts, $sesion]);
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