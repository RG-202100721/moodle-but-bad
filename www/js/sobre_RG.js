window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		check();
		barra();
		viewBD();
	}
	else window.location.href = "/";
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Sobre";
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("barraNav")[0].getElementsByTagName("a")[4].setAttribute("class", "ativo");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[0].setAttribute("class", "");
	document.body.getElementsByClassName("footerLink")[0].getElementsByTagName("a")[4].setAttribute("class", "ativo");
	document.getElementsByTagName("span")[2].nextElementSibling.remove();
	document.getElementsByTagName("span")[2].nextElementSibling.remove();
	document.getElementsByTagName("span")[2].nextElementSibling.remove();
	document.getElementsByTagName("section")[0].setAttribute("style", "text-align: left;");
	var element = document.createElement("img");
	element.className = "logoSec";
	element.src = "images/moodle-but-bad.png";
	element.alt = "moodleButBad";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("h1");
	element.textContent = "Sobre o projeto";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("h2");
	element.textContent = "Um texto sobre quem fez este projeto e as ferramentas que foram utilizadas.";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("p");
	element.innerHTML = "Este projeto foi realizado, programado, construído, alterado e fabricado por <b>Rafael Gouveia</b>, <b>Nº202100721</b> da turma do <b>1º Ano - CTESP TPSI</b> do <b>Instituto Politécnico de Setúbal</b>.";
	element.innerHTML += "<br>Este projeto começou a ser realizado no dia 8 de Abril de 2022, com a sua entrega e avaliação final em Julho de 2022.";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("p");
	element.innerHTML = "Para a sua realização foram necessário 3 programas:";
	element.innerHTML += "<br>&emsp;&emsp;<b>Visual Studio Code</b> - Criação, alteração e visualização do código;";
	element.innerHTML += "<br>&emsp;&emsp;<b>PhpMyAdmin</b> - Criação, alteração e visualização dos registos da base de dados;";
	element.innerHTML += "<br>&emsp;&emsp;<b>Google Chrome</b> - Visualização das páginas web.";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("p");
	element.innerHTML = "Foram também utilizados 4 pacotes de software:";
	element.innerHTML += "<br>Server-Side:";
	element.innerHTML += "<br>&emsp;&emsp;<b>Node.js</b> - Runtime de <b>JavaScript</b> construído no \"motor\" V8 JavaScript do Chrome;";
	element.innerHTML += "<br>&emsp;&emsp;<b>express</b> - Web framework minimalista para o <b>Node.js</b>;";
	element.innerHTML += "<br>&emsp;&emsp;<b>mysql</b> - Driver de <b>Node.js</b> para comunicação com servidores MySQL.";
	element.innerHTML += "<br>Client-Side:";
	element.innerHTML += "<br>&emsp;&emsp;<b>sweetalert2</b> - Substituição para as caixas pop-up originais do <b>JavaScript</b>.";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("p");
	element.innerHTML = "Ao longo da realização do projeto foram também necessárias 3 linguagens de programação:<br>";
	element.innerHTML += "<b>HTML</b>, <b>CSS</b>, <b>Javacript</b> e <b>SQL</b>.";
	document.getElementsByTagName("section")[0].appendChild(element);
	element = document.createElement("p");
	element.className = "paginaPessoal";
	element.appendChild(document.createElement("a"));
	element.children[0].href = "https://github.com/RG-202100721/moodle-but-bad";
	element.children[0].target = "_blank";
	element.children[0].textContent = "GitHub";
	document.getElementsByTagName("section")[0].appendChild(element);
}