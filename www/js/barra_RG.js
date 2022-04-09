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