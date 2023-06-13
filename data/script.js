
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
var varchamdre01 = 0;
var varchamdre02 = 0;
var varsalon = 0;
var varcuisine = 0;
var varlumiereExterne = 0;
var homestatus = {"#lumierech1": 0, "#ventilateurch1": 0, "#douchech1" :0,
				"#lumierech2": 0,"#ventilateurch2": 0,"#douchech2": 0,
				"#lumieresalon": 0,"#ventilateursalon":0,"#televisionsalon": 0,
				"#lumierecuisine": 0, "#frigo": 0,"#equipement1": 0,"#equipement2": 0,
				"#equipement3": 0, "#externe1": 0, "#externe2": 0
				};

$(document).ready(function(){

	

	$("#offch1").click(function(){
		varchamdre01 = 1-varchamdre01;
		$.post("chambre01",{
			chambrevaleur : varchamdre01
		});
	});
	$("#offch2").click(function(){
		varchamdre02 = 1-varchamdre02;
		$.post("chambre02",{
			chambrevaleur2 : varchamdre02
		});
	});
	$("#offsalon").click(function(){
		varsalon = 1 - varsalon;
		$.post("salon",{
			salon : varsalon
		});
	});
	$("#offcuisine").click(function(){
		varcuisine = 1 - varcuisine;
		$.post("cuisine",{
			cuisine : varcuisine
		});
	});
	$("#offlumiereExterne").click(function(){
		varlumiereExterne = 1 - varlumiereExterne;
		$.post("lumiereExterne",{
			lumiereExterne : varlumiereExterne
		});
	});

    $("#connexion").click(function(){

        var valLogin = $("#login").val();
        var valpas  = $("#pass").val();

		$.post("loginuser",{
			nomuser : valLogin, 
			pasuser : valpas
		});	

		if (valLogin == "" && valpas == "") {
			$("#errorLogin").html(
				'<div class="w3-container w3-center w3-card-4 w3-red"><p>Echec</p></div>'
			);
		} else {
			
			$("#errorLogin").html("");	
			window.location.replace("home.html");
		}
        
    });

    $("#resetpass").click(function(){

    	var resetName =  $("#login").val();
    	var texte = '<div class="w3-container w3-center w3-card-4 w3-yellow">';
    	texte += '<p>Un message contenat le code de modification de mots de ';
    	texte += 'passe à été envoyer sur votre numero de télephone</br>';
    	texte += 'Utiliser ce code pour vous connecter  </p></div>';
    	
    	if (resetName == "yoba") {
    		$("#errorLogin").html(texte);
    	} else {
    		$("#errorLogin").html(
				'<div class="w3-container w3-center w3-card-4 w3-red"><p>Echec</p></div>'
			);
    	}
    	
    });

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

	setInterval(function(){
		$.get("/result", function(data){
			var te = Number(data);
			$("#errorLogin").html(data);
			if (data == "13") {
				$("#errorLogin").html('good');
         		window.location.replace("home.html");
			} 

			if (data == "2") {
				$("#errorLogin").html(
					'<div class="w3-container w3-center w3-card-4 w3-red"><p>Echec</p></div>'
				);
			}
		})
		
		for(var key in homestatus){
			var value = homestatus[key];
			if(value == 0){
				$(key).html("OFF");
			} else {
				$(key).html("ON");
			}
		}
	},2000);
	
	$("#ch1").click(function(){
		var valueHome = $("#chambrech1").val();
		sendHome(valueHome);
	});
	$("#ch2").click(function(){
		var valueHome = $("#chambrech2").val();
		sendHome(valueHome);
	});
	$("#sal").click(function(){
		var valueHome = $("#salonsal").val();
		sendHome(valueHome);
	});
	$("#cuis").click(function(){
		var valueHome = $("#Cuisinecui").val();
		sendHome(valueHome);
	});
	$("#aut").click(function(){
		var valueHome = $("#autreaut").val();
		sendHome(valueHome);
	});
	$("#ext").click(function(){
		var valueHome = $("#externeext").val();
		sendHome(valueHome);
	});
});

function sendHome (value){
  $.post("Homedata",{
	data : value
  });
}