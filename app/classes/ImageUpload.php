<?php

namespace app\classes;

class ImageUpload {
    static public function upload_image($campo) {
        if (isset($_FILES[$campo]) && $_FILES[$campo]["error"] == 0){
            $filename = $_FILES[$campo]["name"]; // Nombre del archivo
            $url_temp = $_FILES[$campo]["tmp_name"]; // Ruta temporal donde se carga el archivo
            // Utiliza exif_imagetype para verificar el tipo de imagen
            if (exif_imagetype($url_temp) !== false){
                if(self::check_image_size($url_temp)){
                    $url_insert = PUBLIC_DIRECTORY . "images"; // Carpeta donde se guardarán los archivos
                    $url_target = $url_insert . DS . $filename; // Ruta completa donde se guardará el archivo
                    if (move_uploaded_file($url_temp, $url_target)){
                        return $filename;
                    }
                }
            }
        }
        return null;
    }

    static private function check_image_size($url_temp, $max_size_mb = 10) {
        $file_size = filesize($url_temp);
        $max_size_bytes = $max_size_mb * 1024 * 1024; // Convertir MB a bytes
        return ($file_size <= $max_size_bytes);
    }
}

?>