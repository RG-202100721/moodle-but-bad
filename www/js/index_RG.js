window.onload = function()
{
	account(); 
	check();
	barra();
	//buildTable("Aluno");
	//document.getElementById("b1").setAttribute("onclick", "showCreateBox('Aluno')" );
	viewBD();
};

function account()
{
	document.getElementById('perfil').innerHTML += "<span>" + localStorage.getItem("uti") + "</span>";
	document.getElementById('perfil').style.display = 'block';
	document.getElementById("info").innerHTML = "";
	
	if (localStorage.getItem("uti") !== null) { 
		document.getElementById("info").innerHTML = '<h2>Perfil Atual:</h2><h5 style="font-weight: bold;">' + localStorage.getItem("uti") + '</h5><br><br>'; 
	}
	else { document.getElementById("info").innerHTML = '<h2>Perfil Atual:</h2><h5 style="font-weight: bold;">Error</h5><br><br>'; }
	
	
	document.getElementById("logi").value = "Sair";
	document.getElementById("logi").setAttribute("onClick", "exit();" ); 
	document.getElementById("info").style.display = "contents";
}