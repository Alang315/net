/* Confirmar que se ha creado el usuario*/
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

/* Confirmar que se ha creado la publicación */
function publicreada(){
    Swal.fire({ 
        icon: "success",
        title: "Se ha creado la publicación",
        showConfirmButton: false,
        timer: 1000
    });
}

/* Avisar que no se creó la publicación */
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

/* Invitar al visitante a iniciar sesión */
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

/* Cuestionar al Admin si desea eliminar a un usuario seleccionado */
function deleteuser(){
    Swal.fire({
        icon:"info",
        title: "¿Está seguro de eliminar a este usuario?",
        text: "Una vez eliminado no podrá revertir esta acción",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `No eliminar`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("¡Usuario eliminado!", "", "success");
        } /*else if (result.isDenied) {
            Swal.fire("Usuario no eliminado", "", "info");
        }*/
    });
}

/* Cuestionar al Admin si desea eliminar una publicación activa */
function deletepubli(){
    Swal.fire({
        icon:"info",
        title: "¿Está seguro de eliminar esta publicación?",
        text: "Una vez eliminada no podrá revertir esta acción",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("¡Publicación eliminada!", "", "success");
        }
    });
}

/* Confirm para cuando rechaza una publicación */
function declinepost(){
    Swal.fire({
        icon:"question",
        title: "Rechazar publicación",
        text: "Al rechazar una publicación esta se elimina y no podrá revertir esta acción",
        showCancelButton: true,
        confirmButtonText: "Rechazar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("¡Publicación rechazada!", "", "success");
        }
    });
}

/* Confirm para cuando el administrador acepte una publicación */
function aceptarpost(){
    Swal.fire({
        icon:"question",
        title: "Aceptar publicación",
        text: "Al aceptar esta publicación esta será publicada, si desea eliminarla más tarde, puede hacerlo desde el panel de publicaciones activas",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("¡Publicación aceptada y publicada!", "", "success");
        }
    });
}

/* Eliminar tema */
function deleteTopic(){
    swal.fire({
        icon:"question",
        title:"Eliminar Tema",
        text:"¿Desea eliminar este tema?, no podrá revertir esta acción",
        showCancelButton: true,
        confirmButtonText: "Eliminar tema",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("¡Tema eliminado!", "", "success");
        }
    });
}