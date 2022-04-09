window.onload = function()
{
	check();
	barra();
	buildTable("Aluno");
	document.getElementById("b1").setAttribute("onclick", "showCreateBox('Aluno')" );
	viewBD();
};

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
function registar()
{
	if ((sessionStorage.getItem("uti") !== null && sessionStorage.getItem("pas") !== null && sessionStorage.getItem("ema") !== null && sessionStorage.getItem("nif") !== null) && (sessionStorage.getItem("uti") != "" && sessionStorage.getItem("pas") != "" && sessionStorage.getItem("ema") != "" && sessionStorage.getItem("nif") != ""))
	{
		if (localStorage.getItem("it") == 1)
		{
			var c = 0;
			if (localStorage.getArray("c0") !== null) { while (localStorage.getArray("c" + c) !== null) { c++; } } 
			else { alert("0 results"); }	
			
			localStorage.setArray("c" + c, clientes(c, sessionStorage.getItem("uti"), sessionStorage.getItem("ema"), sessionStorage.getItem("nif"), sessionStorage.getItem("uti"), sessionStorage.getItem("pas")));
			
			localStorage.setItem("it", 2);
			location.reload();
		}
		if (localStorage.getItem("it") == 2) { login(); }
	}
	else { document.getElementById('err').innerHTML = '//Não preencheu todos os campos.//<br><br>'; }
}
function account()
{
	document.getElementById("info").innerHTML = "";
	
	if (localStorage.getItem("uti") !== null) { document.getElementById("info").innerHTML = '<h2>Perfil Atual:</h2><h5 style="font-weight: bold;">' + localStorage.getItem("uti") + '</h5><br><br>'; }
	else { document.getElementById("info").innerHTML = '<h2>Perfil Atual:</h2><h5 style="font-weight: bold;">Error</h5><br><br>'; }
	
	if (localStorage.getItem("id") !== null && localStorage.getItem("id") != 0) 
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
function alterar()
{
	document.getElementById("err").innerHTML = "";
	document.getElementById("info").innerHTML = "";
	document.getElementById("info").innerHTML = '<form id="accalt" accept-charset="UTF-8">Utilizador:&nbsp;<input name="uti" type="text" class="texto" id="uti" placeholder="Ex: Fernades" maxlength="30"/><br>Password:&nbsp;<input name="pas" type="text" class="texto" id="pas" placeholder="Ex: D3sp0rt0" maxlength="255"/><br>Email:&nbsp;<input name="ema" type="text" class="texto" id="ema" placeholder="Ex: fernades@gmail.com" maxlength="20"/> <br>Nif:&nbsp;<input name="nif" type="number" class="texto" id="nif" placeholder="Ex: 123456789" max="9"/><br><br></form>';
	
	if (localStorage.getItem("uti") !== null) { document.getElementById("uti").value = localStorage.getItem("uti"); } else { document.getElementById("uti").value = ""; }
	if (localStorage.getItem("pas") !== null) { document.getElementById("pas").value = localStorage.getItem("pas"); } else { document.getElementById("pas").value = ""; }
	if (localStorage.getItem("ema") !== null) { document.getElementById("ema").value = localStorage.getItem("ema"); } else { document.getElementById("ema").value = ""; }
	if (localStorage.getItem("nif") !== null) { document.getElementById("nif").value = localStorage.getItem("nif"); } else { document.getElementById("nif").value = ""; }
	
	document.getElementById("regi").value = "Salvar";
	document.getElementById("regi").setAttribute("onClick", "submit('accalt')" );
	document.getElementById("logi").value = "Voltar";
	document.getElementById("logi").setAttribute("onClick", "account()" );
	document.getElementById("info").style.display = "";
}
function salvar()
{
	if ((localStorage.getItem("id") !== null && sessionStorage.getItem("uti") !== null && sessionStorage.getItem("pas") !== null && sessionStorage.getItem("ema") !== null && sessionStorage.getItem("nif") !== null) && (localStorage.getItem("id") != "" && sessionStorage.getItem("uti") != "" && sessionStorage.getItem("pas") != "" && sessionStorage.getItem("ema") != "" && sessionStorage.getItem("nif") != ""))
	{
		localStorage.setArray("c" + localStorage.getItem("id"), clientes(localStorage.getItem("id"), sessionStorage.getItem("uti"), sessionStorage.getItem("ema"), sessionStorage.getItem("nif"), sessionStorage.getItem("uti"), sessionStorage.getItem("pas")));
		
		localStorage.setItem("ema", sessionStorage.getItem("ema"));
		localStorage.setItem("nif", sessionStorage.getItem("nif"));
		localStorage.setItem("uti", sessionStorage.getItem("uti"));
		localStorage.setItem("pas", sessionStorage.getItem("pas"));
		
		sessionStorage.clear();
		account();
	}
	else { document.getElementById('err').innerHTML = '//Não preencheu todos os campos.//<br><br>'; account(); }
}
function del()
{
	if (sessionStorage.getItem("nid") !== null && sessionStorage.getItem("nid") != 0)
	{
		var x = 0;
		if (localStorage.getArray("c0") !== null) { while (localStorage.getArray("c" + x) !== null) { x++; } x -= 1; } 
		else { alert("0 results"); }
		
		var n = JSON.parse(sessionStorage.getItem("nid")) + 1;
		for (var c = n - 1; c < x; c++)
        {
			localStorage.setArray("c" + c, clientes(localStorage.getArray("c" + c)[0], localStorage.getArray("c" + n)[1], localStorage.getArray("c" + n)[2], localStorage.getArray("c" + n)[3], localStorage.getArray("c" + n)[4], localStorage.getArray("c" + n)[5]));
			n++;
		}
		localStorage.setArray("c" + x, null);
		sessionStorage.removeItem("nid");
		
		alert('Conta apagada com sucesso.');
		location.reload();
	}
}
function apagar()
{
	document.getElementById("err").innerHTML = "";
	document.getElementById("info").innerHTML = "";
	if (localStorage.getItem("id") !== null && localStorage.getItem("id") == 0)
	{
		var x = 1;
		if (localStorage.getArray("c0") !== null)
		{ 
			var table = "<table><tr><th>Id</th><th>Utilizador</th><th>Email</th><th>Nif</th><th>Apagar</th></tr>";
			while (localStorage.getArray("c" + x) !== null)
			{
				table += "<tr><td>"+ localStorage.getArray("c" + x)[0] +"</td><td>"+ localStorage.getArray("c" + x)[4] +"</td><td>"+ localStorage.getArray("c" + x)[2] +"</td><td>"+ localStorage.getArray("c" + x)[3] +"</td><td><a onclick=\"sessionStorage.setItem('delete', true); sessionStorage.setItem('nid', "+ localStorage.getArray("c" + x)[0] +"); location.reload();\"><img src=\"images/cruz.png\" alt=\"delete\"/></a></td></tr>";
				x++; 
			} 
			table += "</table><br><br>";
		} 
		else { table = "0 results"; }
		document.getElementById('info').innerHTML = table;	
		table = "";
	}
	document.getElementById('regi').style.display = "none";
	document.getElementById("logi").value = "Voltar";
	document.getElementById("logi").setAttribute("onClick", "document.getElementById('regi').style.display = 'block'; account();" );
}
function sair() 
{ 
	clean();
	if (sessionStorage.getItem("sair") !== null && JSON.parse(sessionStorage.getItem("sair")) == true)
	{	
		localStorage.removeItem("id");
		localStorage.removeItem("uti");
		sessionStorage.clear();
		localStorage.removeItem("it");
		localStorage.setArray("nums", null);
		localStorage.setArray("limit", null);
		localStorage.setArray("pre", null);
	}
}