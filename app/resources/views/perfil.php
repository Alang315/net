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
                    <input hidden type="text" value="<?php echo isset($sesion->key) && $sesion->key == 1 ? $sesion->key : 0?>" id="state" name="state">
                    <textarea name="contenido" placeholder="Escribe tu idea..." id="contenido" required></textarea>
                    <input type="file" id="imagen" name="imagen" class="publifile">
                    <select class="temastab" name="temastab" id="temastab" required>
                        <option value="Me gusta">Elige tu tema</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="divEditPost" id="divEditPost">
        <form id="edit-publi-form" method="post" class="form-publi">        
            <div class="mi-perfil">
                <div class="image-container">
                    <div class="cerrarbtn">
                        <button class="cancel" id="btnCerrarEdit">X</button>
                    </div>
                    <div class="datos">
                        <span>Editar Post</span>
                        <img src= "/resources/img/perfil_img.jpg" alt="Imagen">
                        <button type="submit">Guardar</button> 
                    </div>
                </div>
                <!--Titulo y contenido de la nueva publicacion-->
                <div class="input-container">
                    <input type="hidden" name="idPost" id="idPostEdit" value="">
                    <input type="text" name="newTitulo" id="newTitulo" placeholder="Título" required>
                    <textarea name="newContenido" id="newContenido" placeholder="Escribe tu idea..." required></textarea>
                    <input type="file" name="newImagen" id="newImagen" class="publifile">
                    <select class="temastab" name="newTemastab" id="edit-temastab" required>
                        <option value="Me gusta">Elige tu tema</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="miperfil-arriba">
        <div class="mitad">
            <div class="text">
                <div class="imgxd">
                    <img src= "/resources/img/perfil.jpg" alt="Foto de perfil">
                    <br>
                </div>
                <div class="textopro">
                    <div class="textarriba">
                        <br>
                        <p class="nombre-perfil"><?php echo isset($sesion->user) ? $sesion->user : "" ?></p>
                    </div>
                    <hr></hr>
                    <div class="textabajo">
                        <br>
                        <p class="email-perfil"><?php echo isset($sesion->email) ? $sesion->email : "" ?></p>
                    </div>
                </div>
            </div>
        </div>  
        <!--<br><hr>-->
    </div>
    <div class="app">
        <aside class="navegacion">
                <div class="temas">
                    <h2>Temas</h2>
                    <div class="temasopciones">
                    <ul class="temaslista">
                        
                        
                    </ul>
                    </div>
                </div>
                <!--Buscador-->
                <div class="busqueda">
                    <h2>¿Buscas algo?</h2>
                    <input type="search" class="search-bar" name="search" id="search2" placeholder="Escribe aquí...">
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
                <form id="publi-formUser" method="post">
                    <div class="mi-perfil">
                        <div class="image-container">
                            <span>Crear Post</span>
                            <img src= "/resources/img/perfil_img.jpg" alt="Imagen">
                            <button type="submit">Enviar</button> 
                        </div>
                        <!--Titulo y contenido de la nueva publicacion-->
                        <div class="input-container">
                            <input type="text" name="titulo" placeholder="Título" id="titulo2" required>
                            <input hidden type="text" value="<?php echo isset($sesion->key) ? $sesion->key: null; ?>" name="key" id="key2"> 
                            <input hidden type="text" value=" <?php echo date("d-m-Y h:i a"); ?>" name="date" id="date2">
                            <input hidden type="text" value="<?php echo isset($sesion->key) && $sesion->key == 1 ? $sesion->key : 0?>" id="state" name="state">
                            <textarea name="contenido" placeholder="Escribe tu idea..." id="contenido2" required></textarea>
                            <input type="file" id="imagen2" name="imagen2" class="publifile">
                            <select class="temastab" name="temastab" id="temastab2" required>
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
                <div class="contenidoComen"></div>
            </div>
        </section>
    </div>
    <div id="Sombreado"></div>
</body>
<?php 
    $scripts = ["app", "jquery", "sweetalert"];
    perfil_footer(["scripts" => $scripts, $sesion]);
   scripts();
?>
</html>

<script type="text/javascript">
    app.user.sv = <?=$sesion->sv?'true':'false'?>;
    app.user.id = "<?=$sesion->key?>";
    app.user.name = "<?=$sesion->user?>";
    // hacer variables js que se emparejen con las de php para poder enviarlas

    $(function(){
        const lf = $("#publi-form");
        const uf = $("#publi-formUser");
        const ef = $("#edit-publi-form");
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
            data.append("state",$("#state").val());
            data.append("imagen", $("#imagen")[0].files[0]);
            data.append("_cp","");
            fetch(app.urls.createPost,{
                method : "POST",
                body : data
            })
            .then ( resp => resp.json())
            .then ( resp => {
                if(resp.r !== false){
                    publicreada() //alert que dice que se ha creado la publicación
                    $("#titulo").val(''); //Borra el campo de titulo
                    $("#contenido").val(''); //Borra el campo de contenido
                    Sombreado.css('display', 'none');
                    divnewpost.css('display', 'none');
                    app.userPosts(app.user.id)
                }else{
                    //nocreada() //alert que dice que no se pudo crear la publicación
                }
            }).catch( err => console.error( err ))            
        })
        uf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("titulo",$("#titulo2").val());
            data.append("contenido",$("#contenido2").val());
            data.append("key",$("#key2").val());
            data.append("date",$("#date2").val());
            data.append("tid",$("#temastab2").val());
            data.append("state",$("#state").val());
            data.append("imagen", $("#imagen2")[0].files[0]);
            data.append("_cp","");
            fetch(app.urls.createPost,{
                method : "POST",
                body : data
            })
            .then ( resp => resp.json())
            .then ( resp => {
                if(resp.r !== false){
                    publicreada() //alert que dice que se ha creado la publicación
                    $("#titulo2").val(''); //Borra el campo de titulo
                    $("#contenido2").val(''); //Borra el campo de contenido
                    app.userPosts(app.user.id)
                }else{
                    //nocreada() //alert que dice que no se pudo crear la publicación
                }
            }).catch( err => console.error( err ))            
        })
        app.userPosts(app.user.id);
        app.BuscadorPerfil(app.user.id);
        app.getTopicslistUser(app.user.id);
        select.click(function() { 
            
        });
        ef.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("idPost",$("#idPostEdit").val());
            data.append("titulo",$("#newTitulo").val());
            data.append("contenido",$("#newContenido").val());
            data.append("tid",$("#edit-temastab").val());
            data.append("imagen", $("#newImagen")[0].files[0]);
            data.append("_ep","");
            fetch(app.urls.editPost,{
                method : "POST",
                body : data
            })
            .then(res => res.json())
            .then(data => {
                if(data){
                    app.userPosts(app.user.id)
                }
            })
            document.getElementById("divEditPost").style.display = 'none'
            document.getElementById('Sombreado').style.display = 'none'
        });
        app.getTopics();
        app.cerrarEditPost();
    })
</script>