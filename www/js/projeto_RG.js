//declaração das classes Javascript
class Turma 
{
	constructor(data) 
	{
		this.id = data["ID"];
		this.name = data["Nome"];
		this.year = data["Ano"];
		this.name_res = data["Nome_Responsavel"];
		this.email_res = data["Email_Responsavel"];
		this.course = data["Curso"];
	}
	getTableHead() {
		return	'<th style="color: #D68200">#</th><th style="color: #D68200">Nome</th><th style="color: #D68200">Ano</th><th style="color: #D68200">Nome do Responsável</th><th style="color: #D68200">Email do Responsável</th><th style="color: #D68200">Curso</th>';
	}
	getTableRow() {
		return  '<td>'+ this.id +'</td>' +
				'<td>'+ this.name +'</td>' +
				'<td>'+ this.year +'</td>' +
				'<td>'+ this.name_res +'</td>' +
				'<td>'+ this.email_res +'</td>' +
				'<td>'+ this.course +'</td>';
	}
}
class Aluno
{
	constructor(data) 
	{
		this.id = data["ID"];
		this.name = data["Nome"];
		this.birthday = data["Data_Nascimento"];
		this.gender = data["Genero"];
		this.email = data["Email"];
		this.photo_url = data["URLFoto"];
	}
	getHtmlBlock() {
		return  '<form id="form">' +
					'<label for="nome">Nome:</label>' +
					'<input id="nome" class="swal2-input" type="text" maxlength="255" value="'+ this.name +'">' +
					'<br><label for="data_nascimento">Data de Nascimento:</label>' +
					'<input id="data_nascimento" class="swal2-input" type="date" value="'+ this.birthday +'">' +
					'<div style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
						'<label for="genero">Género:</label>' +
						'<input id="mas" name="genero" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementById(\'mas\').value = \'M\'; document.getElementById(\'fem\').value = \'x\';">' +
						'<label for="mas">Masculino</label>' +
						'<input id="fem" name="genero" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementById(\'fem\').value = \'F\'; document.getElementById(\'mas\').value = \'x\';">' +
						'<label for="fem">Feminino</label></div>' +
					'<label for="email">Email:</label>' +
					'<input id="email" class="swal2-input" type="email" maxlength="50" value="'+ this.email +'">' +
					'<br><label for="url">URL Foto:</label>' +
	   				'<input id="url" class="swal2-input" type="url" maxlength="255" value="'+ this.photo_url +'">' +
				'</form>';
	}
	getTableHead() {
		var head = '<th>#</th><th>Nome</th><th>Data de Nascimento</th><th>Sexo</th><th>Email</th><th>URL Foto</th>';
		if (!window.location.href.includes("/informacao")) head += '<th>Ações</th>';
		return head;
	}
	getTableRow() {
		var html = 	'<td>'+ this.id +'</td>' +
					'<td>'+ this.name +'</td>' +
					'<td>'+ this.birthday +'</td>' +
					'<td>'+ this.gender +'</td>' +
					'<td>'+ this.email +'</td>' +
					'<td><img src="'+ this.photo_url +'"></td>';
		if (!window.location.href.includes("/informacao")) html += '<td><button type="button" class="botaoEditar" onclick="showEditBox(\'Aluno\', '+ this.id +')">Editar</button>' +
															'<button type="button" class="botaoApagar" onclick="deleteData(\'Aluno\', '+ this.id +')">Apagar</button></td>';
		return html;
	}
}
class Disciplina
{
	constructor(data) 
	{
		this.id = data["ID"];
		this.name = data["Nome"];
		this.staff = data["Docente"];
	}
	getHtmlBlock(){
		return 	'<form id="form">' +
                	'<label for="nome">Nome:</label>' +
                	'<input id="nome" class="swal2-input" type="text" maxlength="255" value="'+ this.name +'">' +
                	'<br><label for="docente">Docente:</label>' + 
                	'<input id="docente" class="swal2-input" type="text" maxlength="255" value="'+ this.staff +'">' +
            	'</form>';
	}
	getTableHead() {
		return '<th>#</th><th>Nome</th><th>Docente</th><th>Ações</th>'
	}
	getTableRow() {
		return	'<td>'+ this.id +'</td>' +
				'<td>'+ this.name +'</td>' +
				'<td>'+ this.staff +'</td>' +
				'<td><button type="button" class="botaoEditar" onclick="showEditBox(\'Disciplina\', '+ this.id +')">Editar</button>' +
				'<button type="button" class="botaoApagar" onclick="deleteData(\'Disciplina\', '+ this.id +')">Apagar</button></td>';
	}
}
class Inscricao
{
	constructor(data) 
	{
		this.id = data["ID"];
		this.id_subject = data["IDDisciplina"];
		this.id_student = data["IDAluno"];
		this.grade = data["Nota"];
	}
	getHtmlBlock(){
		return 	'<form id="form">' +
					'<label for="disciplina">Disciplina:</label>' +
					'<select id="disciplina" class="swal2-select"></select>' +
					'<br><label for="aluno">Aluno:</label>' +
					'<select id="aluno" class="swal2-select"></select>' +
					'<div class="swal2-range" style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
						'<label for="nota" style="margin-top: 12px; width: 50px;">Nota:</label>' +
						'<input id="nota" class="swal2-input" type="range" min="0" max="20" step=".01" value="'+ this.grade +'" oninput="this.nextElementSibling.value = this.value">' +
						'<input type="number" class="swal2-input" style="width: 60px; margin-left: 0px; margin-right: 0px;" min="0" max="20" step=".01" value="'+ this.grade +'" oninput="this.previousElementSibling.value = this.value"></div>' +
            	'</form>';
	}
	getTableHead() {
		return '<th>#</th><th>Disciplina</th><th>Aluno</th><th>Nota</th><th>Ações</th>'
	}
	getTableRow() {
		return	'<td>'+ this.id +'</td>' +
				'<td>'+ disciplina[this.id_subject - 1].name +'</td>' +
				'<td>'+ aluno[this.id_student - 1].name +'</td>' +
				'<td>'+ this.grade +'</td>' +
				'<td><button type="button" class="botaoEditar" onclick="showEditBox(\'Inscricao\', '+ this.id +')">Editar</button>' +
				'<button type="button" class="botaoApagar" onclick="deleteData(\'Inscricao\', '+ this.id +')">Apagar</button></td>';
	}
}
class Revisao
{
	constructor(data) 
	{
		this.index = revisao.length + 1;
		this.id = data["ID"];
		this.revision_day = data["Dia_Revisao"];
		this.id_subject = data["IDDisciplina"];
		this.id_student = data["IDAluno"];
		this.grade_before = data["Nota_Antes"];
		this.grade_after = data["Nota_Depois"];
		this.in_effect = data["Efetivada"];
		this.closed = data["Fechada"];
	}
	getHtmlBlock()
	{
		return	'<form id="form">' +
					'<label for="dia_revisao">Dia de Revisão:</label>' +
					'<input id="dia_revisao" class="swal2-input" type="date" value="'+ this.revision_day +'">' +
					'<br><label for="disciplina">Disciplina:</label>' +
					'<select id="disciplina" class="swal2-select"></select>' +
					'<br><label for="aluno">Aluno:</label>' +
					'<select id="aluno" class="swal2-select"></select>' +
					'<div class="swal2-range" style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
						'<label for="nota_antes">Nota Antes:</label>' +
						'<input id="nota_antes" class="swal2-input" type="range" min="0" max="20" step=".01" value="'+ this.grade_before +'" oninput="this.nextElementSibling.value = this.value">' +
						'<input type="number" class="swal2-input" style="width: 60px; margin-left: 0px; margin-right: 0px;" min="0" max="20" step=".01" value="'+ this.grade_before +'" oninput="this.previousElementSibling.value = this.value"></div>' +
					'<div class="swal2-range" style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
						'<label for="nota_depois">Nota Depois:</label>' +
						'<input id="nota_depois" class="swal2-input" type="range" min="0" max="20" step=".01" value="'+ this.grade_after +'" oninput="this.nextElementSibling.value = this.value">' +
						'<input type="number" class="swal2-input" style="width: 60px; margin-left: 0px; margin-right: 0px;" min="0" max="20" step=".01" value="'+ this.grade_after +'" oninput="this.previousElementSibling.value = this.value"></div>' +
					'<div style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
						'<label for="efetivada">Efetivada:</label>' +
						'<input id="sim" name="efetivada" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementsByName(\'efetivada\')[0].value = \'S\'; document.getElementsByName(\'efetivada\')[1].value = \'x\';">' +
						'<label for="sim">Sim</label>' +
						'<input id="nao" name="efetivada" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementsByName(\'efetivada\')[1].value = \'N\'; document.getElementsByName(\'efetivada\')[0].value = \'x\';">' +
						'<label for="nao">Não</label></div>' +
					'<div style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
						'<label for="fechada">Fechada:</label>' +
						'<input id="sim" name="fechada" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementsByName(\'fechada\')[0].value = \'S\'; document.getElementsByName(\'fechada\')[1].value = \'x\';">' +
						'<label for="sim">Sim</label>' +
						'<input id="nao" name="fechada" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementsByName(\'fechada\')[1].value = \'N\'; document.getElementsByName(\'fechada\')[0].value = \'x\';">' +
						'<label for="nao">Não</label></div>' +
				'</form>';
	}
	getTableHead() {
		return '<th>#</th><th>Dia da Revisão</th><th>Disciplina</th><th>Aluno</th><th>Nota Antes</th><th>Nota Depois</th><th>Efetivada</th><th>Fechada</th><th>Ações</th>';
	}
	getTableRow() {
		var html = '<td>'+ this.id +'</td>' +
				'<td>'+ this.revision_day +'</td>' +
				'<td>'+ disciplina[this.id_subject - 1].name +'</td>' +
				'<td>'+ aluno[this.id_student - 1].name +'</td>' +
				'<td>'+ this.grade_before +'</td>' +
				'<td>'+ this.grade_after +'</td>' +
				'<td>'+ this.in_effect +'</td>' +
				'<td>'+ this.closed +'</td>';
		if (window.location.href.includes("/index")) html += '<td><button type="button" class="botaoEditar" onclick="showEditBox(\'Revisao\', '+ this.index +')">Editar</button></td>';
		else html += '<td><button type="button" class="botaoEditar" onclick="showEditBox(\'Revisao\', '+ this.id +')">Editar</button>'+
					'<button type="button" class="botaoApagar" onclick="deleteData(\'Revisao\', '+ this.id +')">Apagar</button></td>';
		return html;
	}
}

//inicialização das classes Javascript
function check()
{
	if (typeof turma === 'undefined' || turma === null) 
	{
		turma = new Array();
		aluno = new Array();
		disciplina = new Array();
		inscricao = new Array();
		revisao = new Array();
	}
}

//função de saída da conta do professor
function exit()
{
	sessionStorage.clear();
	localStorage.clear();
	window.location.href = "/";
}

//mostra os conteúdos das classes na consola
function viewBD()
{
	if (typeof turma !== 'undefined' || turma !== null) 
	{
		console.log("Turmas\n"); console.log(turma);
		console.log("\nAlunos\n"); console.log(aluno);
		console.log("\nDisciplinas\n"); console.log(disciplina);
		console.log("\nInscrições\n"); console.log(inscricao);
		console.log("\nRevisões\n"); console.log(revisao);
	}
}

//contrução da tabela com os conteúdos da base de dados
function buildTable(data) {
	var trHTML = '', x = 0;
	trHTML += `<tr>${data[x].getTableHead()}</tr>`;
	while (data[x] != null) {
		if (data == turma && data[x].id != 1) break;
		trHTML += `<tr>${data[x].getTableRow()}</tr>`;
		x++;
	}
	document.getElementById("table").innerHTML = trHTML;
	document.getElementById("info").style.display = "";	
}

//função de tranformação de uma variável string em HTMLDocument
function parseHTMLString(str) {
	const parser = new DOMParser();
	str = parser.parseFromString(str, "text/html");
	return str;
};

//criação do form onde o utilizador insire os dados
function showCreateBox(table) {
    var html = title = '';
    switch (table) {
        case "Aluno":
            title = "Criar Aluno";
			var test = new Aluno('test','test','test','test','test');
			html = parseHTMLString(test.getHtmlBlock());
			html.getElementById("form").reset();
			var inputs = html.getElementsByTagName('input');
			for(var i = 0; i < inputs.length; i++) if(inputs[i].value == 'undefined') { inputs[i].value = "";}
			html = html.getElementById("form");
            break;
        case "Disciplina":
            title = "Criar Disciplina";
			var test = new Aluno('test','test','test','test','test');
			html = parseHTMLString(test.getHtmlBlock());
			html.getElementById("form").reset();
			var inputs = html.getElementsByTagName('input');
			for(var i = 0; i < inputs.length; i++) if(inputs[i].value == 'undefined') { inputs[i].value = "";}
			html = html.getElementById("form");
            break;
		case "Revisao":
			title = "Criar Revisão";
			var test = new Revisao('test','test','test','test','test','test','test','test');
			html = parseHTMLString(test.getHtmlBlock());
			html.getElementById("form").reset();
			html.getElementById("nota_antes").value = 0;
			html.getElementById("nota_antes").nextElementSibling.value = 0;
			html.getElementById("nota_depois").value = 0;
			html.getElementById("nota_depois").nextElementSibling.value = 0;
			var options = '<option selected disabled></option>';
			for(var i = 0; i < disciplina.length; i++) options += `<option value="${i + 1}">${disciplina[i].name}</option>`;
			html.getElementById("disciplina").innerHTML += options;
			options = '<option selected disabled></option>';
			for(var i = 0; i < aluno.length; i++) options += `<option value="${i + 1}">${aluno[i].name}</option>`;
			html.getElementById("aluno").innerHTML += options;
			var inputs = html.getElementsByTagName('input');
			for(var i = 0; i < inputs.length; i++) if(inputs[i].value == 'undefined') { inputs[i].value = "";}
			html = html.getElementById("form");
			break;
		case "Inscricao":
			title = "Criar Inscrição";
			var test = new Inscricao('test','test','test','test');
			html = parseHTMLString(test.getHtmlBlock());
			html.getElementById("form").reset();
			html.getElementById("nota").value = 0;
			html.getElementById("nota").nextElementSibling.value = 0;
			var options = '<option selected disabled></option>';
			for(var i = 0; i < disciplina.length; i++) options += `<option value="${i + 1}">${disciplina[i].name}</option>`;
			html.getElementById("disciplina").innerHTML += options;
			options = '<option selected disabled></option>';
			for(var i = 0; i < aluno.length; i++) options += `<option value="${i + 1}">${aluno[i].name}</option>`;
			html.getElementById("aluno").innerHTML += options;
			var inputs = html.getElementsByTagName('input');
			for(var i = 0; i < inputs.length; i++) if(inputs[i].value == 'undefined') { inputs[i].value = "";}
			html = html.getElementById("form");
			break;
	}
	formCheck(title, html, () => { createData(table); });
}

//busca os dados do registo selecionado e cria um form para eventual edição
function showEditBox(table, id) {
    var html = title = '';
    switch (table) {
        case "Aluno":
            title = "Editar Aluno (ID:"+ aluno[id - 1].id +")";
            html = parseHTMLString(aluno[id - 1].getHtmlBlock());
		    if (aluno[id - 1].gender == 'M') {
				html.getElementById("mas").checked = true;
				html.getElementById('mas').value = 'M';
				html.getElementById('fem').value = 'x';
			}
			else {
				html.getElementById("fem").checked = true;
				html.getElementById('mas').value = 'x';
				html.getElementById('fem').value = 'F';
			}
            break;
        case "Disciplina":
            title = "Editar Disciplina (ID:"+ disciplina[id - 1].id +")";
            html = parseHTMLString(disciplina[id - 1].getHtmlBlock());
            break;
		case "Revisao":
			title = "Editar Revisao (ID:"+ revisao[id - 1].id +")";
			html = parseHTMLString(revisao[id - 1].getHtmlBlock());
			if (revisao[id - 1].in_effect == 'S') {
				html.getElementsByName("efetivada")[0].setAttribute('checked', true);
				html.getElementsByName("efetivada")[0].value = 'S';
				html.getElementsByName("efetivada")[1].value = 'x';
			}
			else {
				html.getElementsByName("efetivada")[1].setAttribute('checked', true);
				html.getElementsByName("efetivada")[0].value = 'x';
				html.getElementsByName("efetivada")[1].value = 'N';
			}
			if (revisao[id - 1].closed == 'S') {
				html.getElementsByName("fechada")[0].setAttribute('checked', true);
				html.getElementsByName("fechada")[0].value = 'S';
				html.getElementsByName("fechada")[1].value = 'x';
			}
			else {
				html.getElementsByName("fechada")[1].setAttribute('checked', true);
				html.getElementsByName("fechada")[0].value = 'x';
				html.getElementsByName("fechada")[1].value = 'N';
			}
			if (window.location.href.includes("/index")) {
				var inner = html.getElementById("form").querySelectorAll("div")[2].outerHTML;
				inner += html.getElementById("form").querySelectorAll("div")[3].outerHTML;
				html.getElementsByTagName("form")[0].innerHTML = inner;
			}
			else {
				var options = '<option selected disabled></option>';
				for(var i = 0; i < disciplina.length; i++) {
					if (revisao[id - 1].id_subject == disciplina[i].id) options += `<option value="${i + 1}" selected>${disciplina[i].name}</option>`;
					else options += `<option value="${i + 1}">${disciplina[i].name}</option>`;
				}
				html.getElementById("disciplina").innerHTML += options;
				options = '<option selected disabled></option>';
				for(var i = 0; i < aluno.length; i++) {
					if (revisao[id - 1].id_student == aluno[i].id) options += `<option value="${i + 1}" selected>${aluno[i].name}</option>`;
					else options += `<option value="${i + 1}">${aluno[i].name}</option>`;
				}
				html.getElementById("aluno").innerHTML += options;
			}
			break;
		case "Inscricao":
            title = "Editar Inscrição (ID:"+ inscricao[id - 1].id +")";
            html = parseHTMLString(inscricao[id - 1].getHtmlBlock());
			var options = '<option selected disabled></option>';
			for(var i = 0; i < disciplina.length; i++) {
				if (inscricao[id - 1].id_subject == disciplina[i].id) options += `<option value="${i + 1}" selected>${disciplina[i].name}</option>`;
				else options += `<option value="${i + 1}">${disciplina[i].name}</option>`;
			}
			html.getElementById("disciplina").innerHTML += options;
			options = '<option selected disabled></option>';
			for(var i = 0; i < aluno.length; i++) {
				if (inscricao[id - 1].id_student == aluno[i].id) options += `<option value="${i + 1}" selected>${aluno[i].name}</option>`;
				else options += `<option value="${i + 1}">${aluno[i].name}</option>`;
			}
			html.getElementById("aluno").innerHTML += options;
            break;
	}
	html = html.getElementById("form");
	formCheck(title, html, () => { editData(table, id); });
}

//verifica se todos os campos estão preenchidos
function formCheck(title, html, callback) {
	Swal.fire({
        title: title,
        html: html,
        focusConfirm: false,
        preConfirm: () => { 
            var pass = true;
            var form = document.forms["form"].elements;
            for (var i = 0; i < form.length; i++) if (form[i].value == null || form[i].value == "") pass = false;
            if (pass == false) {
                Swal.fire({
                    icon: 'error',
                    text: 'Não preencheu todos os campos!'
                });
            }
            else callback();
        }
    });
}

//agrupa os valores dos inputs em JSON para serem enviados
function formInputs(table, id) {
	var inputs = new Array();
    var form = document.forms["form"].elements;
    for (var i = 0; i < form.length; i++) 
    {
        if ((i == 2 || i == 3) && form[i].value == 'x' && table == 'Aluno') {  }
		else if ((i == 7 || i == 8 || i == 9 || i == 10) && form[i].value == 'x' && table == 'Revisao') {  }
		else if ((i == 3 || i == 5) && table == 'Revisao' && !window.location.href.includes("/index")) {  }
		else if ((i == 0 || i == 1 || i == 2 || i == 3) && form[i].value == 'x' && table == 'Revisao' && window.location.href.includes("/index")) {  }
        else inputs.push(form[i].value);
    }
    var data;
    switch (table) {
        case "Aluno":
            data = JSON.stringify({ 
                "Tabela": table,
				"ID": id,
                "Nome": inputs[0], 
                "Data_Nascimento": inputs[1], 
                "Genero": inputs[2], 
                "Email": inputs[3], 
                "URLFoto": inputs[4]
            });
            break;
        case "Disciplina":
            data = JSON.stringify({ 
                "Tabela": table,
				"ID": id,
                "Nome": inputs[0], 
                "Docente": inputs[1]
            });
            break;
		case "Revisao":
			if (window.location.href.includes("/index")) {
				data = JSON.stringify({ 
					"Tabela": table,
					"ID": revisao[id - 1].id,
					"Dia_Revisao": revisao[id - 1].revision_day,
					"IDDisciplina": revisao[id - 1].id_subject,
					"IDAluno": revisao[id - 1].id_student,
					"Nota_Antes": revisao[id - 1].grade_before,
					"Nota_Depois": revisao[id - 1].grade_after,
					"Efetivada": inputs[0],
					"Fechada": inputs[1]
				});
			}
			else {
				data = JSON.stringify({ 
					"Tabela": table,
					"ID": id,
					"Dia_Revisao": inputs[0],
					"IDDisciplina": inputs[1],
					"IDAluno": inputs[2],
					"Nota_Antes": inputs[3],
					"Nota_Depois": inputs[4],
					"Efetivada": inputs[5],
					"Fechada": inputs[6]
				});
			}
            break;
		case "Inscricao":
			data = JSON.stringify({ 
				"Tabela": table,
				"ID": id,
				"IDDisciplina": inputs[0],
				"IDAluno": inputs[1],
				"Nota": inputs[2]
			});
			break;
    }
	return data;
}