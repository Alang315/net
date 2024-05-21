<?php function forgot_footer($args = []){ 
    
    if (isset($args['scripts'])) {
        foreach ($args['scripts'] as $s) {
            echo_script_js($s);
        }
    }
    
} ?>