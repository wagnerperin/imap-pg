
function fstlogin(){
    var sd_username = document.getElementById('fstusername').value;
    var sd_password = document.getElementById('fstpassword').value;
    
    var sendInfo = {
        username: sd_username,
        password: sd_password
    };
    $.when(
        $.ajax({
            type: "POST",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/token-auth/",
            dataType: "json",
            accept: "application/json",
            contentType: "application/json; charset=UTF-8", // This is the money shot
            success: function(data){
                localStorage.setItem("token", data['token']);
                localStorage.setItem("cmpaasid", data['id']);
            },      
            data: JSON.stringify(sendInfo)
        }).fail(function(response){
            window.location = "/login/";
        })
   ).then(function(){
       $.ajax({
            method: "GET",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/users/"+localStorage.getItem("cmpaasid")+"/",
            success: function(data){
                localStorage.setItem("first_name", data['first_name']);
                localStorage.setItem("last_name", data['last_name']);
                localStorage.setItem("username", data['username']);
                localStorage.setItem("email", data['email']);
            }      
        }).done(function(){
            $.ajax({
                method: "GET",
                url: "http://platform.cmpaas.inf.ufes.br:8000/api/user_profiles/"+localStorage.getItem("cmpaasid")+"/",
                success: function(data){
                    localStorage.setItem("image", data['image']);
                }      
            }).done(function(){
                window.location = "/profile/";
            }).fail(function(response){
                console.log(response);
            })
        }).fail(function(response){
            console.log(response);
        })
   });                             
}

function logout()
{
    localStorage.clear();
}