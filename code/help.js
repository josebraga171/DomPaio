(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var sairB  =  document.getElementById("sairBotaoAjuda");


	function buttonListener1(ev) {
		
		switch(ev.currentTarget.id) {
			case "sairBotaoAjuda":
				sairB.src = "./resources/sairBotON.png";
				break;
		}
	}

	function buttonListener2(ev) {
		switch(ev.currentTarget.id) {

			case "sairBotaoAjuda":
				sairB.src = "./resources/sairBotOFF.png";
				break;
		}
	}

	sairB.addEventListener("mouseover", buttonListener1);
	sairB.addEventListener("mouseout", buttonListener2);


	var msg = function(ev) {
		messageHandler(ev, sairB, "0");
	}

		window.addEventListener("message", msg);
}

function messageHandler(ev, Btn, option) {
	var main = ev.source;
	 
	var changePage = function(ev) {
	    main.postMessage(option, '*');
	    console.log(option);
	}
	    
	Btn.addEventListener("click", changePage);
}       	