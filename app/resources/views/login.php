<?php 
    $layouts = ["login_footer", "login_header", "main"];
    foreach($layouts as $ly){
        require_layout($ly);
    }
    $styles = ["login", "fonts"];
    login_header(["styles" => $styles]);
?>
<body>
    <img class="fondo-login" src="resources/img/mundo.jpeg">
    <div class="flecha">
        <button onclick="app.view('home')">< Regresar</button>
    </div>
    <?php 
    if(isset($_GET['error'])) {
    ?>
    <div class="error-panel inactive">
        <h2 class="message-error">
            <?php echo $_GET['error'] ?>
        </h2>
    </div>
    <?php } ?>
    <div class="container" id="container">
        <div class="form-container sign-up">
            <form action="index.php" method="post" id="register-form">
                <h1><b>GreenNet</b></h1>
                <br><b><h3><i>Gritos silenciosos</i></h3></b><br>
                <h1>Crear una cuenta</h1>
                <input type="text" placeholder="Nombre" name="name" required id="name">
                <input type="email" placeholder="Correo" name="email" required id="email">
                <input type="password" placeholder="Contraseña" name="pass" required minlength="6" id="pass">
                <div class="datosincorrectos" id="errordivre">
                    <span>Este usuario ya ha sido registrado</span>
                </div>
                <button type="submit" title="Registrarse">Registrarse</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form action="index.php" method="post" id="login-form">
                <h1><b>GreenNet</b></h1>
                <br><b><h3><i>Gritos silenciosos</i></h3></b><br>
                <h1>Iniciar sesión</h1>
                <input type="email" placeholder="Correo" name="mail" id="mail" required>
                <input type="password" placeholder="Contraseña" name="passw" id="passw" required minlength="6">
                <div class="datosincorrectos2" id="errordivlo">
                    <span>Error al iniciar sesión</span>
                </div>
                <button type="submit" title="Entrar">Iniciar sesión</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <img width="40%" src="resources/img/logo_ODS.png" title="RedNet" alt="logo de GreenNet">
                    <h1>¡Bienvenido de nuevo!</h1>
                    <p>Inicia sesión para utilizar todas las funciones del sitio</p>
                    <button class="hidden" id="login" title="Entrar">Iniciar sesión</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <img width="40%" src="resources/img/logo_ODS.png" title="RedNet" alt="logo de GreenNet">
                    <h1>¡Hola amigo!</h1>
                    <p>Regístrate con tu correo para utilizar todas las funciones del sitio</p>
                    <button class="hidden" id="register" title="Registrarse">Registrarse</button>
                </div>
            </div>
        </div>
    </div>
</body>
<?php
    $scripts = ["login_script", "jquery", "sweetalert"];
    login_footer(["scripts" => $scripts]); 
    scripts();
?>

<script type="text/javascript">
    $(function(){
        const rf = $("#register-form");
        const errordiv = $("#errordivre");
        rf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("name",$("#name").val());
            data.append("email",$("#email").val());
            data.append("pass",$("#pass").val());
            data.append("_register","");
            fetch(app.urls.doregister,{
                method : "POST",
                body : data
            })
            .then ( resp => resp.json())
            .then ( resp => {
                if(resp.r !== false){
                    usercreado()
                    errordiv.css('display', 'none');
                    $("#name").val('');
                    $("#email").val('');
                    $("#pass").val('');
                    
                }else{
                    errordiv.css('display', 'flex');
                    $("#email").val('');
                    $("#pass").val('');
                    //alert(resp.m);
                }
            }).catch( err => console.error( err ))            
        })
    })

</script>

<script type="text/javascript">
    $(function(){
        const lf = $("#login-form");
        const errordiv = $("#errordivlo");
        lf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("passw",$("#passw").val());
            data.append("mail",$("#mail").val());
            data.append("_login","");
            fetch(app.urls.log_in,{
                method : "POST",
                body : data
            })
            .then ( resp => resp.json())
            .then ( resp => {
                if(resp.r !== false){        
                    $("#mail").val('');
                    $("#passw").val('');
                    errordiv.css('display', 'none');
                    app.view("home")
                }else{
                    //alert("No se pudo realizar la accion");
                    errordiv.css('display', 'flex');
                    $("#email").val('');
                    $("#pass").val('');
                }
            }).catch( err => console.error( err ))            
        })
    })
</script>

</html>