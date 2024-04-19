app = {

    urls: {
        home: "/",
        login: "/login",
        doregister: "/login/getdata_user",
        log_in: "/login/getdata_login",
        logoutindex: "/home/logout",
        logoutlogin: "/login/logout",
        posts: "post/getP?_pp",
        miperfil:"/perfil",
        logoutperfil: "/perfil/logout",
        createPost: "/post/get_Publidata",
    },

    pp : $(".feed"), //Seccion para meter todos las publicaciones
	//lp : $("#content"), //seccion para insertar el contenido

    likesValue : 0,
    dislikesValue : 0,
    hahasValue : 0,

    view: function(url){
        location.replace(this.urls[url])
    },

    publications : function(){
		let html = `<b>No hay publicaciones</b>`;
		this.pp.html("");
		fetch(this.urls.posts)
			 .then(resp => resp.json())
			 .then(ppresp => {
                if(ppresp.length > 0){
			 		html = "";
			 		let primera = true;
			 		for(let post of ppresp){
                   
                        console.log(post.Username);
			 			html += `
                                <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                    class="list-group-item list-group-item-action pplg ${ primera ? `active` : `` } prevpost"> 
                                    <div class="w-100 border-bottom">
                                        <h5 class="mb-1">${post.Title}</h5>
                                        <small class="text-muted blanco ${primera ? `text-light` : ``}">
                                            <i class="bi bi-calendar-week blanco ${primera ? `text-light` : ``}"
                                               ${primera ? `style="color:white;"` : ``}>
                                            </i> <span ${primera ? `style="color:white;"` : ``}
                                                       class="blanco ${primera ? `text-light` : ``}">${post.Date}</span>
                                        </small>
                                    </div>
                                    <small>
                                        <i class="bi bi-person-circle"></i>
                                        <b>${ post.Username }</b>
                                    </small>
                                </a>
                            `;
                        }
                        
                        primera = false;
                    this.pp.html(html);
                    let items = document.querySelectorAll('.pplg');
                    items.forEach(item => {
                        item.addEventListener('click', function(){
                            items.forEach(item => {
                                item.classList.remove('active');
                                let fecha = item.querySelector('.blanco');
                                fecha.classList.remove('text-light');
                                fecha.classList.add('text-muted');
                            });
                            this.classList.add('active');
                            let fecha = this.querySelector('.blanco');
                            fecha.classList.remove('text-muted');
                            fecha.classList.add('text-light');
                        });
                    });
                }
            }).catch( err => console.error( err ));
    },

    toggleDetails: function() { //Función para desplegar el detailsdiv (tab de usuario)
        window.onload = function() { //Para que abra en cuanto abra la página DOM
            const detailsDiv = document.getElementById('detailsDiv');
            const imgLogo = document.getElementById('perfil_Icono');
            if (imgLogo && detailsDiv) {
                imgLogo.addEventListener('click', () => { //Activar cuando haga click
                    let displayStyle = window.getComputedStyle(detailsDiv, null).display;
                    detailsDiv.style.display = (displayStyle === 'none') ? 'flex' : 'none';
                });
            }
        }
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
app.toggleDetails(); //Abre la función antes de que cargue todo
