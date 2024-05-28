app = {

    urls: {
        home: "/",
        login: "/login",
        doregister: "/login/getdata_user",
        log_in: "/login/getdata_login",
        logoutindex: "/home/logout",
        logoutlogin: "/login/logout",
        posts: "post/getP?_pp",
        mejorposts: "post/getPublis",
        getTopics: "post/getT",
        createTopic: "temas/filterdata_createTopic",
        deleteTopic: "temas/filterdata_deleteTopic",
        getTopicById: "temas/filterdata_getTopicById",
        editTopic: "temas/filterdata_editTopic",
        miperfil:"/perfil",
        adminpublic: "/adminpublic",
        adminuser: "/adminuser",
        logoutperfil: "/perfil/logout",
        createPost: "/post/get_Publidata",
        createComment: "post/get_Comments?_cc",
        editPost: "/post/edit_post_data",
        userposts: "/post/get_user_P",
        getReactions:"/post/getEmotes",//llaves uid, pid, type, deben de llevar valores
        getEmotes:"/post/getEmotesResult",
        openpost:"/post/openpost",
        people:"/user/get_people",
        temas: "/temas",
        deleteUser: "/user/DU",
        deletePubli: "/post/DP",
        activePost: "/post/Ac",
    },
    
    pp : $(".feed"), //Seccion para meter todos las publicaciones
	  lp : $(".contenido"), //seccion para insertar el contenido
      lpu : $(".contenidoComen"),
    tm : $(".temastab"),// select para tomar los temas
    tl : $(".temaslista"),
    pl : $(".populista"),
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

    date:{
        actual: "",
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
                                <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this, ${app.user.id}, ${post.ID_user})"
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
                                            onchange="app.getEmotes(${post.ID_publication}, this.selectedIndex, ${app.user.id}, ${app.user.id})"
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

    openPost: function(event, pid, element, user, iduser){
        if(event != ""){
            event.preventDefault();
        }
        let i = 0;
        let posthtml = "<h2>La publicación no esta disponible</h2>";
        let comentaryhtml =  "";
        this.lpu.html("");
        this.pp.html("");
        this.lp.html("");
        fetch(this.urls.openpost + "?_Op" + "&pid=" + pid)
			.then(response => response.json())
			.then(post => {
				if(post.length > 0){
                    posthtml = this.postHTMLstructure(post, 1);
                    for(let comemnts of post){
                        comentaryhtml += this.postHTMLstructure(post, 2, i, user);
                        i++;
                    }
                    
                    if(user == 0) {
                        comentaryhtml = comentaryhtml == "" ? `
                        <h2>Los comentarios no estan disponibles o no hay en esta publicacion</h2>` : comentaryhtml
                    }
                    else {
                        comentaryhtml = comentaryhtml == "" ? `
                        <div class="crearcomment">
                            <form id="comment-form" method="post" class="form-comment">        
                                <div class="mi-comment">
                                    <div class="datos-comment">
                                        <div class="datos">
                                            <div>
                                                <span>${app.user.name}</span>
                                            </div>
                                            <span>Crear comentario</span>
                                
                                        </div>
                                    </div>
                                    <div class="input-container">
                                        <textarea name="contenidocomen" placeholder="Escribe tu idea..." id="contenidocomen" required></textarea>
                                    </div>
                                    <div class="buttondiv">
                                        <button type="submit">Enviar</button> 
                                    </div>
                                    <input hidden type="text" value="${iduser}" name="key" id="key"> 
                                    <input hidden type="text" value="${pid}" name="pide" id="pide"> 
                                    <input hidden type="text" value="${3}" name="date" id="date">
                                </div>
                            </form>
                        </div>
                        
                        <h3>No se encontraron comentarios en este Post</h3>` : comentaryhtml
                    }
                }
                //this.lp.html(comentary);
                this.lp.html(comentaryhtml);
                this.lpu.html(comentaryhtml)
                this.pp.html(posthtml);
                app.createComent(post[0].ID_publication)

			}).catch(err => console.error(err));
    },

    getDate:function(){
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedHours = hours.toString().padStart(2, '0');
        
        const formattedDateTime = `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
        this.date.actual =  formattedDateTime;
        console.log(formattedHours)          
    },

    createComent: function(idpubli){
        app.getDate()
        const cf = $('#comment-form');
        cf.on("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData();
            data.append("contenidocomen",$("#contenidocomen").val());
            data.append("date", app.date.actual);
            data.append("key",$("#key").val());
            data.append("pide",idpubli);
            data.append("_cc","");
            fetch(app.urls.createComment,{
                method : "POST",
                body : data
            })
            .then ( resp => resp.json())
            .then ( resp => {
                if(resp.r !== false){
                    //publicreada()
                    app.openPost("", idpubli,"", app.user.id, app.user.id)
                    alert("SECREO COMENTARIO")
                    $("#contenidocomen").val(''); //Borra el campo de contenido
                }else{
                    //nocreada() //alert que dice que no se pudo crear la publicación
                }
            }).catch( err => console.error( err ))            
        })
    },

    /* openPost para Revisar en la vista de administrar publicaciones */
    openView: function(event, pid, element){
        div = $('.div')
            if(div = revisar){
                div.style.display = 'flex';
            }
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
                    posthtml = this.AdminpostHTMLstructure(post, 1);
                    for(let comemnts of post){
                        comentaryhtml += this.AdminpostHTMLstructure(post, 2, i);
                        i++;
                    }
                    comentaryhtml = comentaryhtml == "" ? "<h2>Los comentarios no estan disponibles o no hay en esta publicacion</h2>" : comentaryhtml
                    botonD = post[0].Active == 0 ?`<button onclick="declinepost1(this)" value="${post[0].ID_publication}" type="button" class="btnEliminar-openView">Rechazar Publicación</button>`: `
                    <button onclick="deletepubli1(this)" value="${post[0].ID_publication}" type="button" class="btnEliminar-openView">Eliminar Publicacion</button>`
                    
                    botonA = post[0].Active == 0 ?`<button onclick="aceptarpost(this)" value="${post[0].ID_publication}" type="button" class="btnAceptar-openView">Aceptar publicación</button>`:`
                    <!--<button value="$ {post.ID_publication}" type="button" class="btnAceptar-openView">Ta bien</button>-->`

                    backB  = `<button class="btnAtras-openView" onclick="app.view('adminpublic')">< Regresar</button>`
                }
                if($("#text-center")){
                    var div = $("#text-center")
                    var elements = backB + botonA + botonD
                    div.html(elements);
                }
                this.lp.html(comentaryhtml);
                this.pp.html(posthtml);
			}).catch(err => console.error(err));
    },


    postHTMLstructure : function (post, option = "", i = 0, user){
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
        if(user == 0) {
            CommentaryStructure = `
            <div class="commentarrys">
            <div class="username">
                <h3>${post[i].Username}</h3>  
            </div>
            <div class="date">
                <h5>${post[i].Date}</h5>
            </div>
            <div class="content">
                <p>${post[i].Content}</p>
            </div>
        </div>`;
        }
        else {
            if(i <= 1) {
            CommentaryStructure = `
                <div class="crearcomment">
                    <form id="comment-form" method="post" class="form-comment">        
                        <div class="mi-comment">
                            <div class="datos-comment">
                                <div class="datos">
                                    <div>
                                        <span>${app.user.name}</span>
                                    </div>
                                    <span>Crear comentario</span>
                        
                                </div>
                            </div>
                            <div class="input-container">
                                <textarea name="contenidocomen" placeholder="Escribe tu idea..." id="contenidocomen" required></textarea>
                            </div>
                            <div class="buttondiv">
                                <button type="submit">Enviar</button> 
                            </div>
                        
                        
                        </div>
                    </form>
                </div>
                <div class="commentarrys">
                    <div class="username">
                        <h3>${post[i].Username}</h3>  
                    </div>
                    <div class="date">
                        <h5>${post[i].Date}</h5>
                    </div>
                    <div class="content">
                        <p>${post[i].Content}</p>
                    </div>
                </div>
                <br>
                `;
            }
            if(i > 1) {
                CommentaryStructure = `
            <div class="commentarrys">
            <div class="username">
                <h3>${post[i].Username}</h3>  
            </div>
            <div class="date">
                <h5>${post[i].Date}</h5>
            </div>
            <div class="content">
                <p>${post[i].Content}</p>
            </div>
        </div>`;
            }
        }
        switch(option){
            case 1: return PostStructure; break;
            case 2: return CommentaryStructure; break;
        } 

    },

    AdminpostHTMLstructure : function (post, option = "", i = 0){
        //console.table(post);
        let PostStructure = "", CommentaryStructure = ""  
        
        if(option ==1 && post[0])
            PostStructure =  ` 
            <div class="publicacionPrevia pplg">
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
            </div>
        `;  
    
    if(option == 2 &&  i >0)
        CommentaryStructure = `
            <div class="commentarrys">
                <div class="username">
                    <h3>${post[i].Username}</h3>  
                </div>
                <div class="date">
                    <h5>${post[i].Date}</h5>
                </div>
                <div class="content">
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
            const selectedValue = typer;
            localStorage.setItem('selectedOption', selectedValue);
            this.rs.html("");
            fetch(this.urls.getReactions+ "?_ge"+"&pid="+pid+"&uid="+user+ "&type="+typer)
                    .then(resp => resp.json())
                    .then(ppresp => {
                    if(ppresp.length > 0){
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
    
    getMejorPosts: function() {
        if(this.pl) {
            let html = `<b>No hay populares</b>`;
            this.pl.html("");
            fetch(this.urls.mejorposts+ "?_ppu")
                .then(resp => resp.json())
                .then(ppresp => {
                    if(ppresp.length >0 ){
                        html = "";
                        let primera = true;
                        for(let popu of ppresp){    
                            html += `
                                <li value="${popu.ID_publication}" onclick="app.openPost(event, ${popu.ID_publication}, this, ${app.user.id}, ${popu.ID_user})">${popu.title}</li>
                            `;     
                        }
                        primera = false;
                        this.pl.html(html);
                        
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
    getTopicslistUser: function(uid) {
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
                                    <li value="${topic.ID_topic}" onclick="app.filterPostsByTopicUser(${topic.ID_topic},${uid})">${topic.Name}</li>
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
                                <div class="NoPubs">
                                    <span>No hay publicaciones con este tema</span>
                                    <div class="NoPubsIcon">
                                        <i class="bi bi-x-circle"></i>
                                    </div>
                                </div> 
                               
                            `;
                        }
                        this.pp.html(html);
                        
                    }
                }).catch( err => console.error( err ));
        }
    },

    filterPostsByTopicUser: function(topicId, uid, active= "1") {
        if(this.pp) {
            let html = `<b>No hay publicaciones</b>`;
            this.pp.html("");
            fetch(this.urls.userposts + "&uid=" + uid)
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
                            <div class="NoPubs">
                                <span>No hay publicaciones con este tema</span>
                                <div class="NoPubsIcon">
                                    <i class="bi bi-x-circle"></i>
                                </div>
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

    toggleTemas: function() {
            const temasdiv = document.getElementById('CrearTema');
            const btnAbrirTema = document.getElementById('btnCrearTema');
            const cerrarBTN = document.getElementById('cerrarBTN');
            if(btnAbrirTema) {
                btnAbrirTema.addEventListener('click', () => {
                    let displayStyle = window.getComputedStyle(temasdiv, null).display;
                    temasdiv.style.display = (displayStyle === 'none') ? 'flex' : 'none';
                });
            }
            if(cerrarBTN) {
                cerrarBTN.addEventListener('click', (e) => {
                    e.preventDefault();
                    temasdiv.style.display = 'none';
                });
            }  
    },

    editTopic: function(idTopic) {
        fetch(this.urls.getTopicById + "?_gti&idTopic=" + idTopic)
        .then(res => res.json())
        .then(data => {
            let topic = data[0]
            $("#idTopicEdit").val(idTopic)
            $("#tituloTemaEditado").val(topic.Name)
            $("#contenidoTemaEditado").val(topic.Description)
            $("#EditarTema").css("display", "flex")
        })
    },

    cerrarFormEditar: function() {
        $("#EditarTema").css("display", "None")
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
                            if(post.Title.toLowerCase().includes(searchTerm.toLowerCase()) || post.Content.toLowerCase().includes(searchTerm.toLowerCase()) || post.Username.toLowerCase().includes(searchTerm.toLowerCase())) {
                                if(post.Active == 1) {
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
                        }
                        if(!foundPost){
                            html = `
                            <div class="NoPubs">
                                <span>No se encontró su busqueda</span>
                                <div class="NoPubsIcon">
                                    <i class="bi bi-x-circle"></i>
                                </div>
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
                            if(post.Title.toLowerCase().includes(searchTerm.toLowerCase()) || post.Content.toLowerCase().includes(searchTerm.toLowerCase())) {
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

                                        <div class="BotonesControl">
                                            <button class="btnEditPost" onclick="app.editMyPost(${post.ID_publication})" title="Editar Post">
                                                <img src="resources/img/edit-3-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
                                            <button class="btnDeletePost" onclick="userpost_confirm_delete(${post.ID_publication})" title="ELiminar Post">
                                                <img src="resources/img/delete-2-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
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
                            <div class="NoPubs">
                                <span>No se encontró su busqueda</span>
                                <div class="NoPubsIcon">
                                    <i class="bi bi-x-circle"></i>
                                </div>
                            </div> 
                            `;
                        }
                        this.pp.html(html);
                    }
                }).catch( err => console.error( err ));
        }
    },

    BuscadorTemasAdmin: function() {
        const buscador = document.getElementById('search3');
        if(buscador) {
            buscador.addEventListener('input', function(event) {
                event.preventDefault();
                let searchTerm = buscador.value;
                app.filterTopicsBySearch(searchTerm);
            });        
        }
    },


    filterTopicsBySearch: function(searchTerm) {
        if(this.ap){
            let html = `<b>No hay ningún tema</b>`;
            this.ap.html("");
            fetch(this.urls.getTopics + "?_gt")
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         let foundPost = false;
                         for(let topic of ppresp){
                            if(typeof topic.ID_topic === 'string' && topic.ID_topic.toLowerCase().includes(searchTerm.toLowerCase()) || topic.Name && typeof topic.Name === 'string' && topic.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                foundPost = true;
                                html += `
                                <tr>
                                    <td>${topic.ID_topic}</td>
                                    <td>${topic.Name}</td>
                                    <td>${topic.Description}</td>
                                    <td>
                                        <div class="text-center btn-group">
                                            <button onclick="app.editTopic(${topic.ID_topic})" type="button" value ="${topic.ID_topic}" class="btnEditar">Editar</button>
                                            <button onclick="deleteTopic(${topic.ID_topic})" type="button" value ="${topic.ID_topic}" class="btnEliminar">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
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
                    this.ap.html(html);
                    }
                }).catch( err => console.error( err ));
        }
    },

    BuscadorUsuariosAdmin: function() {
        const buscador = document.getElementById('search4');
        if(buscador) {
            buscador.addEventListener('input', function(event) {
                event.preventDefault();
                let searchTerm = buscador.value;
                app.filterPersonsBySearch(searchTerm);
            });        
        }
    },

    filterPersonsBySearch: function(searchTerm) {
        if(this.ap){
            let html = `<b>No hay ningún usuario</b>`;
            this.ap.html("");
            fetch(this.urls.people + "?_gu")
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         let foundPost = false;
                         for(let user of ppresp){
                            if(user.ID_user && typeof user.ID_user === 'number' && user.ID_user.toString().toLowerCase().includes(searchTerm.toLowerCase()) || user.Username && typeof user.Username === 'string' && user.Username.toLowerCase().includes(searchTerm.toLowerCase())) {
                                foundPost = true; 
                                html += `
                                <tr>
                                    <td>${user.ID_user}</td>
                                    <td>${user.Username}</td>
                                    <td>${user.Email}</td>
                                    <td>${user.Nposts}</td>
                                    <td>
                                        <div class="text-center btn-group">
                                            <button onclick="deleteuser(this)" type="button" value ="${user.ID_user}" class="btnEliminar">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
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
                    this.ap.html(html);
                    }
                }).catch( err => console.error( err ));
        }
    },

    BuscadorPublicacionesAdmin: function() {
        const buscador = document.getElementById('search5');
        if(buscador) {
            buscador.addEventListener('input', function(event) {
                event.preventDefault();
                let searchTerm = buscador.value;
                app.filterPostAdminSearch(searchTerm);
            });        
        }
    },

    filterPostAdminSearch: function(searchTerm) {
        if(this.ap){
            let html = `<b>No hay ningúna Publicacion</b>`;
            this.ap.html("");
            fetch(this.urls.posts)
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         let foundPost = false;
                         for(let post of ppresp){
                                    
                                    if(post.Active === 1) {
                                        if(post.ID_publication && typeof post.ID_publication === 'number' && post.ID_publication.toString().toLowerCase().includes(searchTerm.toLowerCase()) || post.Title && typeof post.Title === 'string' && post.Title.toLowerCase().includes(searchTerm.toLowerCase()) && post.Active === 1) {
                                        foundPost = true; 
                                        html += `
                                        <tr>
                                            <td>${post.ID_publication}</td>
                                            <td>${post.Title}</td>
                                            <td>${post.Date}</td>      
                                            <td>Sí</td>
                                            <td>${post.topic}</td>
                                            <td>
                                                <div class="text-center">
                                                    <div class="btn-group">
                                                        <button type="button" href="#" onclick="app.openView(event,${post.ID_publication}, this)" class="btnRevisar">Revisar</button>   
                                                        <button onclick="deletepubli(this)" value="${post.ID_publication}" type="button" class="btnEliminar">Eliminar</button>        
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                            `;
                                        }
                                    }
                                    if(post.Active != 1) {
                                        if(post.ID_publication && typeof post.ID_publication === 'number' && post.ID_publication.toString().toLowerCase().includes(searchTerm.toLowerCase()) || post.Title && typeof post.Title === 'string' && post.Title.toLowerCase().includes(searchTerm.toLowerCase()) && post.Active !== 1) {
                                        foundPost = true; 
                                        html += `
                                        <tr>
                                            <td>${post.ID_publication}</td>
                                            <td>${post.Title}</td>
                                            <td>${post.Date}</td>
                                            <td>No</td>
                                            <td>${post.topic}</td>
                                            <td>
                                                <div class="text-center">
                                                    <div class="btn-group">
                                                        <button type="button" href="#" onclick="app.openView(event,${post.ID_publication}, this)" class="btnRevisar">Revisar</button>                                                                
                                                        <button onclick="declinepost(this)" value="${post.ID_publication}" type="button" class="btnEliminar">Rechazar</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        `;
                                        }
                                    }
                                }
                            if(!foundPost){
                                html = `
                                    
                                        <div class="pub-reaccion-span">
                                            <span>No se encontró tu busqueda</span>
                                        </div> 
                                    
                                `;
                            }
                            
                         }
                    this.ap.html(html);
                    
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

    editMyPost: function(idPost) {
        fetch(this.urls.openpost + "?_Op" + "&pid=" + idPost)
            .then(res => res.json())
            .then(data => {
                let dataPost = data[0]
                document.getElementById("idPostEdit").value = dataPost.ID_publication;
                document.getElementById("newTitulo").value = dataPost.Title;
                document.getElementById("newContenido").value = dataPost.Content;
                document.getElementById("edit-temastab").selectedIndex = dataPost.ID_topic-1;
                document.getElementById("divEditPost").style.display = 'flex';
                document.getElementById('Sombreado').style.display = 'flex';
            })
    },

    cerrarEditPost: function() {
        document.getElementById("btnCerrarEdit").addEventListener("click", (e)=>{
            e.preventDefault()
            document.getElementById("divEditPost").style.display = 'none'
            document.getElementById('Sombreado').style.display = 'none'
        })
    },


    abrirnavegacion: function() { 
        const navegacion = document.getElementById('navegacion');
        const btnAbrirCosa = document.getElementById('btnAbrir');
        if (btnAbrirCosa) {
            btnAbrirCosa.addEventListener('click', () => {
                let displayStyle = window.getComputedStyle(navegacion, null).display;
                navegacion.style.display = (displayStyle === 'none') ? 'flex' : 'none';
            });
        
        };
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
                                <a href="#" onclick="app.openPost(event, ${post.ID_publication}, this, ${app.user.id})"
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
                                    <span class="PubliStatus"><i title="Publicación Aceptada" class="bi bi-check-lg"></i></span>`
                                    : `<span class="PubliStatusNone"><i title="Publicación en revisión" class="bi bi-clock"></i></span>`}
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

                                        <div class="BotonesControl">
                                            <button class="btnEditPost" onclick="app.editMyPost(${post.ID_publication})" title="Editar Post">
                                                <img src="resources/img/edit-3-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
                                            <button class="btnDeletePost" onclick="userpost_confirm_delete(${post.ID_publication})" title="ELiminar Post">
                                                <img src="resources/img/delete-2-svgrepo-com.png" name="iconocomment"></img>
                                            </button>
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
                                            <button type="button" href="#" onclick="app.openView(event,${post.ID_publication}, this)" class="btnRevisar">Revisar</button>
                                        
                                            ${post.Active == 1 ? `
                                            <button onclick="deletepubli(this)" value="${post.ID_publication}" type="button" class="btnEliminar">Eliminar</button>
                                            `:`                                            
                                            <button onclick="declinepost(this)" value="${post.ID_publication}" type="button" class="btnEliminar">Rechazar</button>`}
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
                                    <div class="text-center btn-group">
                                        <button onclick="deleteuser(this)" type="button" value ="${user.ID_user}" class="btnEliminar">Eliminar</button>
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

    // Función para imrpirmir los temas en la tabla
    getTopicsAdmin: function(){
        if(this.ap){
            let html = `<b>No hay ningún tema</b>`;
            this.ap.html("");
            fetch(this.urls.getTopics + "?_gt")
                 .then(resp => resp.json())
                 .then(ppresp => {
                    if(ppresp.length > 0){
                         html = "";
                         for(let topic of ppresp){
                             html += `
                            <tr>
                                <td>${topic.ID_topic}</td>
                                <td>${topic.Name}</td>
                                <td>${topic.Description}</td>
                                <td>
                                    <div class="text-center btn-group">
                                        <button onclick="app.editTopic(${topic.ID_topic})" type="button" value ="${topic.ID_topic}" class="btnEditar">Editar</button>
                                        <button onclick="deleteTopic(${topic.ID_topic})" type="button" value ="${topic.ID_topic}" class="btnEliminar">Eliminar</button>
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

    deleteElement: function(index, elementId, recharge){ //Metodo para eliminar cualquier elemento 
        var destiny = ""
        switch(index){
            case 1: destiny = this.urls.deletePubli + "?_dP" + "&pid=" + elementId; break;
            case 2: destiny = this.urls.deleteUser + "?_dU" + "&uid=" + elementId;break;
            case 3: destiny = this.urls.deleteTopic + "?_dT" + "&tid=" + elementId; break;
        }
            
        fetch(destiny)
            .then(resp => resp.json())
            .then(succes => {
                if(succes.r != false){
                    recharge();
                    //alert(succes.m);
                }else
                    alert("No es posible realizar esta accion")
            }).catch( err => console.error( err ));
    },

    activePost: function(elementId, accion = null){
        fetch(this.urls.activePost + "?_aC" + "&pid=" + elementId)
            .then(resp => resp.json())
            .then(succes => {
                if(succes.r != false){
                    //alert(succes.m);
                    if(typeof accion === "function")
                        accion()
                }else
                    alert("No es posible realizar esta accion")
            }).catch( err => console.error( err ));
    }
}

app.toggleDetails(); //Abre la función antes de que cargue todo
app.toggleTemas();
app.getTopics();
app.getTopicslist();
app.getTopicslistUser();
app.getMejorPosts();
app.newposttab();
app.Buscador();
app.BuscadorPerfil();
app.BuscadorUsuariosAdmin();
app.BuscadorTemasAdmin();
app.BuscadorPublicacionesAdmin();
app.abrirnavegacion();


