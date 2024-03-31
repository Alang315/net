<?php function login_footer($args = []){ ?>
    <?php
    if (isset($args['scripts'])) {
        foreach ($args['scripts'] as $s) {
            echo_script_js($s);
        }
    }
    ?>
<?php } ?>