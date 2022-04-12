window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
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