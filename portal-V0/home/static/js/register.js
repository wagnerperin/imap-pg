$(document).ready(function(){
    if(localStorage.getItem("token"))
    {
        document.getElementById('title').innerText = "Usuário Autenticado.";
        document.getElementById('registerForm').innerHTML = "";
        document.getElementById('result').innerHTML = "Aguarde! Você será redirecionado...";
        window.setTimeout(function(){
            window.location.href = "/profile/";
        }, 5000);
    }
}); 

function addNewUser() {
    
    var pass  = document.getElementById('password').value;
    var pass2 = document.getElementById('passwordRepeated').value;
    if(pass != pass2){
        document.getElementById('result').innerHTML = "Repita a Senha Corretamente!";
    }else{
        var sd_first_name = document.getElementById('first_name').value;
        var sd_last_name = document.getElementById('last_name').value;
        var sd_username = document.getElementById('username').value;
        var sd_email = document.getElementById('email').value;
        var sendInfo = {
            first_name: sd_first_name,
            last_name: sd_last_name,
            username: sd_username,
            password: pass,
            email: sd_email,
            groups: []
        };
        $.ajax({
            type: "POST",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/users/",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            Authorization: "Token 03b0bdcaa6b50c59e54b4dba4da461935aef84eb",
            data: JSON.stringify(sendInfo)
        }).done(function(response){
            document.getElementById('title').innerText = "Cadastrado com Sucesso";
            document.getElementById('registerForm').innerHTML = "";
        }).fail(function(response){
            var json = JSON.stringify(response);
            var res = $.parseJSON(json);
            var msg = $.parseJSON(res.responseText);
            var output = "";
            document.getElementById('title').innerText = "Erro ao Cadastrar";
            for(var property in msg)
            {
                output += property + ": " + msg[property]+" <br>"
            }
            document.getElementById('result').innerHTML = output;
            document.getElementById('registerForm').innerHTML = "";
        });
    }
}