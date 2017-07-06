package controllers;

import java.util.ArrayList;
import java.util.List;
import play.mvc.*;
import models.Conceito;
import models.Pergunta;
import models.PerguntaPl;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Application extends Controller {

	static String url = "http://localhost:9000/tradutor";

	private static final Form<String> formqs = Form.form(String.class);

	public static Result index() {
		return ok(index.render("Your new application is ready."));
	}

	public static List<String> tradutor(Pergunta per) {
		List<String> pergpl = new ArrayList<String>();
		if (Pergunta.find.where("pergunta = '" + per.getPergunta() + "'").findRowCount() != 0) {			
			Pergunta p = Pergunta.find.where("pergunta = '" + per.getPergunta() + "'").findUnique();			
			
			for(PerguntaPl ppl: p.perguntapls)
				pergpl.add(ppl.getPergunta(p));			
			return pergpl;
		}
		RequestVISL pln = new RequestVISL(per.getPergunta());
		ArrayList<String> resp = pln.getRequestResponse();
		for(String r:resp)
			System.out.println(r);
		per.trataPergunta(resp);
		
		// primeito filtro
		List<PerguntaPl> pls = per.filtroTipoPergunta();


		// segundo filtro
		List<PerguntaPl> auxpls = per.filtroQuantParametros(pls);
		if(pls==null)
			pls = auxpls;
		else if (auxpls.size() < pls.size() && auxpls.size() > 0)
			pls = auxpls;

		// terceiro filtro
		auxpls = per.filtroPalavraChave(pls);
		if (auxpls.size() < pls.size() && auxpls.size() > 0)
			pls = auxpls;
		for (PerguntaPl pl : pls) {
			per.perguntapls.add(pl);

		}
		//per.saveTipoResposta();
		//per.save();
		for(PerguntaPl ppl: per.perguntapls){
			pergpl.add(ppl.getPergunta(per));

		}
		return pergpl;
	}

	public static Result tradutorWeb() {
		Form<String> form = formqs.bindFromRequest();
		String pergunta = form.data().get("question");
		System.out.println(pergunta);
		Pergunta p = new Pergunta(pergunta.toLowerCase());
		List<String> pls = tradutor(p);
		return ok(aswer.render(pls));
	}

	public static Result tradutorws() {
		JsonNode json = request().body().asJson();
		if (json == null) {
			return badRequest("Expecting Json data");
		} else {
			String pergunta = json.findPath("pergunta").textValue();
			if (pergunta == null) {
				return badRequest("Missing parameter [pergunta]");
			} else {
				Pergunta p = new Pergunta(pergunta.toLowerCase());
				List<String> pls = tradutor(p);
				ObjectNode result = Json.newObject();
				int i = 1;
				for (String pl : pls) {
					result.put("perguntapl" + i, pl);
					i++;
				}

				response().setHeader("Access-Control-Allow-Origin", "*");
				return ok(result);
			}
		}
	}
	
	
	public static Result checkPreFlight() {
    		response().setHeader("Access-Control-Allow-Origin", "*");       // Need to add the correct domain in here!!
    		response().setHeader("Access-Control-Allow-Methods", "POST");   // Only allow POST
    		response().setHeader("Access-Control-Max-Age", "300");          // Cache response for 5 minutes
    		response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");         // Ensure this header is also allowed!  
   		 return ok();
	}

}