$("container").ready(function(){
    if(localStorage.getItem("token") == null){
        window.location = "/login/";
    }else{
        document.getElementById("name").innerText = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
        document.getElementById("usertag").innerText = "@"+localStorage.getItem("username");
        document.getElementById("imageProfile").src = localStorage.getItem("image");
    }  
});

//tab menu
$(document).ready(function() {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).removeClass("btn-default").addClass("btn-primary");   
    });
});