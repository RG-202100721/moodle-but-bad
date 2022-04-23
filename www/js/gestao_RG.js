window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		check();
		barra();

		if (typeof sessionStorage.getItem("table") === 'undefined' || sessionStorage.getItem("table") === null) sessionStorage.setItem("table", "disciplina");
		switch (sessionStorage.getItem("table")) 
		{
			case "aluno":
				document.getElementsByTagName("h2")[1].innerText = "Alunos";
				getAll("Aluno", () => { 
					buildTable(aluno);
					document.getElementById("create").setAttribute("onclick", "showCreateBox('Aluno')" );
					viewBD();
				});
				break;
			case "inscricao":
				document.getElementsByTagName("h2")[1].innerText = "Inscrições";
				getAll("Aluno", () => {
					getAll("Disciplina", () => {
						getAll("Inscricao", () => { 
							buildTable(inscricao);
							document.getElementById("create").setAttribute("onclick", "showCreateBox('Inscricao')" );
							viewBD();
						});
					});
				});
				break;	
			default:
				document.getElementsByTagName("h2")[1].innerText = "Disciplinas";
				getAll("Disciplina", () => { 
					buildTable(disciplina);
					document.getElementById("create").setAttribute("onclick", "showCreateBox('Disciplina')" );
					viewBD();
				});
				break;
		}
	}
	else window.location.href = "/";
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Gestão";
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[1].setAttribute("class", "ativo");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[1].setAttribute("class", "ativo");
	document.getElementsByTagName("h2")[0].innerText = "Utilize este espaço para fazer a gestão dos dados.";
	var div = document.createElement("div");
	div.className = "botoes";
	document.getElementById("info").appendChild(div);
	var input = document.createElement("input");
	input.type = "button";
	input.id = input.value = "Disciplinas";
	input.setAttribute("onclick", "changeTable('disciplina')");
	document.getElementsByClassName("botoes")[1].appendChild(input);
	input = document.createElement("input");
	input.type = "button";
	input.id = input.value = "Alunos";
	input.setAttribute("onclick", "changeTable('aluno')");
	document.getElementsByClassName("botoes")[1].appendChild(input);
	input = document.createElement("input");
	input.type = "button";
	input.id = input.value = "Inscrições";
	input.setAttribute("onclick", "changeTable('inscricao')");
	document.getElementsByClassName("botoes")[1].appendChild(input);
}
function changeTable(name) {
	sessionStorage.setItem("table", name);
	location.reload(1);
}