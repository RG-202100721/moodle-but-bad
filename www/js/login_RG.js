window.onload = function()
{
	if (sessionStorage.getItem("uti") === null || sessionStorage.getItem("uti") == "") {
		reconstructHTML();
		barra();
	}
	else window.location.href = "/index";
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Área do Professor";
	document.getElementsByTagName("h2")[0].innerText = "Utilize este espaço para entrar na sua conta.";
	document.body.getElementsByClassName("barraNav")[0].innerHTML = '<span class="barraNavSair">x</span><a style="font-size: 25px;">Área do Professor</a>';
	document.body.getElementsByTagName("aside")[0].innerHTML += '<div class="botoes"><input id="logi" name="logi" type="button" value="Entrar"/></div>';
	document.body.getElementsByClassName("footerLink")[0].innerHTML = '<li><a>Área do Professor</a></li>';
	document.getElementById("info").innerHTML = '<form id="acc" accept-charset="UTF-8">Utilizador:&nbsp;<input name="uti" type="text" class="texto" id="uti" maxlength="30"/><br>Password:&nbsp;<input name="pas" type="text" class="texto" id="pas" maxlength="255"/><br><br></form>';
	document.getElementById("logi").setAttribute("onClick", "login()" );
	document.getElementById("info").style.display = "";
}
function login() {
	var uti = document.forms[0].elements[0];
	if (uti.value != '') {
		sessionStorage.setItem(uti.id , uti.value);
		window.location.href = "/index";
	}
	else document.getElementById('err').innerHTML = 'Não preencheu todos os campos.<br><br>';
}