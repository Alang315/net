function usercreado(){
    Swal.fire({
        title: "¡Usuario creado!",
        icon: "success",
        confirmButtonText: "Continuar"
    }).then((result) => {
        if (result.isConfirmed) {
            app.view("login");
        }
    });
}

function publicreada(){
    Swal.fire({
                       
        icon: "success",
        title: "Se ha creado la publicación",
        showConfirmButton: false,
        timer: 1500
    });
}

function nocreada(){
    Swal.fire({
        title: "¡No se pudo crear la publicación!",
        icon: "error",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            history.back(-1)
        }
    });
}

function entravisit(){
    Swal.fire({
        title: "¡Inicia sesión para interactuar!",
        imageUrl: "/resources/img/logo.png",
        imageWidth: 200,
        //imageHeight: 200,
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            app.view("login");
        }
    });
}