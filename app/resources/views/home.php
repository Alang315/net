<?php
$layouts = ["main_header", "main_footer", "main"];
$styles = ["style"];

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
            <?php echo isset($sesion->sv) ? "<li><button onclick=\"app.view('miperfil')\">Mi Perfil</button></li>" : "";?>
            <?php echo isset($sesion->sv) ? "<h2><button onclick=\"app.view('logoutindex')\">CERRAR SESION</button></h2>" : "";  ?>
        </ul>
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
            <h1>Holas</h1>
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
<?php scripts();?>
<?php main_footer(); ?>