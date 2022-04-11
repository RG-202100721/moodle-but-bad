window.onload = function()
{
	if (sessionStorage.getItem("uti") !== null && sessionStorage.getItem("uti") != "") {
		reconstructHTML();
		account();
		check();
		barra();
		viewBD();
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
}