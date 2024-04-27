app = {

    urls: {
        home: "/",
        login: "/login",
        doregister: "/login/getdata_user",
        log_in: "/login/getdata_login",
        logoutindex: "/home/logout",
        logoutlogin: "/login/logout",
        posts: "post/getP?_pp",
        getTopics: "post/getT",
        miperfil:"/perfil",
        logoutperfil: "/perfil/logout",
        createPost: "/post/get_Publidata",
        userposts: "/post/get_user_P"
    },
    
    pp : $(".feed"), //Seccion para meter todos las publicaciones
	//lp : $("#content"), //seccion para insertar el contenido
    tm : $(".temastab"),// select para tomar los temas

    
    user : {
        sv : false,
        id : 0,
    },

    likesValue : 0,
    dislikesValue : 0,
    hahasValue : 0,

    view: function(url){
        location.replace(this.urls[url])
    },

    publications : function(){
        if(this.pp) {
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
                                    class="publicacion pplg ${ primera ? `active` : `` } prevpost"> 
                                    <div class="publicacion-unidad">
                                        <div class="username">
                                            <small class="User">
                                                <i class="bi bi-person-circle"></i>
                                                <b>${ post.Username }</b>
                                            </small>
                                            <span class="fecha">
                                                ${post.Date}
                                            </span>
                                        </div>    
                                        <div class="titulo">
                                            <span class="title">${post.Title}</span>  
                                        </div>  
                                        <div class="contenido">
                                            <span>${post.Content}</span>
                                        </div>
                                        <div class="topic">
                                            <span>${post.topic}</span>
                                        </div>
                                    </div>
                                    <div class="publicacion-reaccion">
                                        <div class="reacciones-container">
                                            <select class="reaccionestab" name="reaccionestab" id="reaccionestab">
                                                <option value="" selected>✔️</option>
                                                <option value="Me gusta">👍</option>
                                                <option value="Me enoja">😡</option>
                                                <option value="Me entistece">😭</option>
                                                <option value="Me asombra">😧</option>
                                                <option value="Me divierte">😄</option>
                                                <option value="Me encanta">💙</option>
                                            </select>
                                            <label for="reaccionestab">${post.reacciones}</label>
                                        </div>
                                        <div class="comments-container">
                                            <button name="vercomments" class="vercomments" value="" title="Ver comentarios de la publicación">
                                            <img src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
                                            <label for="iconocomment">${post.comments}</label>
                                        </div>
                                    </div>
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
        }
    },
    
    getTopics: function() {
        if(this.tm) {
            let html = `<b>No hay temas</b>`;
            this.tm.html("");
            fetch(this.urls.getTopics+ "?_gt")
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         let primera = true;
                         for(let topic of ppresp){
                             html += `
                                    <option value="${topic.ID_topic}">${topic.Name}</option>
                                `;
                            }
                            primera = false;
                        this.tm.html(html);
                    }
                }).catch( err => console.error( err ));
            }
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
    
    //Publicaciones para los usuarios
    userPosts: function(uid){
        let html = "<h2>Aún no hay publicaciones</h2>";
        this.pp.html("");
        fetch(this.urls.userposts + "&uid=" + uid)
			.then(response => response.json())
			.then(lpresp => {
				if(lpresp.length > 0){
					html = "";
			 		let primera = true;
			 		for(let post of lpresp){
                        console.log(post.Username);
			 			html += `
                                <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                    class="publicacion pplg ${ primera ? `active` : `` } prevpost"> 
                                    <div class="publicacion-unidad">
                                        <div class="username">
                                            <small class="User">
                                                <i class="bi bi-person-circle"></i>
                                                <b>${ post.Username }</b>
                                            </small>
                                            <span class="fecha">
                                                ${post.Date}
                                            </span>
                                        </div>    
                                        <div class="titulo">
                                            <span class="title">${post.Title}</span>  
                                        </div>  
                                        <div class="contenido">
                                            <span>${post.Content}</span>
                                        </div>
                                        <div class="topic">
                                            <span>${post.topic}</span>
                                        </div>
                                    </div>
                                    <div class="publicacion-reaccion">
                                        <div class="reacciones-container">
                                            <select class="reaccionestab" name="reaccionestab" id="reaccionestab">
                                                <option value="" selected>✔️</option>
                                                <option value="Me gusta">👍</option>
                                                <option value="Me enoja">😡</option>
                                                <option value="Me entistece">😭</option>
                                                <option value="Me asombra">😧</option>
                                                <option value="Me divierte">😄</option>
                                                <option value="Me encanta">💙</option>
                                            </select>
                                            <label for="reaccionestab">${post.reacciones}</label>
                                        </div>
                                        <div class="comments-container">
                                            <button name="vercomments" class="vercomments" value="" title="Ver comentarios de la publicación">
                                            <img src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
                                            <label for="iconocomment">${post.comments}</label>
                                        </div>
                                    </div>
                                </a>
                            `;
              
                        }
                }
                primera = false;
                this.pp.html(html);
			}).catch(err => console.error(err));
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
