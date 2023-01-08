
		function openCity(evt,cityname) {
			var i,x,tablnks;
			x = document.getElementsByClassName("city");
			for ( i = 0; i <x.length; i++) {
				x[i].style.display = "none";
			}
			tablnks = document.getElementsByClassName("tablnks");

			for ( i = 0; i < x.length; i++) {
				tablnks[i].ClassName = tablnks[i].className.replace(" w3-red","");
			}
			document.getElementById(cityname).style.display = "block";
			evt.currentTarget.className +=" w3-red";
		}
         /*
		function verif(){
			
			if (document.getElementById("SSID").value=="") {
				document.write("Entez le nom de wifi pour vous connecter");
				document.getElementById("SSID").focus();
				return false;
			}

			if (document.getElementById("pass").value=="") {
				alert("entrez lz mots de passe du wifi");
				document.getElementById("pass").focus();
				return false;
			}
		}*/
        /* 
		var ssid = document.getElementById("SSID");

		ssid.addEventListener("keyup",
		function (event) {
           if (ssid.validity.typeMismatch) {
			ssid.setCustomValidity("entrer un nom de wifi");
		   }else{
			ssid.setCustomValidity("");
		   }
		});
         */

$(document).ready(function(){
    $("#connexionwifi").click(function(){
        var valssid = $("#SSID").val();
        var valpas  = $("#pass").val();
        $.post("infowifi",{
            nomwifi : valssid, 
            paswifi : valpas
        });
    });
});

$(document).ready(function(){
    $("#creatacp").click(function(){
        var valacp  = $("#nameacp").val();
        var valpass = $("#pasacp").val();
        var valip = $("#ipacp").val(); 
        var valgat = $("#gatacp").val();
        var valmask = $("#maskacp").val();
        var valcon = $("#maxconacp").val();

        $.post("infoacp",{
            nomacp : valacp,
            passwordacp : valpass,
            ipacp : valip,
            gateacp : valgat,
            maskacp : valmask,
            maxconacp: valcon

        });
    });
});

$(document).ready(function(){
	$("#onch1").click(function(){
		var valch1 = 1;
		$.post("chambre01",{
			etat1 :valch1
		});
	});
});

$(document).ready(function(){
	$("#offch1").click(function(){
		var valch1 = 0;
		$.post("chambre01",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#onch2").click(function(){
		var valch1 = 1;
		$.post("chambre02",{
			etat2 :valch2
		});
	});
});

$(document).ready(function(){
	$("#onsal").click(function(){
		var valch1 = 0;
		$.post("chambre02",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#onsal").click(function(){
		var valch1 = 1;
		$.post("salon01",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#offsal").click(function(){
		var valch1 = 0;
		$.post("salon02",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#onot").click(function(){
		var valch1 = 1;
		$.post("autre01",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#offot").click(function(){
		var valch1 = 0;
		$.post("autre02",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#onext").click(function(){
		var valch1 = 1;
		$.post("externe01",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#offext").click(function(){
		var valch1 = 0;
		$.post("salon02",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#oncu").click(function(){
		var valch1 = 1;
		$.post("cuisine01",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
	$("#offcu").click(function(){
		var valch1 = 0;
		$.post("cuisine02",{
			etat2 :valch1
		});
	});
});

$(document).ready(function(){
    $("#ch1").click(function(){
        var valeur = $("#chambre01").val();
        $.post("activationchambre01",{
         valauerchambre01 : valeur
        });
    });
});

$(document).ready(function(){
    $("#ch2").click(function(){
        var valeur = $("#chambre02").val();
        $.post("activationchambre02",{
         valauerchambre02 : valeur
        });
    });
});

$(document).ready(function(){
    $("#sal").click(function(){
        var valeur = $("#salon").val();
        $.post("activationchambre01",{
         valauersalon : valeur
        });
    });
});

$(document).ready(function(){
    $("#cuis").click(function(){
        var valeur = $("#cuisine").val();
        $.post("activationcuinine",{
         valauercuisine : valeur
        });
    });
});

$(document).ready(function(){
    $("#aut").click(function(){
        var valeur = $("#autre").val();
        $.post("activationautre",{
         valauerautre : valeur
        });
    });
});

$(document).ready(function(){
    $("#ext").click(function(){
        var valeur = $("#externe").val();
        $.post("activationexterne",{
         valauerexterne : valeur
        });
    });
});