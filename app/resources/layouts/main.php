<?php 
function head($session = null){?>
    <!--Se insertan los mains aqui para mandarlos a llamar-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start</title>
</head>
<body>
    <h1>GreenNet</h1>
    <button onclick="app.view('login')">Ir al login</button>
    <button onclick="app.view('register')">Ir a registrarse</button>
</body>

<?php } ?>

<?php 
function scripts($script = ""){?>
<!---Se mandan a llamar todos los scripts generales desde acá--->
    <script src="/resources/js/jquery.js"></script>
    <script src="/resources/js/app.js"></script>

    <?php
    if($script != ''){
        echo '<script src="/resources/js/'.$script.'.js"></script>';
    }
    ?>
    
<?php } ?>