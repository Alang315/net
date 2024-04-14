<?php function perfil_footer($args = [], $sesion = null){ ?>
    <?php
    if (isset($args["scripts"])) {
        foreach ($args["scripts"] as $s) {
            echo_script_js($s);
        }
    }
    ?>
<?php } ?>