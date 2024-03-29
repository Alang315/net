app = {
    urls:{
        login: "/resources/views/auth/login.php"
    },
    view:function(url){
        location.replace(this.urls[url])
    }


}
