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
	
}