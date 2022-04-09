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
}
class Revisao
{
	constructor(data) 
	{
		this.revision_day = data["Dia_Revisao"];
		this.id_subject = data["IDDisciplina"];
		this.id_student = data["IDAluno"];
		this.grade_before = data["Nota_Antes"];;
		this.grade_after = data["Nota_Depois"];;
		this.in_effect = data["Efetivada"];;
		this.closed = data["Fechada"];
	}
}

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

function exit()
{
	sessionStorage.setItem('sair', true);
	window.location.href = 'index.html';
}

function reset()
{	
	sessionStorage.clear();
	localStorage.clear();
	window.location.href = 'index.html';
}

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

function buildTable(table) {
	var trHTML = '', x = 0, query;
	getAll(table, (result) => { 
		if (result[x] != null) trHTML = '<tr>';
		else trHTML = '0 results.';
		while (result[x] != null) {
			switch (table) {
				case "Turma":
					turma.push(new Turma(result[x]));
					query = new Turma(result[x]);                    
					trHTML += '<td>'+ query.id +'</td>';
					trHTML += '<td>'+ query.name +'</td>';
					trHTML += '<td>'+ query.year +'</td>';
					trHTML += '<td>'+ query.name_res +'</td>';
					trHTML += '<td>'+ query.email_res +'</td>';
					trHTML += '<td>'+ query.course +'</td>';
					break;              
				case "Aluno":
					aluno.push(new Aluno(result[x]));
					query = new Aluno(result[x]);
					trHTML += '<td>'+ query.id +'</td>';
					trHTML += '<td>'+ query.name +'</td>';
					aluno[x].birthday = query.birthday = query.birthday.split("T")[0];
					trHTML += '<td>'+ query.birthday +'</td>';
					trHTML += '<td>'+ query.gender +'</td>';
					trHTML += '<td>'+ query.email +'</td>';
					trHTML += '<td><img src="'+ query.photo_url +'"></td>';
					break;
				case "Disciplina":
					disciplina.push(new Disciplina(result[x]));
					query = new Disciplina(result[x]);
					trHTML += '<td>'+ query.id +'</td>';
					trHTML += '<td>'+ query.name +'</td>';
					trHTML += '<td>'+ query.staff +'</td>';
					break;
				case "Inscricao":
					inscricao.push(new Inscricao(result[x]));
					query = new Inscricao(result[x]);
					trHTML += '<td>'+ query.id +'</td>';
					trHTML += '<td>'+ query.id_subject +'</td>';
					trHTML += '<td>'+ query.id_student +'</td>';
					trHTML += '<td>'+ query.grade +'</td>';
					break;
				case "Revisao":
					revisao.push(new Revisao(result[x]));
					query = new Revisao(result[x]);
					revisao[x].revision_day = query.revision_day = query.revision_day.split("T")[0];
					trHTML += '<td>'+ query.revision_day +'</td>';
					trHTML += '<td>'+ query.id_subject +'</td>';
					trHTML += '<td>'+ query.id_student +'</td>';
					trHTML += '<td>'+ query.grade_before +'</td>';
					trHTML += '<td>'+ query.grade_after +'</td>';
					trHTML += '<td>'+ query.in_effect +'</td>';
					trHTML += '<td>'+ query.closed +'</td>';
					break;
			}
			trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showEditBox(\''+ table +'\', '+ query.id +')">Edit</button>';
			trHTML += '<button type="button" class="btn btn-outline-danger" onclick="deleteData(\''+ table +'\', '+ query.id +')">Del</button></td>';
			trHTML += "</tr>";
			x++;
		}
		document.getElementById("test").innerHTML += trHTML;
	});
}

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
            html = 	'<form id="form">' +
						'<label for="nome">Nome:</label>' +
						'<input id="nome" class="swal2-input" type="text" maxlength="255" value="">' +
						'<br><label for="data_nascimento">Data de Nascimento:</label>' +
						'<input id="data_nascimento" class="swal2-input" type="date" value="">' +
						'<div style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: nowrap; margin-top: 10px;">' +
							'<label for="genero">Género:</label>' +
							'<input id="mas" name="genero" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementById(\'mas\').value = \'M\'; document.getElementById(\'fem\').value = \'x\';">' +
							'<label for="mas">Masculino</label>' +
							'<input id="fem" name="genero" class="swal2-input" type="radio" value="" style="margin-bottom: 6px; margin-top: 6px;" onclick="document.getElementById(\'fem\').value = \'F\'; document.getElementById(\'mas\').value = \'x\';">' +
							'<label for="fem">Feminino</label></div>' +
						'<label for="email">Email:</label>' +
						'<input id="email" class="swal2-input" type="email" maxlength="50" value="">' +
						'<br><label for="url">URL Foto:</label>' +
			   			'<input id="url" class="swal2-input" type="url" maxlength="255" value="">' +
					'</form>';
            break;
        case "Disciplina":
            title = "Criar Disciplina";
            html = 	'<form id="form">' +
						'<label for="nome">Nome:</label>' +
						'<input id="nome" class="swal2-input" type="text" maxlength="255" value="">' +
						'<br><label for="docente">Docente:</label>' + 
						'<input id="docente" class="swal2-input" type="text" maxlength="255" value="">' +
					'</form>';
            break;
		case "Revisao":
			title = "Criar Revisão";
			html = 	'<form id="form">' +
						'<label for="">:</label>' +
						'<input id="" class="swal2-input" type="text" maxlength="255" value="">' +
					'</form>';
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
			html = html.getElementById("form");
            break;
        case "Disciplina":
            title = "Editar Disciplina (ID:"+ disciplina[id - 1].id +")";
            html = parseHTMLString(disciplina[id - 1].getHtmlBlock());
			html = html.getElementById("form");
            break;
		case "Revisao":
			title = "Editar Revisao (ID:"+ revisao[id - 1].id +")";
			html = '';
			break;
    }
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
                    text: 'Não preencheu todos os campos!',
                    allowOutsideClick: false,
                    allowEscapeKey: false
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
        if ((i == 2 || i == 3) && form[i].value == 'x' && table == 'Aluno') { } 
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
            data = JSON.stringify({ 
				"Tabela": table,
				"ID": id
            });
            break;
    }
	return data;
}