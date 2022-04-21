window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		check();
		barra();
		getAll("Aluno", () => {
			getAll("Disciplina", () => {
				getAll("Inscricao", () => {
					getAll("RevisaoIndex", () => {
						if (revisao.length == 0) {
							document.getElementById("info").innerHTML = "";
							document.getElementById('err').innerHTML = '0 resultados.<br><br>';
						}
						else {
							buildTable(revisao);
							document.getElementById("create").setAttribute("onclick", "showCreateBox('Revisao')" );
						}
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
	document.title = "Moodle but bad // Página Inicial";
	document.getElementsByTagName("h2")[0].innerText = "Utilize este espaço para alterar o estado das revisões do dia.";
	document.getElementsByTagName("h2")[1].innerText = "Revisões do dia";
}