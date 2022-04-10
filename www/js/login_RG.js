window.onload = function()
{
	reconstructHTML();
	barra();
};

//altera o HTML da página base
function reconstructHTML() {
	document.title = "Moodle but bad // Área do Professor";
	document.body.getElementsByClassName("barraNav")[0].innerHTML = '<span class="barraNavSair">x</span><a style="font-size: 25px;">Área do Professor</a>';
	document.getElementsByTagName("aside")[0].innerHTML += '<div class="botoes"><input id="logi" name="logi" type="button" value="Entrar"/></div>';

}

function submit(f) 
{
	if (f == "acclog") { sessionStorage.setItem("login", true); }
	if (f == "accres") { sessionStorage.setItem("registar", true); }
	if (f == "accalt") { sessionStorage.setItem("alterar", true); }
	
	var x = document.forms[f];
	for (var i = 0; i < x.length; i++) 
	{
		sessionStorage.setItem(x.elements[i].id , x.elements[i].value);
	}
	window.location.reload();
}
function clean()
{
	document.getElementById("info").innerHTML = "";
	document.getElementById("regi").value = "Registar";
	document.getElementById("regi").setAttribute("onClick", "show('registar')" );
	document.getElementById("logi").value = "Entrar";
	document.getElementById("logi").setAttribute("onClick", "show('login')" );
	document.getElementById("info").style.display = "none";
}
function show(s)
{
	document.getElementById("info").innerHTML = "";
	document.getElementById("err").innerHTML = "";
	if (s == "login")
	{
		document.getElementById("info").innerHTML = '<form id="acclog" accept-charset="UTF-8">Utilizador:&nbsp;<input name="uti" type="text" class="texto" id="uti" placeholder="Ex: Jorge" maxlength="30"/><br>Password:&nbsp;<input name="pas" type="text" class="texto" id="pas" placeholder="Ex: Desporto75" maxlength="255"/><br><br></form>';
		document.getElementById("regi").value = "Voltar";
		document.getElementById("regi").setAttribute("onClick", "clean()" );
		document.getElementById("logi").setAttribute("onClick", "submit('acclog')" );
		back = true;
		document.getElementById("info").style.display = "";		
	}
	if (s == "registar")
	{
		document.getElementById("info").innerHTML = '<form id="accres" accept-charset="UTF-8">Utilizador:&nbsp;<input name="uti" type="text" class="texto" id="uti" placeholder="Ex: Fernades" maxlength="30"/><br>Password:&nbsp;<input name="pas" type="text" class="texto" id="pas" placeholder="Ex: D3sp0rt0" maxlength="255"/><br>Email:&nbsp;<input name="ema" type="text" class="texto" id="ema" placeholder="Ex: fernades@gmail.com" maxlength="20"/><br>Nif:&nbsp;<input name="nif" type="number" class="texto" id="nif" placeholder="Ex: 123456789" max="9"/><br><br></form>';
		document.getElementById("logi").value = "Voltar";
		document.getElementById("logi").setAttribute("onClick", "clean()" );
		document.getElementById("regi").setAttribute("onClick", "submit('accres')" );
		back = true;
		document.getElementById("info").style.display = "";		
	}	 
}
function login()
{
	if ((sessionStorage.getItem("uti") !== null && sessionStorage.getItem("pas") !== null) && (sessionStorage.getItem("uti") != "" && sessionStorage.getItem("pas") != ""))
	{
		var acc = false;

		if (localStorage.getArray("c0") !== null)
		{
			var x = 0;
			while (localStorage.getArray("c" + x) !== null)
			{
				if (localStorage.getArray("c" + x)[4] == sessionStorage.getItem("uti") && localStorage.getArray("c" + x)[5] == sessionStorage.getItem("pas"))
				{
					acc = true;
					localStorage.setItem("id", localStorage.getArray("c" + x)[0]);
					localStorage.setItem("ema", localStorage.getArray("c" + x)[2]);
					localStorage.setItem("nif", localStorage.getArray("c" + x)[3]);
					localStorage.setItem("uti", localStorage.getArray("c" + x)[4]);
					localStorage.setItem("pas", localStorage.getArray("c" + x)[5]);
				}
				x++;
			}
		} 
		else { alert("0 results"); }	
		
		if (acc == false) { document.getElementById('err').innerHTML = '//O utilizador não existe ou a password está incorreta.//<br><br>'; }
		else { account(); }
	}
	else { document.getElementById('err').innerHTML = '//Não preencheu todos os campos.//<br><br>'; }
}