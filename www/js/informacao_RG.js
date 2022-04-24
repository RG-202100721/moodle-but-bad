window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		check();
		barra();
		getAll("Aluno", () => {
			getAll("Disciplina", () => {
				getAll("Inscricao", () => {
					getAll("Turma", () => {
						buildTable(turma);
						addTable(2, "Alunos (Nenhum Filtro)");
						buildTable(aluno);
						viewBD();
					});
				});
			});
		});
	}
	else window.location.href = "/";
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Informação";
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[2].setAttribute("class", "ativo");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[2].setAttribute("class", "ativo");
	document.getElementsByTagName("h2")[0].innerText = "Utilize este espaço para pesquisar dados.";
	document.getElementsByClassName("botoes")[0].innerHTML = '<h2 style="margin-left: auto; margin-right: auto; font-size: 25px;">Turma</h2>';
}
//adiciona uma tabela ao corpo do html
function addTable(n, text) {
	document.getElementById("info").id = "info" + n;
	document.getElementById("table").id = "table" + n;
	document.getElementsByTagName("aside")[0].innerHTML += 	'<div class="info" id="info" style="display: none;">' +
																'<div class="botoes">' +
																	'<h2 style="font-size: 25px;"></h2>' +
																	'<input type="button" id="filter" value="Filtrar"/></div>' +
																'<table id="table"></table></div>';
	document.getElementById("filter").setAttribute("onclick", "filtrarDisciplina()");
	document.getElementsByTagName("h2")[n].innerText = text;
}
//filtra a tabela Alunos por uma disciplina selecionada pelo utilizador
function filtrarDisciplina() {
	var html = '<form id="form"><select id="disciplina" class="swal2-select">';
	var options = '<option value="0" selected>Nenhum Filtro</option>';
	for(var i = 0; i < disciplina.length; i++) options += `<option value="${i + 1}">${disciplina[i].name}</option>`;
	html += options + '</select></form>';
	Swal.fire({
		title: "Escolha a disciplina que pretende usar como filtro.",
        html: html,
        focusConfirm: false,
        preConfirm: () => { 
			var id = document.forms["form"].elements[0].value;
			if (id == 0) location.reload(1);
			else {
				document.getElementsByTagName("h2")[2].innerText = `Alunos (${disciplina[id - 1].name})`;
				var table, tr;
				table = document.getElementById("table");//
				tr = table.getElementsByTagName("tr");
				for (var x = 0; x < aluno.length; x++) {
					for (var i = 0; i < inscricao.length; i++) 
						if (inscricao[i].id_subject == id && inscricao[i].id_student == x + 1) { tr[x + 1].style.display = ""; break;}
						else tr[x + 1].style.display = "none";
				}
			}
        }
    });
}