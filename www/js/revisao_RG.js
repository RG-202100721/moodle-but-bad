window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		check();
		barra();
		getAll("Aluno", () => {
			getAll("Disciplina", () => {
				getAll("Revisao", () => {
					buildTable(revisao);
					document.getElementById("create").setAttribute("onclick", "showCreateBox('Revisao');" );
					document.getElementById("filter").setAttribute("onclick", "filtrarDisciplina()" );
					viewBD();
				});
			});
		});
	}
	else window.location.href = "/";
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Revisão";
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[3].setAttribute("class", "ativo");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[3].setAttribute("class", "ativo");
	document.getElementsByTagName("h2")[0].innerText = "Utilize este espaço para efetuar/filtrar revisões.";
	document.getElementsByTagName("h2")[1].innerText = "Revisões";
	var button = document.createElement("input");
	button.type = "button";
	button.id = "filter";
	button.value = "Filtrar";
	document.getElementsByClassName("botoes")[0].appendChild(button);
	var div = document.createElement("div");
	div.className = "botoes";
	div.style.display = "none";
	document.getElementById("info").appendChild(div);
	document.getElementsByClassName("botoes")[1].innerHTML = '<h2 style="margin-left: auto; margin-right: auto; font-size: 25px;"></h2>';
	div = document.createElement("div");
	div.className = "botoes";
	div.style.display = "none";
	document.getElementById("info").appendChild(div);
	var input = document.createElement("input");
	input.type = "button";
	input.id = "pWeek";
	input.value = "Anterior";
	input.setAttribute("onclick", "previousWeek()");
	document.getElementsByClassName("botoes")[2].appendChild(input);
	input = document.createElement("input");
	input.type = "button";
	input.id = "nWeek";
	input.value = "Seguinte";
	input.setAttribute("onclick", "nextWeek()");
	document.getElementsByClassName("botoes")[2].appendChild(input);
}
//filtra a tabela Revisoes por uma disciplina selecionada pelo utilizador e pelo tempo limite de uma semana
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
			idSubject = document.forms["form"].elements[0].value;
			if (idSubject == 0) location.reload(1);
			else {
				if (document.body.contains(document.getElementById("create"))) document.getElementById("create").remove();

				var today = new Date();
				var oneJan = new Date(today.getFullYear(),0,1);
				var numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
				week = Math.ceil((today.getDay() + 1 + numberOfDays) / 7);

				var before = new Date();
				before.setDate(before.getDate() - 6);
				if ((before.getMonth() + 1) <= 9) before = before.getFullYear() + '-0' + (before.getMonth() + 1) + '-' + before.getDate();
				else before = before.getFullYear() + '-' + (before.getMonth() + 1) + '-' + before.getDate();
				for (var d = new Date(before); d <= today; d.setDate(d.getDate() + 1))
					if (d.toDateString().split(" ")[0] == "Mon") { start = new Date(d); break; }
				end = new Date(start); 
				end.setDate(start.getDate() + 6);
				
				var before = '', after = '';
				if ((start.getMonth() + 1) <= 9) before = '0' + (start.getMonth() + 1) + '/' + start.getDate();
				else before = (start.getMonth() + 1) + '/' + start.getDate();
				if ((end.getMonth() + 1) <= 9) after = '0' + (end.getMonth() + 1) + '/' + end.getDate();
				else after = (end.getMonth() + 1) + '/' + end.getDate();

				document.getElementsByTagName("h2")[1].innerText = `Revisões (${disciplina[idSubject - 1].name})`;
				document.getElementsByTagName("h2")[2].innerText = `Semana ${week} de ${start.getFullYear()}\n\n${before} a ${after}`;
				document.getElementsByClassName("botoes")[1].style.display = "";
				document.getElementsByClassName("botoes")[2].style.display = "";

				logic();
			}
        }
    });
}
//verifica a semana anterior
function previousWeek() {
	start.setDate(start.getDate() - 7);
	end = new Date(start); 
	end.setDate(start.getDate() + 6);

	var oneJan = new Date(start.getFullYear(),0,1);
	var numberOfDays = Math.floor((start - oneJan) / (24 * 60 * 60 * 1000));
	week = Math.ceil((start.getDay() + 1 + numberOfDays) / 7);

	var before = '', after = '';
	if ((start.getMonth() + 1) <= 9) before = '0' + (start.getMonth() + 1) + '/' + start.getDate();
	else before = (start.getMonth() + 1) + '/' + start.getDate();
	if ((end.getMonth() + 1) <= 9) after = '0' + (end.getMonth() + 1) + '/' + end.getDate();
	else after = (end.getMonth() + 1) + '/' + end.getDate();

	document.getElementsByTagName("h2")[2].innerText = `Semana ${week} de ${start.getFullYear()}\n\n${before} a ${after}`;
	logic();
}
//verifica a semana seguinte
function nextWeek() {
	start.setDate(start.getDate() + 7);
	end = new Date(start); 
	end.setDate(start.getDate() + 6);

	var oneJan = new Date(start.getFullYear(),0,1);
	var numberOfDays = Math.floor((start - oneJan) / (24 * 60 * 60 * 1000));
	week = Math.ceil((start.getDay() + 1 + numberOfDays) / 7);

	var before = '', after = '';
	if ((start.getMonth() + 1) <= 9) before = '0' + (start.getMonth() + 1) + '/' + start.getDate();
	else before = (start.getMonth() + 1) + '/' + start.getDate();
	if ((end.getMonth() + 1) <= 9) after = '0' + (end.getMonth() + 1) + '/' + end.getDate();
	else after = (end.getMonth() + 1) + '/' + end.getDate();

	document.getElementsByTagName("h2")[2].innerText = `Semana ${week} de ${start.getFullYear()}\n\n${before} a ${after}`;
	logic();
}
//lógica que faz as comparações entre a disciplina e semana selecionadas
function logic() {
	var table, tr, pass = false;
	table = document.getElementById("table");
	tr = table.getElementsByTagName("tr");
	tr[0].style.display = "";
	document.getElementById('err').innerHTML = '';
	for (var i = 0; i < revisao.length; i++) {
		if (revisao[i].id_subject == idSubject && (new Date(revisao[i].revision_day) >= start && new Date(revisao[i].revision_day) <= end)) { 
			tr[i + 1].style.display = "";
			pass = true;
		}
		else tr[i + 1].style.display = "none";
	}
	if (pass == false) {
		tr[0].style.display = "none";
		document.getElementById('err').innerHTML = '0 resultados.<br><br>';
	}
}