app = {
    urls:{
        login: "/resources/views/auth/login.php",
        register: "/resources/views/auth/register.php"
    },
    view:function(url){
        location.replace(this.urls[url])
    }


}
