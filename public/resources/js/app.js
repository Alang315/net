app = {

    urls: {
        home: "/",
        login: "/login",
        doregister: "/login/getdata_user",
        log_in: "/login/getdata_login",
        logoutindex: "/home/logout",
        logoutlogin: "/login/logout"
    },

    view: function(url){
        location.replace(this.urls[url])
    },

    /*fetchInsert: function(id_form, fields, passwdiname1, passwdname2, key) {
        const rf = $(id_form);
        rf.on("submit", function(e) {
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            fields.forEach(field => {
                data.append(field.name, $("#" + field.name).val());
            });
            if ($("#" + passwdiname1).val() === $("#" + passwdname2).val()) {
                data.append("", controller);
                fetch(app.routes.doregister, {
                        method: "POST",
                        body: data
                    })
                    .then(resp => resp.json())
                    .then(resp => {
                        if (resp.r !== false) {
                            app.view("inisession");
                        } else {
                            $("#error").removeClass("d-none");
                        }
                    }).catch(err => console.error(err));
            } else {
                alert("Las contraseñas no coinciden.")
            }
        })
    }
*/
}
