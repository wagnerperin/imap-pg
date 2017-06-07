$("container").ready(function(){
    if(localStorage.getItem("mapContentId") != null){
        document.getElementById("mapTitle").value = localStorage.getItem("mapTitle");
        document.getElementById("question").value = localStorage.getItem("mapQuestion");
        document.getElementById("description").value = localStorage.getItem("mapDescrition");

        document.getElementById("btNewVersion").innerText = "Criar Nova Versão";
        document.getElementById("btNewVersion").disabled = false;
        document.getElementById("btUpdateMap").disabled = false;
        document.getElementById("btNewMap").disabled = false;
        document.getElementById("btRemoveVersion").disabled = false;
        document.getElementById("btRemoveMap").disabled = false;

        myDiagram.model = go.Model.fromJson(localStorage.getItem("mapContent"));

        if(localStorage.getItem('unsaved')){
          myDiagram.model = go.Model.fromJson(localStorage.getItem('unsavedData'));
          localStorage.setItem('unsaved',false);
          document.getElementById("information").innerHTML = "<strong>Informação:</strong> Existem mudanças alterações não salvas.";
          document.getElementById("information").style.display = "inherit";
        }
    }

    if(localStorage.getItem("token") == null)
    {
        document.getElementById("information").innerHTML = "<strong>Informação:</strong> Faça <a href=\"/login/\"> login</a> para usar operações.";
        document.getElementById("information").style.display = "inherit";
    }else
    {
        document.getElementById("btNewVersion").disabled = false;
    }

});

//Persistência local dos mapas não salvos.
$("#myDiagram").mouseleave(function() {
    localStorage.setItem('unsavedData',myDiagram.model.toJson());
    localStorage.setItem('unsaved',true);

});

/*
$("myDiagram").mouseleave(function() {
            localStorage.setItem('unsavedData',myDiagram.model.toJson());
            localStorage.setItem('unsaved',true);
        });

        $(document).ready(function(){
            if(localStorage.getItem('unsaved')){
            alert("Mapa recarredado.");
            myDiagram.model = go.Model.fromJson(localStorage.getItem(unsavedData));
            localStorage.setItem('unsaved',false);
            }
        });

*/
CMPAAS = {};



prologRules = `
							primeiraOrdemDireta(ConceitoA, ConceitoB) :-
								rel(ConceitoA,_,ConceitoB).
							primeiraOrdemInversa(ConceitoA, ConceitoB) :-
								primeiraOrdemDireta(ConceitoB, ConceitoA).
							
							existeRelacaoDireta(ConceitoA, ConceitoB) :-
								primeiraOrdemDireta(ConceitoA, ConceitoB); primeiraOrdemInversa(ConceitoA, ConceitoB).
							
							todoDestino(Conceito, _, Saida) :-
								primeiraOrdemDireta(Conceito, Saida).
							todoDestino(Conceito, V, Saida) :-
								primeiraOrdemDireta(Conceito, X),
								\+ member(X, V),
								todoDestino(X, [X|V], Saida).
							
							todaOrigem(Saida, _, Conceito) :-
								primeiraOrdemDireta(Saida, Conceito).
							todaOrigem(Saida, V, Conceito) :-
								primeiraOrdemDireta(X, Conceito),
								\+ member(X, V),
								todaOrigem(Saida,[X|V], X).
							
							existeRelacao(ConceitoA, ConceitoB) :-
								todaOrigem(ConceitoA, [ConceitoA], ConceitoB); todaOrigem(ConceitoB, [ConceitoB], ConceitoA).
							
							quaisRelacoes(Saida, Conceito) :-
								rel(Conceito, Saida, _),
								rel(_, Saida, Conceito).
							
							quaisRelacoes(Saida, ConceitoA, ConceitoB) :-
								rel(ConceitoA, Saida, ConceitoB),
								rel(ConceitoB, Saida, ConceitoA).
												
								
							listaRelacao(LR):-
								findall(R,rel(_,R,_),LR).
							
							buscaRelacao(R):-	
								listaRelacao(LR),
								member(R,LR).
							
							nTotalRelacao(R):-
								listaRelacao(LR),
								comprimento(R,LR).
								
							nConceitoRelacao(N,R):-
								findall(ConceitoA,rel(ConceitoA,R,_),LRA),
								findall(ConceitoB,rel(_,R,ConceitoB),LRB),
								concatena(LRA,LRB,LR2),
								write(LR2),
								comprimento(N,LR2).
							
							numeroRelacaoConceito(N,C):- 
								findall(Relacao,rel(C,Relacao,_),LC1),
								write(LC1),
								comprimento(N,LC1).
								
								
							nRelacaoConceitos(N,CA,CB):-
								findall(R1,rel(CA,R1,CB),Laux1),
								findall(R1,rel(CB,R1,CA),Laux2),
								concatena(Laux1,Laux2,Laux3),
								write(Laux3),
								comprimento(N,Laux3).
								
							listaConceitoA(LCA):-
								findall(ConceitoA,rel(ConceitoA,_,_),LCA).
								
							listaConceitoB(LCB):-
								findall(ConceitoB,rel(_,_,ConceitoB),LCB).
								
							listaConceito(LC):-
								listaConceitoA(LCA),
								listaConceitoB(LCB),
								concatena(LCA,LCB,LC2),
								list_to_set(LC2,LC).
							
							listaConceitoConcatenada(LC2):-	
								listaConceitoA(LCA),
								listaConceitoB(LCB),
								concatena(LCA,LCB,LC2).
							
							listaConceitoAux(LCaux):-
								findall(C,listaConceitoConcatenada(C),LCaux).
									
								
							buscaConceito(C):-	
								listaConceito(LC),
								member(C,LC).
							
							nTotalConceito(C):-
								listaConceito(LC),
								comprimento(C,LC).	
							
							nConceito(C,C1):-	
								listaConceitoConcatenada(LC2),
								comprimento(C,LC2).
							
							nRelacaoCadaConceito(N,C):-
								findall(R1,rel(C,R1,_),Laux1),
								findall(R2,rel(_,R2,C),Laux2),
								concatena(Laux1,Laux2,Laux3),
								write(Laux3),
								comprimento(N,Laux3).	
								
							nRelacaoEntradaConceito(N,C):-
								findall(R1,rel(C,R1,_),Laux1),
								write(Laux1),
								comprimento(N,Laux1).
								
							listaPreposicao(LP1):-
								findall((ConceitoA,R,ConceitoB),rel(ConceitoA,R,ConceitoB),LP1).		
							
							nPreposicao(N):-
								findall(R,rel(_,R,_),LP),
								comprimento(N,LP).
								
							nivelRelacao(N,R):-
								listaRelacao(LR),
								nelem(N,LR,R).
							
							nivelRelacaoFinal(N,R):-
								listaRelacao(LR),
								nelem(M,LR,R),
								nTotalRelacao(K),
								N is (K - M).
								
							nivelConceito(N,C):-
								listaConceitoConcatenada(LC2),
								nelem(N,LC2,C).	
							
							nivelConceitoFinal(X,C):-
									listaConceitoConcatenada(LC2),
									nelem(M,LC2,C),
									listaConceito(LC),
									nTotalConceito(K),
									X is (K - M).
									
									
							pertence(X,[X,_]).
							pertence(X,[_,Y]):- pertence(X,Y).	
									
							comprimento(0,[]).
							comprimento(N,[_|R]):- 
								comprimento(N1,R),
								N is 1 + N1.
								
							concatena([],L,L).
							concatena([X|L1],L2,[X|L3]):- concatena(L1,L2,L3).
								
							nelem(N,L,X):-nelem(N,1,L,X).
							nelem(N,N,[X|_],X):-!.
							nelem(N,I,[_|R],X):- I1 is I+1,
								nelem(N,I1,R,X).

	`;


CMPAAS.editor = function() {
  var public = {};

  public.init = function() {
    var $$ = go.GraphObject.make;  // for conciseness in defining templates
    var yellowgrad = $$(go.Brush, go.Brush.Linear, { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
    var radgrad = $$(go.Brush, go.Brush.Radial, { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" });

    myDiagram =
      $$(go.Diagram, "myDiagram",  // must name or refer to the DIV HTML element
        { initialContentAlignment: go.Spot.Center,
          // have mouse wheel events zoom in and out instead of scroll up and down
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
          // enable Ctrl-Z to undo and Ctrl-Y to redo
          "undoManager.isEnabled": true,
          "clickCreatingTool.archetypeNodeData": { text: "new node" }
        });

    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    // define the Node template
    myDiagram.nodeTemplate =
      $$(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // define the node's outer shape, which will surround the TextBlock
        $$(go.Shape, "RoundedRectangle",
          // { fill: yellowgrad, stroke: "black",
          { fill: "lightgray", stroke: "black",
            portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer", name: "SHAPE" }),
        $$(go.TextBlock,
          { font: "bold 10pt arial",
      margin: 4,
            editable: true, name: "TEXTBLOCK" },
          new go.Binding("text", "text").makeTwoWay())
      );

    myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $$(go.Adornment, "Spot",
        $$(go.Panel, "Auto",
          $$(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
          $$(go.Placeholder)
        ),
        // the button to create a "next" node, at the top-right corner
        $$("Button",
          { alignment: go.Spot.TopRight,
            click: addNodeAndLink },  // this function is defined below
          $$(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
        ) // end button
      ); // end Adornment

    // clicking the button inserts a new node to the right of the selected node,
    // and adds a link to that new node

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
      $$(go.Link,  // the whole link panel
        { curve: go.Link.Bezier,
          adjusting: go.Link.Stretch,
          reshapable: true
          //, routing: go.Link.AvoidsNodes
          //, corner: 1
         },
        //new go.Binding("points").makeTwoWay(),
        new go.Binding("curviness", "curviness"),
        $$(go.Shape,  // the link shape
          { isPanelMain: true,
            stroke: "black", strokeWidth: 1.5 }),
        $$(go.Shape,  // the arrowhead
          { toArrow: "standard",
            stroke: null }),
        $$(go.Panel, "Auto",
          $$(go.Shape,  // the link shape
            { fill: radgrad, stroke: null }),
          $$(go.TextBlock, "new relation",  // the label
            { textAlign: "center",
              editable: true,
              font: "10pt helvetica, arial, sans-serif",
              stroke: "black",
              margin: 4 },
            new go.Binding("text", "text").makeTwoWay())
        )
      );

  };

  //salva o mapa
  public.save = function(){
    var map = serialize();
    console.log(map);
    $.post('/editor/save/', map, function(dados){
      console.log(dados);
    });
  };

  //carrega o mapa
  public.load = function(){
    $.get('/editor/load/', function(dados){
      console.log(dados);
      myDiagram.model = go.Model.fromJson(dados);
    });
  };

  // ################## PRIVATE ##################

  // função que serializa o JSON: apenas retira a propriedade 'class' do objeto
  function serialize(){
    var obj = myDiagram.model.toJson();
    obj = obj.replace("\"class\": \"go.GraphLinksModel\",",""); //verificar se há necessidade de retirar essa parte
    return obj;
  }

  function addNodeAndLink(e, obj) {
    var adorn = obj.part;
    if (adorn === null) return;
    e.handled = true;
    var diagram = adorn.diagram;
    diagram.startTransaction("Add State");
    // get the node data for which the user clicked the button
    var fromNode = adorn.adornedPart;
    var fromData = fromNode.data;
    // create a new "State" data object, positioned off to the right of the adorned Node
    var toData = { text: "new node" };
    var p = fromNode.location;
    toData.loc = p.x + 200 + " " + p.y;  // the "loc" property is a string, not a Point object
    // add the new node data to the model
    var model = diagram.model;
    model.addNodeData(toData);
    // create a link data from the old node data to the new node data
    var linkdata = {};
    linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
    linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
    // and add the link data to the model
    model.addLinkData(linkdata);
    // select the new Node
    var newnode = diagram.findNodeForData(toData);
    diagram.select(newnode);
    diagram.commitTransaction("Add State");
  }

  return public;
};


(function() {
  var editor = CMPAAS.editor();
  editor.init();
})();

function editConclusion()
{
    document.getElementById('mapTitle').readOnly=true;
    document.getElementById('editIcone').className = "glyphicon glyphicon-pencil";
    document.getElementById('editLink').onclick = function(){ editTitle(); } ;
}

function editTitle() {
    document.getElementById('mapTitle').readOnly=false;
    document.getElementById('editIcone').className = "glyphicon glyphicon-ok";
    document.getElementById('editLink').onclick = function(){ editConclusion(); } ;
}

function displayOnTerminal(string){

	var terminal = document.getElementById("terminal");

	terminal.innerHTML =  terminal.innerHTML + "<br>" + string;
	terminal.scrollTop = terminal.scrollHeight;
}

function runQuery(){

	var query = document.getElementById('query').value;
	displayOnTerminal("P: <br>" + query);
	
	/*new Pengine({ server: "http://swish.swi-prolog.org/pengine",
		ask: "sin_table(X,Y)",
		chunk: 1000,
		application: "swish",
		onsuccess: function(result) {
		  for(var i=0; i<result.data.length; i++) {
		    var b = result.data[i];
		    displayOnTerminal( b.X + " " + b.Y);
		  }
		  if ( result.more )
                    result.pengine.next();
	        }
	      });*/
	
	runPNL(query);
}

function formatAnswer(answerString)
{
	answerString = answerString.replace(/\"/g, "");
	answerString = answerString.replace(/\[/g, "");
	answerString = answerString.replace(/\]/g, "");
	answerString = answerString.replace(/\{/g, "");
	answerString = answerString.replace(/\}/g, "");
	answerString = answerString.replace(/\,/g, "<br>");
	answerString = answerString.replace(/\:/g, " = ");
	return answerString;
}


function showAnswer(answer){

	var data = answer["data"];
	var event = data["event"];
	
	if(event.localeCompare("success") == 0){
		var dataArray = data["data"];

		if(!jQuery.isEmptyObject(dataArray[0])){
		
			var answerString = formatAnswer(JSON.stringify(dataArray));
			
			displayOnTerminal("R: <br>" + answerString);
		} else {
			displayOnTerminal("R: <br> true");
		}
	}else {
		displayOnTerminal("R: <br> false");
	}
}

function fromJSONToProlog(){

	console.log(myDiagram.model.toJSON());
	var mapJSON = JSON.parse(myDiagram.model.toJSON());

	var nodeData = mapJSON["nodeDataArray"];
	var linkData = mapJSON["linkDataArray"];

	var nodes = new Object();

	for(var i = 0; i < nodeData.length; i++){
		var node = nodeData[i];
		nodes[node["key"]] = node["text"];
	}

	var prologString = '';

	for(var i = 0; i < linkData.length; i++){

		var link = linkData[i];
		prologString = prologString + "rel(" + nodes[link["from"]] + ',' + link["text"] + ',' + nodes[link["to"]] + ").\n";
	}

	return prologString;

}


function runPNL(query){

	var sendAskJson = { "pergunta": query,
			};
	$.when(
		$.ajax({
			type: "POST",
	       		url : "http://localhost:9000/tradutorws" ,
			dataType : "json",
			accept: "application/json",
		   	contentType: "application/json; charset=UTF-8", 
			
			success : function (response) {
				runSwish(response);
				return response;
			},
			data: JSON.stringify(sendAskJson)
	    		}).fail(function(response){
				console.log(response);
			})

	    	);
}

function runSwish(questions){

	var prologCode = fromJSONToProlog() + prologRules;

	for (var key in questions) {
		  if (questions.hasOwnProperty(key)) {
			  	var sendJson = { "src_text": prologCode,
				 "format":"json",
				 "application":"swish",
				 "ask": query,
				 "chunk": 10000 //TODO definir uma variavel para o tamanho
				};
				
				$.when(
					$.ajax({
						type: "POST",
				       		url : "http://swish.swi-prolog.org/pengine/create" ,
						dataType : "json",
						accept: "application/json",
					   	contentType: "application/json; charset=UTF-8", 
						success : function (response) {
							showAnswer(response["answer"]);
						},
						data: JSON.stringify(sendJson)
				    		}).fail(function(response){
							console.log(response);
						})
			
	    				);
		  }
	}
}




function saveMap(){
        var sd_mapTitle = document.getElementById('mapTitle').value;
        var sd_mapQuestion = document.getElementById('question').value;
        var sd_mapDescription = document.getElementById('description').value;
        var sd_mapAuthor;
        if(localStorage.getItem("cmpaasid")){
            sd_mapAuthor =localStorage.getItem("cmpaasid");
        }else{
            sd_mapAuthor = 1;
	}

        var sendInfo = {
            title: sd_mapTitle,
            question: sd_mapQuestion,
            description: sd_mapDescription,
            author: sd_mapAuthor
        };
	

	console.log("savemap");
    $.when(
	$.ajax({
            type: "POST",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/maps/",
            dataType: "json",
            accept: "application/json",
            contentType: "application/json; charset=UTF-8", // This is the money shot
            success: function(data){
                localStorage.setItem("mapId", data['id']);
                localStorage.setItem("mapTitle", data['title']);
                localStorage.setItem("mapQuestion", data['question']);
                localStorage.setItem("mapDescrition", data['description']);
                localStorage.setItem("mapCreatedDate", data['created_date']);
            },
            data: JSON.stringify(sendInfo)
        }).fail(function(response){

        })
	

    ).then(function(){
        var sd_mapId = localStorage.getItem("mapId");
        var sd_mapContent = myDiagram.model.toJson();

        sendInfo = {
            map: sd_mapId,
            content: sd_mapContent
        }
        $.ajax({
            type: "POST",
            url: "http://platform.cmpaas.inf.ufes.br:8000/api/mapcontents/",
            dataType: "json",
            accept: "application/json",
            contentType: "application/json; charset=UTF-8", // This is the money shot
            success: function(data){
                localStorage.setItem("mapContentId", data['id']);
                localStorage.setItem("mapContent", data['content']);
                localStorage.setItem("mapContentCreatedDate", data['created_date']);
                localStorage.setItem("mapContentIdMap", data['map']);
                document.getElementById("information").innerHTML = "Mapa criado em> " + data['created_date'];
                document.getElementById("information").style.display = "inherit";
                document.getElementById("btNewVersion").innerText = "Criar Nova Versão";
                document.getElementById("btUpdateMap").disabled = false;
                document.getElementById("btNewMap").disabled = false;
                document.getElementById("btRemoveVersion").disabled = false;
                document.getElementById("btRemoveMap").disabled = false;
            },
            data: JSON.stringify(sendInfo)
        }).fail(function(response){
            document.getElementById("information").innerHTML = "Erro ao salvar o Mapa";
            document.getElementById("information").style.display = "inherit";
        })

    });
}

function newMap(){
    localStorage.removeItem("mapContent");
    localStorage.removeItem("mapContentCreatedDate");
    localStorage.removeItem("mapContentId");
    localStorage.removeItem("mapContentIdMap");
    localStorage.removeItem("mapCreatedDate");
    localStorage.removeItem("mapDescrition");
    localStorage.removeItem("mapId");
    localStorage.removeItem("mapQuestion");
    localStorage.removeItem("mapTitle");
    if(localStorage.getItem('unsaved')){
      localStorage.setItem('unsaved', false);
      localStorage.removeItem('unsavedData');
    }
    location.reload();
}
