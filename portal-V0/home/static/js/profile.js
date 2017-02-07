/* MUITO UTIL
function recursiveGetProperty(obj, lookup, callback) {
    for (property in obj) {
        if (property == lookup) {
            callback(obj[property]);
        } else if (obj[property] instanceof Object) {
            recursiveGetProperty(obj[property], lookup, callback);
        }
    }
} 


recursiveGetProperty(data, 'results', function(obj) {
            document.getElementById("maps").innerHTML += obj["title"] + "<br/>";
    });
*/

function loadMap(mapId){
    $.ajax({
            type: "GET",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/mapcontents/"+mapId+"/",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            success: function(data){
                localStorage.setItem("mapContentId", data['id']);
                localStorage.setItem("mapContent", data['content']);
                
                $.ajax({
                    type: "GET",
                    url: "http://platform.cmpaas.inf.ufes.br:8000/api/maps/"+data['map']+"/",
                    dataType: "json",
                    contentType: 'application/json; charset=UTF-8', // This is the money shot
                    success: function(results){
                        localStorage.setItem("mapTitle", results['title']);
                        localStorage.setItem("mapQuestion", results['question']);
                        localStorage.setItem("mapDescription", results['description']);
                        
                    }  
                }).fail(function(response){
                    document.getElementById("maps").innerHTML = "Erro ao Carregar Mapas";
                });
                
                localStorage.setItem('unsaved', false);
                localStorage.removeItem('unsavedData');
                
                window.location.href = "/editor/";
                
            }  
        }).fail(function(response){
            document.getElementById("maps").innerHTML = "Erro ao Carregar Mapas";
        });
}

function populateDiv(mapId){
    
    $.ajax({
            type: "GET",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/mapversions/"+mapId+"/",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            success: function(data){
                var divTable = document.getElementById("divList"+mapId);
                divTable.innerHTML = "";
                var table = document.createElement('table');
                var newRow;
                var newCell;
                var th;
                var vet = data['results'];
                table.setAttribute("class", "table table-striped table-bordered table-list text-center");
                table.setAttribute("id", "tableList"+mapId);
                
                var tableHead = document.createElement('thead');
                
                var heading = new Array();
                    heading[0] = "Mapa";
                    heading[1] = "ID da Versão";
                    heading[2] = "Data de Criação";
                
                newRow = tableHead.insertRow(tableHead.rows.length);
                        
                for (i = 0; i < heading.length; i++) {
                    th = document.createElement('th');
                    th.setAttribute("class", "text-center");
                    th.appendChild(document.createTextNode(heading[i]));
                    newRow.appendChild(th);
                }
                
                th = document.createElement('th');
                th.setAttribute("class", "text-center");
                var em = document.createElement('em');
                em.setAttribute("class","fa fa-cog");
                th.appendChild(em);
                newRow.appendChild(th);
                
                table.appendChild(tableHead);
                
                var tableBody = document.createElement('tbody');
                
                vet.forEach(function(entry){
                    newRow = tableBody.insertRow(tableBody.rows.length);
                    
                    newCell = newRow.insertCell(0);
                    newText = document.createTextNode(entry['map']);
                    newCell.appendChild(newText);
                    
                    newCell = newRow.insertCell(1);
                    newText = document.createTextNode(entry['id']);
                    newCell.appendChild(newText);
                    
                    newCell = newRow.insertCell(2);
                    newText = document.createTextNode(entry['created_date']);
                    newCell.appendChild(newText);
                    
                    newCell = newRow.insertCell(3);
                    a = document.createElement('a');
                    linkText = document.createElement('em');
                    linkText.setAttribute("class", "fa fa-pencil");
                    a.appendChild(linkText);
                    a.title = "Editar";
                    a.href = "#";
                    a.setAttribute("class", "btn btn-default");
                    a.setAttribute('onclick','loadMap('+entry['id']+');'); // for FF
                    a.onclick = function() {loadMap(entry['id']);}; // for IE
                    newCell.appendChild(a);
                    
                    a = document.createElement('a');
                    linkText = document.createElement('em');
                    linkText.setAttribute("class", "fa fa-trash");
                    a.appendChild(linkText);
                    a.title = "Excluir";
                    a.href = "#";
                    a.setAttribute("class", "btn btn-danger");
                    newCell.appendChild(a); 
                    
                });
                
                newRow = tableBody.insertRow(tableBody.rows.length);
                newCell = newRow.insertCell(0);
                newText = document.createTextNode(mapId);
                newCell.appendChild(newText);
                
                newCell = newRow.insertCell(1);
                newCell.setAttribute("colspan","2");
                newText = document.createTextNode("Crie uma Nova Versão");
                newCell.appendChild(newText);
                
                newCell = newRow.insertCell(2);
                a = document.createElement('a');
                linkText = document.createElement('em');
                linkText.setAttribute("class", "fa fa-plus");
                a.appendChild(linkText);
                a.title = "Criar";
                a.href = "#";
                a.setAttribute("class", "btn btn-primary");
                newCell.appendChild(a);
                
                
                table.appendChild(tableBody);
                divTable.appendChild(table);           
            }  
        }).fail(function(response){
            document.getElementById("maps").innerHTML = "Erro ao Carregar Mapas";
        });
}

function list(id) {
    populateDiv(id.replace("bt",""));
    if($($(id).data("target")).hasClass("out")) {
        $($(id).data("target")).addClass("in");
        $($(id).data("target")).removeClass("out");
    } else {
        $($(id).data("target")).addClass("out");
        $($(id).data("target")).removeClass("in");
    }
}

function loadMaps(){
    $.ajax({
            type: "GET",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/mymaps/"+localStorage.getItem("username")+"/",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            success: function(data){
                var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
                var newRow;
                var newCell;
                var newText;
                var newDiv;
                var a;
                var linkText;
                var vet = data['results'];
            
                vet.forEach(function(entry) {
                    newRow = tableRef.insertRow(tableRef.rows.length);
                    
                    newCell  = newRow.insertCell(0);
                    newText  = document.createTextNode(entry['id']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(1);
                    newText  = document.createTextNode(entry['title']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(2);
                    newCell.setAttribute("class", "hidden-xs");
                    newText  = document.createTextNode(entry['question']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(3);
                    newCell.setAttribute("class", "hidden-xs");
                    newText  = document.createTextNode(entry['created_date']);
                    newCell.appendChild(newText);
                    
                    newCell  = newRow.insertCell(4);
                    if(entry['published_date'] != null){
                        newText  = document.createTextNode(entry['published_date']);
                        newCell.appendChild(newText);
                    }else{
                        a = document.createElement('a');
                        linkText = document.createElement('em');
                        linkText.setAttribute("class", "fa fa-share");
                        a.appendChild(linkText);
                        a.title = "Compartilhar";
                        a.href = "#";
                        a.setAttribute("class", "btn btn-info");
                        newCell.appendChild(a);
                    }
                    
                    
                    newCell = newRow.insertCell(5);
                    a = document.createElement('a');
                    linkText = document.createElement('em');
                    linkText.setAttribute("class", "fa fa-list");
                    a.appendChild(linkText);
                    a.title = "Listar Versões";
                    a.href = "#";
                    a.setAttribute("id", "bt"+entry['id']);
                    a.setAttribute('onclick','list(this.id);'); // for FF
                    a.onclick = function() {list(this.id);}; // for IE
                    a.setAttribute("type","button");
                    a.setAttribute("class", "btn btn-default");
                    a.setAttribute("data-toggle", "collapse");
                    a.setAttribute("data-target", "#collapsemap"+entry['id']);
                    newCell.appendChild(a);
     
                    newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.setAttribute("class", "collapse out");
                    newRow.setAttribute("id", "collapsemap"+entry['id']);
                    
                    newCell  = newRow.insertCell(0);
                    newCell.setAttribute("colspan", "6")
                    
                    newDiv = document.createElement("div");
                    newDiv.id = "divList"+entry['id'];
                    
                    newCell.appendChild(newDiv);
                });              
            }  
        }).fail(function(response){
            document.getElementById("maps").innerHTML = "Erro ao Carregar Mapas";
        });
}

$("container").ready(function(){
    if(localStorage.getItem("token") == null){
        window.location = "/login/";
    }else{
        document.getElementById("name").innerText = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
        document.getElementById("usertag").innerText = "@"+localStorage.getItem("username");
        document.getElementById("imageProfile").src = localStorage.getItem("image");
        loadMaps();
    }  
});