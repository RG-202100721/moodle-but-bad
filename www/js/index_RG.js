window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		//account(); 
		check();
		barra();
		//buildTable("Aluno");
		//document.getElementById("b1").setAttribute("onclick", "showCreateBox('Aluno')" );
		viewBD();
	}
	else window.location.href = "/";
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Página Inicial";

}

function account()
{
	document.getElementById("info").innerHTML = "";
	
	if (sessionStorage.getItem("uti") !== null) { document.getElementById("info").innerHTML = '<h2>Perfil Atual:</h2><h5 style="font-weight: bold;">' + sessionStorage.getItem("uti") + '</h5><br><br>'; }
	else { document.getElementById("info").innerHTML = '<h2>Perfil Atual:</h2><h5 style="font-weight: bold;">Error</h5><br><br>'; }
	
	if (sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") != 0) 
	{
		document.getElementById('regi').value = 'Alterar Detalhes';
		document.getElementById('regi').setAttribute('onClick', 'alterar()');
	}
	else 
	{
		document.getElementById('regi').value = 'Apagar Contas';
		document.getElementById('regi').setAttribute('onClick', 'apagar()');
	}
	
	document.getElementById("logi").value = "Sair";
	document.getElementById("logi").setAttribute("onClick", "exit();" ); 
	document.getElementById("info").style.display = "contents";
}