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
        adminpublic: "/adminpublic",
        adminuser: "/adminuser",
        logoutperfil: "/perfil/logout",
        createPost: "/post/get_Publidata",
        userposts: "/post/get_user_P",
        getReactions:"/post/getEmotes",//llaves uid, pid, type, deben de llevar valores
        getEmotes:"/post/getEmotesResult",
    },
    
    pp : $(".feed"), //Seccion para meter todos las publicaciones
	//lp : $("#content"), //seccion para insertar el contenido
    tm : $(".temastab"),// select para tomar los temas
    rs : $(".reaccioning"),
    rs2 : $(".reaccioning2"),
    rp : $(".optionre"), 
    rt : $("#reaccionestab"),
    le : $(".MostrarlistaEMoji"),
    le2 : $(".MostrarlistaEMoji2"),
    isSelectClicked: false,
    
    emotes: {
        1: "👍",
        2: "😡",
        3: "😭",   
        4: "😧",   
        5: "😄", 
        6: "💙",   
    },

    user : {
        sv : false,
        id : 0,
    },

    //likesValue : 0,
    //dislikesValue : 0,
    //hahasValue : 0,

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
                                                <select class="reaccionestab" name="reaccionestab" id="reaccionestab" 
                                                onchange="app.getEmotes(${post.ID_publication}, this.selectedIndex, ${app.user.id})"
                                                onclick="return false;">
                                                    <option class="optionre" value="0" disabled selected data-index="0">🤍</option>
                                                    <option class="optionre" value="1" data-index="1">👍</option>
                                                    <option class="optionre" value="2" data-index="2">😡</option>
                                                    <option class="optionre" value="3" data-index="3">😭</option>
                                                    <option class="optionre" value="4" data-index="4">😧</option>
                                                    <option class="optionre" value="5" data-index="5">😄</option>
                                                    <option class="optionre" value="6" data-index="6">💙</option>
                                                </select>

                                                <label
                                                    for="reaccionestab" 
                                                    class="reaccioning"
                                                    id="totalreaccion-${post.ID_publication}"
                                                    onmouseout="app.CerrarDivMostrarEmojis(document.querySelectorAll('#MostrarRDiv-${post.ID_publication}'))"
                                                    onmouseover="app.MotrarEmojis(${post.ID_publication}, document.querySelectorAll('#MostrarlistaEMoji-${post.ID_publication}'), document.querySelectorAll('#MostrarRDiv-${post.ID_publication}'))">
                                                    ${post.reacciones}
                                                </label>
                                                
                                            </div>
                                            <div class="comments-container">
                                                <button name="vercomments" class="vercomments" value="" title="Ver comentarios de la publicación">
                                                <img src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
                                                </button>
                                                <label for="iconocomment">${post.comments}</label>
                                            </div>
                                        </div>
                                        <div class="pub-reaccion-span">
                                            <span></span>
                                        </div> 
                                        <div class="MostrarReacciones" id="MostrarRDiv-${post.ID_publication}">
                                            <ul id="MostrarlistaEMoji-${post.ID_publication}" class="MostrarlistaEMoji">
                                                
                                            </ul>
                                        </div>
                                    </a>
                                `;
                        }                    
                        primera = false;
                        this.pp.html(html);
                }
            }).catch( err => console.error( err ));
        }
    },

    openPost: function(){

    },

    getEmotes: function(pid, typer, user) {
        if(user == 0) {
            var respuesta = confirm("Debes iniciar sesión para reaccionar ¿Desea iniciar sesión?");
            if (respuesta) {
                app.view("login");
            } else {
                
            }
        } else {
            let html = `<b>0</b>`;
            console.log(pid);
            console.log(typer);
            console.log(user);
            this.rs.html("");
            fetch(this.urls.getReactions+ "?_ge"+"&pid="+pid+"&uid="+user+ "&type="+typer)
                    .then(resp => resp.json())
                    .then(ppresp => {
                    if(ppresp.length > 0){
                        console.log(ppresp);
                        let total = 0
                        html = "";
                        for(let reaccion of ppresp){
                            html += `<b>${reaccion.tt}</b>`;
                            total += reaccion.tt
                        }
                        this.rs2.html(html);
                        $(`#totalreaccion-${pid}`).html(total)
                    }
            }).catch( err => console.error( err ));
        }
        
    },
    
    MotrarEmojis: function(pid,le, div) {
        div[0].style.display = "flex";
        const totalReacciones = document.querySelectorAll('.reaccioning');
        
        totalReacciones.forEach((totalReaccion, index) => {
            fetch(this.urls.getEmotes+ "?_gE"+ "&pid=" + pid) 
                .then(resp => resp.json())
                .then((ppresp) => {                        
                    let html = '';
                    if (ppresp.length > 0) {
                        i = 1;
                        for(let reaccion of ppresp){
                            html += `<span>${app.emotes[i]}</span>`;
                            html += `<span>${reaccion.tt}</span>`;
                            i++;
                        }
                        for(let elemento of le) {
                        
                            elemento.innerHTML = html;
                        }
                    }
            }).catch(err => console.error(err));                
        });
    },
    CerrarDivMostrarEmojis: function(div) {
        // console.log(div);
        div[0].style.display = "none";
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

    newposttab: function() { 
        const detailsDiv = document.getElementById('divnewpost');
        const cerrartab = document.getElementById('cerrartabbtn');
        const btnAbrir = document.getElementById('crearpubicon');
        const Sombreado = document.getElementById('Sombreado');
        if (btnAbrir && detailsDiv) {
            btnAbrir.addEventListener('click', () => {
                detailsDiv.style.display = 'flex';
                Sombreado.style.display = 'flex';
            });
        
        };
        if(cerrartab) {
            cerrartab.addEventListener('click', () => {
                detailsDiv.style.display = 'none';
                Sombreado.style.display = 'none';
            });
        }
    
    },
    
    //Publicaciones para los usuarios
    userPosts: function(uid){
        if(this.pp) {
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
                                            <select class="reaccionestab" name="reaccionestab" id="reaccionestab" 
                                            onchange="app.getEmotes(${post.ID_publication}, this.selectedIndex, ${app.user.id})"
                                            onclick="return false;">
                                                <option class="optionre" value="0" disabled selected data-index="0">🤍</option>
                                                <option class="optionre" value="1" data-index="1">👍</option>
                                                <option class="optionre" value="2" data-index="2">😡</option>
                                                <option class="optionre" value="3" data-index="3">😭</option>
                                                <option class="optionre" value="4" data-index="4">😧</option>
                                                <option class="optionre" value="5" data-index="5">😄</option>
                                                <option class="optionre" value="6" data-index="6">💙</option>
                                            </select>

                                            <label
                                                for="reaccionestab" 
                                                class="reaccioning"
                                                id="totalreaccion-${post.ID_publication}"
                                                onmouseout="app.CerrarDivMostrarEmojis(document.querySelectorAll('#MostrarRDiv-${post.ID_publication}'))"
                                                onmouseover="app.MotrarEmojis(${post.ID_publication}, document.querySelectorAll('#MostrarlistaEMoji-${post.ID_publication}'), document.querySelectorAll('#MostrarRDiv-${post.ID_publication}'))">
                                                ${post.reacciones}
                                            </label>
                                            
                                        </div>
                                        <div class="comments-container">
                                            <button name="vercomments" class="vercomments" value="" title="Ver comentarios de la publicación">
                                            <img src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
                                            <label for="iconocomment">${post.comments}</label>
                                        </div>
                                    </div>
                                    <div class="pub-reaccion-span">
                                        <span></span>
                                    </div> 
                                    <div class="MostrarReacciones" id="MostrarRDiv-${post.ID_publication}">
                                        <ul id="MostrarlistaEMoji-${post.ID_publication}" class="MostrarlistaEMoji">
                                            
                                        </ul>
                                    </div>
                                </a>
                            `;
                
                        }
                    }
                    primera = false;
                    this.pp.html(html);
                }).catch(err => console.error(err));
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
app.getTopics();
app.newposttab();