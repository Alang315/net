app = {

    urls: {
        home: "/",
        login: "/login",
        register: "/login/register"
    },

    view: function(url){
        location.replace(this.urls[url])
    }

}
