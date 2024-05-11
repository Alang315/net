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
        openpost:"/post/openpost",
        people:"/user/get_people",
    },
    
    pp : $(".feed"), //Seccion para meter todos las publicaciones
	lp : $(".contenido"), //seccion para insertar el contenido
    tm : $(".temastab"),// select para tomar los temas
    tl : $(".temaslista"),
    rs : $(".reaccioning"),
    rs2 : $(".reaccioning2"),
    rp : $(".optionre"), 
    rt : $("#reaccionestab"),
    le : $(".MostrarlistaEMoji"),
    le2 : $(".MostrarlistaEMoji2"),
    ap: $(".Tbody"),
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
                        if(post.Active ==1)
                        html += `
                            <div class="publicacion pplg ${ primera ? `active` : `` } prevpost">
                                <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                    class="link-publi"> 
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
                                        ${post.Image?`
                                        <div class="image-publication">
                                            <img src="/images/${post.Image}" alt="Imagen de la publicación">
                                        </div>`
                                        :``}
                                        <div class="topic">
                                            <span>${post.topic}</span>
                                        </div>

                                    </div>
                                </a>

                                
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
                                            <img  height="40px" widgth="40px" src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
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
                            </div>
                                `;
                        }                    
                        primera = false;
                        this.pp.html(html);
                }
            }).catch( err => console.error( err ));
        }
    },

    openPost: function(event, pid, element){
        event.preventDefault();
        let i = 0;
        let posthtml = "<h2>La publicación no esta disponible</h2>";
        let comentaryhtml =  "";
        this.pp.html("");
        this.lp.html("");
        fetch(this.urls.openpost + "?_Op" + "&pid=" + pid)
			.then(response => response.json())
			.then(post => {
				if(post.length > 0){
                    posthtml = this.postHTMLstructure(post, 1);
                    for(let comemnts of post){
                        comentaryhtml += this.postHTMLstructure(post, 2, i);
                        i++;
                    }
                    comentaryhtml = comentaryhtml == "" ? "<h2>Los comentarios no estan disponibles o no hay en esta publicacion</h2>" : comentaryhtml
                }
                this.lp.html(comentaryhtml);
                this.pp.html(posthtml);
			}).catch(err => console.error(err));
    },

    postHTMLstructure : function (post, option = "", i = 0){
        //console.table(post);
        let PostStructure = "", CommentaryStructure = ""  
        
        if(option ==1 && post[0])
            PostStructure =  ` 
            <div class="publicacion pplg">
                <div class="publicacion-unidad">
                    <div class="username">
                        <small class="User">
                            <i class="bi bi-person-circle"></i>
                            <b>${ post[0].Username }</b>
                        </small>
                        <span class="fecha">
                            ${post[0].Date}
                        </span>
                    </div>    
                    <div class="titulo">
                        <span class="title">${post[0].Title}</span>  
                    </div>  
                    <div class="contenido">
                        <span>${post[0].Content}</span>
                    </div>
                    ${post[0].Image?`
                        <div class="image-publication">
                            <img src="/images/${post[0].Image}" alt="Imagen de la publicación"> 
                        </div>`
                    :``}
                    <div class="topic">
                        <span>${post[0].topic}</span>
                    </div>
                </div>
                <div class="publicacion-reaccion">
                    <div class="reacciones-container">
                        <select class="reaccionestab" name="reaccionestab" id="reaccionestab" onchange="app.getEmotes(${post[0].ID_publication}, this.selectedIndex, ${app.user.id})">
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
                            id="totalreaccion-${post[0].ID_publication}"
                            onmouseout="app.CerrarDivMostrarEmojis(document.querySelectorAll('#MostrarRDiv-${post[0].ID_publication}'))"
                            onmouseover="app.MotrarEmojis(${post[0].ID_publication}, document.querySelectorAll('#MostrarlistaEMoji-${post[0].ID_publication}'), document.querySelectorAll('#MostrarRDiv-${post[0].ID_publication}'))">
                            ${post[0].reacciones}
                        </label>
                        
                    </div>
                    <div class="comments-container">
                        <button name="vercomments" class="vercomments" value="" title="Ver comentarios de la publicación">
                        <img src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
                        </button>
                        <label for="iconocomment">${post[0].comments}</label>
                    </div>
                </div>
                <div class="pub-reaccion-span">
                    <span></span>
                </div> 
                <div class="MostrarReacciones" id="MostrarRDiv-${post[0].ID_publication}">
                    <ul id="MostrarlistaEMoji-${post[0].ID_publication}" class="MostrarlistaEMoji">
                        
                    </ul>
                </div>
            </div>
        `;  
    
    if(option == 2 &&  i >0)
        CommentaryStructure = `
                <div class="commentarrys">
                    <div>
                        <h3>${post[i].Username}</h3>  
                    </div>
                    <div>
                        <h3>${post[i].Date}</h3>
                    </div>
                    <div>
                        <p>${post[i].Content}</p>
                    </div>
                </div>
                <br>
            `;
        switch(option){
            case 1: return PostStructure; break;
            case 2: return CommentaryStructure; break;
        } 

    },

    getEmotes: function(pid, typer, user) {
        if(user == 0) {
            entravisit()
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
                            html += `<b>${app.emotes[i]}</b>`;
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
            let html = `<b>No hay ningún tema</b>`;
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

    getTopicslist: function() {
        if(this.tl) {
            let html = `<b>No hay ningún tema</b>`;
            this.tl.html("");
            fetch(this.urls.getTopics+ "?_gt")
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         for(let topic of ppresp){
                             html += `
                                    <li value="${topic.ID_topic}" onclick="app.filterPostsByTopic(${topic.ID_topic})">${topic.Name}</li>
                                `;
                            }
                        this.tl.html(html);
                    }
                }).catch( err => console.error( err ));
            }
    },

    filterPostsByTopic: function(topicId, active= "1") {
        if(this.pp) {
            let html = `<b>No hay publicaciones</b>`;
            this.pp.html("");
            fetch(this.urls.posts)
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                        html = "";
                        let primera = true;
                        let foundPost = false;
                        for(let post of ppresp){
                            if(post.ID_topic === topicId && post.Active == active) {
                                foundPost = true;
                                html += `
                                <div class="publicacion pplg ${ primera ? `active` : `` } prevpost">
                                    <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                        class="link-publi"> 
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
                                            ${post.Image?`
                                            <div class="image-publication">
                                                <img src="/images/${post.Image}" alt="Imagen de la publicación">
                                            </div>`
                                            :``}
                                            <div class="topic">
                                                <span>${post.topic}</span>
                                            </div>

                                        </div>
                                    </a>     
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
                                            <img  height="40px" widgth="40px" src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
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
                                </div>
                                `;
                            } 
                        }
                        if(!foundPost){
                            html = `
                                <div class="pub-reaccion-span">
                                    <span>No hay publicaciones con este tema</span>
                                </div> 
                            `;
                        }
                        this.pp.html(html);
                        
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

    Buscador: function() {
        const buscador = document.getElementById('search');
        if(buscador) {
            buscador.addEventListener('input', function(event) {
                event.preventDefault();
                let searchTerm = buscador.value;
                app.filterPostsBySearch(searchTerm);
            });        
        }
    },

    filterPostsBySearch: function(searchTerm) {
        if(this.pp) {
            let html = `<b>No hay publicaciones</b>`;
            this.pp.html("");
            fetch(this.urls.posts)
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                        html = "";
                        let foundPost = false;
                        let primera = true;
                        for(let post of ppresp){
                            if(post.Title.includes(searchTerm) || post.Content.includes(searchTerm) || post.Username.includes(searchTerm)) {
                                foundPost = true;
                                html += `
                                <div class="publicacion pplg ${ primera ? `active` : `` } prevpost">
                                    <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                        class="link-publi"> 
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
                                            ${post.Image?`
                                            <div class="image-publication">
                                                <img src="/images/${post.Image}" alt="Imagen de la publicación">
                                            </div>`
                                            :``}
                                            <div class="topic">
                                                <span>${post.topic}</span>
                                            </div>

                                        </div>
                                    </a>     
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
                                            <img  height="40px" widgth="40px" src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
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
                                </div>
                                `;
                            }
                        }
                        if(!foundPost){
                            html = `
                                <div class="pub-reaccion-span">
                                    <span>No se encontró tu busqueda</span>
                                </div> 
                            `;
                        }
                        this.pp.html(html);
                    }
                }).catch( err => console.error( err ));
        }
    },

    BuscadorPerfil: function(uid) {
        const buscador = document.getElementById('search2');
        if(buscador) {
            buscador.addEventListener('input', function(event) {
                event.preventDefault();
                let searchTerm = buscador.value;
                app.filterPostsBySearchPerfil(searchTerm, uid);
            });        
        }
    },

    filterPostsBySearchPerfil: function(searchTerm, uid) {
        if(this.pp) {
            let html = `<b>Hola</b>`;
            this.pp.html("");
            fetch(this.urls.userposts + "&uid=" + uid)
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){                     
                        html = "";
                        let foundPost = false;
                        for(let post of ppresp){
                            if(post.Title.includes(searchTerm) || post.Content.includes(searchTerm)) {
                                foundPost = true;
                                html += `
                                <div class="publicacion pplg ${ primera ? `active` : `` } prevpost">
                                    <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                        class="link-publi"> 
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
                                            ${post.Image?`
                                            <div class="image-publication">
                                                <img src="/images/${post.Image}" alt="Imagen de la publicación">
                                            </div>`
                                            :``}
                                            <div class="topic">
                                                <span>${post.topic}</span>
                                            </div>

                                        </div>
                                    </a>     
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
                                            <img  height="40px" widgth="40px" src="resources/img/bubble-chat-comment-conversation-mail-message-svgrepo-com.png" name="iconocomment"></img>
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
                                </div>
                                `;
                            }
                        }
                        if(!foundPost){
                            html = `
                                <div class="pub-reaccion-span">
                                    <span>No se encontró tu busqueda</span>
                                </div> 
                            `;
                        }
                        this.pp.html(html);
                    }
                }).catch( err => console.error( err ));
        }
    },
    

    newposttab: function() { 
        const detailsDiv = document.getElementById('divnewpost');
        const cerrartab = document.getElementById('cerrartabbtn');
        const btnAbrir = document.getElementById('crearpubicon');
        const Sombreado = document.getElementById('Sombreado');
        const tituloForm = document.getElementById('titulo');
        const ContenidoForm = document.getElementById('contenido');
        if (btnAbrir && detailsDiv) {
            btnAbrir.addEventListener('click', () => {
                detailsDiv.style.display = 'flex';
                Sombreado.style.display = 'flex';
            });
        
        };
        if(cerrartab) {
            cerrartab.addEventListener('click', (e) => {
                e.preventDefault();
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
                            html += `
                            <div class="publicacion pplg ${ primera ? `active` : `` } prevpost">
                                ${post.Active == 1 ?`
                                <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this)"
                                    class="link-publi">`: ``} 
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
                                        ${post.Image?`
                                        <div class="image-publication">
                                            <img src="/images/${post.Image}" alt="Imagen de la publicación">
                                        </div>`
                                        :``}
                                        <div class="topic">
                                            <span>${post.topic}</span>
                                        </div>
                                    </div>
                                    ${post.Active == 1?`
                                    <h3>Publi Aceptada</h3>`
                                    : `<h3>Publi Pendiente</h3>`}
                                    ${post.Active==1 ?`
                                </a>`:``}
                                    <div class="publicacion-reaccion">
                                        <div class="reacciones-container">
                                            <select class="reaccionestab" name="reaccionestab" id="reaccionestab" 
                                            onchange="app.getEmotes(${post.ID_publication}, this.selectedIndex, ${app.user.id})"
                                            onclick="return false;">
                                                <option class="optionre" value="0" disabled selected data-index="0">🤍</option>
                                                <option value="Me gusta">👍</option>
                                                <option value="Me enoja">😡</option>
                                                <option value="Me entistece">😭</option>
                                                <option value="Me asombra">😧</option>
                                                <option value="Me divierte">😄</option>
                                                <option value="Me encanta">💙</option>
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
                            </div>
                                
                            `;
              
                        }
                    }
                    primera = false;
                    this.pp.html(html);
                }).catch(err => console.error(err));
        }
    },

    getPostAdmin: function(active = "0"){
        if(this.ap){
            let html = `<b>No hay ningúna Publicacion</b>`;
            this.ap.html("");
            fetch(this.urls.posts)
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         for(let post of ppresp){
                            if(post.Active == active)
                             html += `
                            <tr>
                                <td>${post.ID_publication}</td>
                                <td>${post.Title}</td>
                                <td>${post.Date}</td>
                                ${post.Active ==1 ?` 
                                <td>Sí</td>`: `<td>NO</td>`}
                                <td>${post.topic}</td>
                                <td>
                                    <div class="text-center">
                                        <div class="btn-group">
                                            <button type="button" class="btnEditar">Revisar</button>
                                            ${post.Active == 1 ? `
                                            <button type="button" class="btnEliminar">Eliminar</button>
                                            `:`                                            
                                            <button type="button" class="btnEliminar">Rechazar</button>`}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                                `;
                            }
                    this.ap.html(html);
                    }
                }).catch( err => console.error( err ));
        }

    },

    getPeopleAdmin: function(){
        if(this.ap){
            let html = `<b>No hay ningún usuario</b>`;
            this.ap.html("");
            fetch(this.urls.people + "?_gu")
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         for(let user of ppresp){
                             html += `
                            <tr>
                                <td>${user.ID_user}</td>
                                <td>${user.Username}</td>
                                <td>${user.Email}</td>
                                <td>${user.Nposts}</td>
                                <td>
                                    <div class="text-center">
                                        <div class="btn-group">
                                            <button type="button" value ="${user.ID_user}" class="btnEliminar">Eliminar</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                                `;
                            }
                    this.ap.html(html);
                    }
                }).catch( err => console.error( err ));
        }
    }

   
}

app.toggleDetails(); //Abre la función antes de que cargue todo
app.getTopics();
app.getTopicslist();
app.newposttab();
app.Buscador();
app.BuscadorPerfil();