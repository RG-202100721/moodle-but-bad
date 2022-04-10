function barra()
{
	document.getElementsByClassName("barraNavEntrar")[0].setAttribute("onClick", "entrar2()" );
	document.getElementsByClassName("barraNavSair")[0].setAttribute("onClick", "sair2()" );
	
	window.addEventListener("resize", function()
	{
		if (document.documentElement.clientWidth <= 600) 
		{ 
			document.getElementsByClassName("barraNav")[0].removeAttribute("style");
			document.getElementsByClassName("barraNavEntrar")[0].removeAttribute("style");
		}
		else 
		{ 
			document.getElementsByClassName("barraNav")[0].setAttribute("style", "width: 100%;");
			document.getElementsByClassName("barraNavEntrar")[0].setAttribute("style", "top: -100px;");
		}
    });
	
	var allTags = document.getElementsByClassName("barraNav")[0].getElementsByTagName("a");
	for (var i = 0, len = allTags.length; i < len; i++) 
	{
		allTags[i].setAttribute("onClick", "sairLink()" );
	}
};

function entrar2()
{
	document.getElementsByClassName("barraNav")[0].setAttribute("style", "width: 100%; transition: ease 800ms;");
	document.getElementsByClassName("barraNavEntrar")[0].setAttribute("style", "top: -100px; transition: ease 800ms;");
}
function sair2()
{
	document.getElementsByClassName("barraNav")[0].setAttribute("style", "transition: ease 800ms;");
	document.getElementsByClassName("barraNavEntrar")[0].setAttribute("style", "transition: ease 800ms;");
}
function sairLink() 
{ 
	if (document.documentElement.clientWidth <= 600) { sair2(); } 
}

//escolha do último script por página
var script = document.createElement('script');
switch (window.location.pathname.replace("/", "")) 
{
	case "index": script.src = 'js/index_RG.js'; break;
	case "gestao": script.src = 'js/gestao_RG.js'; break;
	case "informacao": script.src = 'js/informacao_RG.js'; break;
	case "revisao": script.src = 'js/revisao_RG.js'; break;
	case "sobre": script.src = 'js/sobre_RG.js'; break;
	case "login": script.src = 'js/login_RG.js'; break;
	default: window.location.href = "/login"; break;
}
document.head.appendChild(script);