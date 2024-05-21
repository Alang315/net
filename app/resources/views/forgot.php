<?php 
    $layouts = ["forgot_footer", "forgot_header", "main"];
    foreach($layouts as $ly){
        require_layout($ly);
    }
    $styles = ["forgot", "fonts"];
    forgot_header(["styles" => $styles]);

    $mode = $data['mode'];
    $error = $data['error'];

?>
<body>
    <?php switch($mode){
        case 'enter_mail':
            ?>
                <div class="container" id="container">
                    <div class="form-container">
                        <form id="forgot-form" method="post">
                            <h1><b>GreenNet</b></h1>
                            <br><b><h3><i>Gritos silenciosos</i></h3></b><br>
                            <h1>Recuperar contraseña</h1>
                            <br>
                            <input type="email" placeholder="Ingresa tu correo" name="email" required><br>
                            <span style="font-size: 12px; color:red;">
                            <?php
                                foreach($error as $err)
                                    echo $err . "<br>";
                            ?>
                            </span>
                            <input type="hidden" name="mode" value="enter_mail">
                            <input type="submit" value="Continuar">
                            <div><?php echo '<a class="unirsebtn" href="./login">Volver al login</a>'?></div>
                        </form>
                    </div>
                </div>
            <?php
            break;

        case 'enter_code':
            ?>
                <div class="container" id="container">
                    <div class="form-container">
                        <form id="forgot-form" method="post">
                            <h1><b>GreenNet</b></h1>
                            <br><b><h3><i>Gritos silenciosos</i></h3></b><br>
                            <h1>Recuperar contraseña</h1>
                            <br>
                            <input type="text" placeholder="Ingresa el código" name="code" required><br>
                            <span style="font-size: 12px; color:red;">
                            <?php
                                foreach($error as $err)
                                    echo $err . "<br>";
                            ?>
                            </span>
                            <input type="hidden" name="mode" value="enter_code">
                            <input type="submit" value="Continuar">
                            <div style="text-align: center;">
                                <?php echo '<a class="unirsebtn" href="./forgot">
                                    <input type="button" value="Regresar">
                                </a>'?>
                            </div>
                            <div style="text-align: center;">
                                <?php echo '<a class="unirsebtn" href="./login">Volver al login</a>'?>
                            </div>
                        </form>
                    </div>
                </div>
            <?php
            break;

        case 'enter_password':
            ?>
                <div class="container" id="container">
                    <div class="form-container">
                        <form id="forgot-form" method="post">
                            <h1><b>GreenNet</b></h1>
                            <br><b><h3><i>Gritos silenciosos</i></h3></b><br>
                            <h1>Recuperar contraseña</h1>
                            <br>
                            <input type="text" placeholder="Nueva contraseña" name="password" required><br>
                            <input type="text" placeholder="Confirma la nueva contraseña" name="password2" required><br>
                            <span style="font-size: 12px; color:red;">
                            <?php
                                foreach($error as $err)
                                    echo $err . "<br>";
                            ?>
                            </span>
                            <input type="hidden" name="mode" value="enter_password">
                            <input type="submit" value="Guardar">
                            <div style="text-align: center;">
                                <?php echo '<a class="unirsebtn" href="./forgot">
                                    <input type="button" value="Regresar">
                                </a>'?>
                            </div>
                        </form>
                    </div>
                </div>
            <?php
            break;

        default:
            break;
    } ?>

</body>
<?php 
    $scripts = ["forgot_script"];
    forgot_footer(["scripts" => $scripts]); 
    scripts();
?>
</html>