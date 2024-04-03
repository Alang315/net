<?php

function as_object($array) {
    return json_decode(json_encode($array));
}

function require_view($view, $sesion = null, $data = null) {
    require(ROOT . "resources/views/" . $view . ".php");
}

function require_layout($layout) {
    require(ROOT . "resources/layouts/" . $layout . ".php");
}

function echo_link_style($style) {
    echo "<link rel=\"stylesheet\" href=\"resources/css/$style.css\">";
}

function echo_script_js($script) {
    echo "<script src=\"/resources/js/$script.js\"></script>";
}
?>