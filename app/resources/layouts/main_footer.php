<?php function main_footer($args = [], $sesion = null){
    if (isset($args['scripts'])) {
        foreach ($args['scripts'] as $s) {
            echo_script_js($s);
        }
    } ?>
     
</body>
</html>
    <footer>
        <!--<script src="resources/js/fun_script.js"></script>-->
        <script src="resources/js/app.js"></script>
    </footer>
<?php }?>