<?php function perfil_footer($args = [], $sesion = null){ ?>
    <?php
    if (isset($args["scripts"])) {
        foreach ($args["scripts"] as $s) {
            echo_script_js($s);
        }
    }
    
    ?>
    <footer>
        <!--<script src="resources/js/fun_script.js"></script>-->
        <script src="resources/js/app.js"></script>
    </footer>
<?php } ?>