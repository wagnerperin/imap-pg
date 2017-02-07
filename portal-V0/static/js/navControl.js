$("menuContainer").ready(function(){
    //Opções Abertas ao Público Geral
    document.getElementById("mnSobre").style.display = "inherit";
    document.getElementById("mnServiços").style.display = "inherit";
    document.getElementById("mnContato").style.display = "inherit";
    document.getElementById("mnEditar").style.display = "inherit";
    document.getElementById("mnMapaConceitual").style.display = "inherit";
    document.getElementById("mniMap").style.display = "inherit";
    document.getElementById("mnVMap").style.display = "inherit";
    document.getElementById("mnMergeMaps").style.display = "inherit";
    document.getElementById("mnOutros").style.display = "inherit";
    
    //Opções para Usuários autenticados
    if(localStorage.getItem("token"))
    {
        document.getElementById("mnMenu").innerHTML = "<span class=\"glyphicon glyphicon-user\"></span>" + " " + localStorage.getItem("first_name");
        document.getElementById("mnMenu").style.display = "inherit";
        document.getElementById("mnPerfil").style.display = "inherit";
        document.getElementById("mnSair").style.display = "inherit";
   
    }else//Remove opções de Usuários já autenticados
    {
        document.getElementById("mnEntrar").style.display = "inherit";
        
    }
}); 

