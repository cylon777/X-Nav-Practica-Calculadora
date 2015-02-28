$(document).ready(function() {
	var displayContent = "";

	$("button").click(function(e) {
		var elemClass = $(this).attr('class');
		var elemContent = $(this).html();
		if(elemClass=="display"){
			displayContent += elemContent;
			$("input").val(displayContent);
		}else if(elemClass=="exec"){
			if(elemContent=="DEL"){
				displayContent = displayContent.substring(0, displayContent.length - 1);
				$("input").val(displayContent);
			}else if(elemContent=="C"){
				displayContent = "";
				$("input").val(displayContent);
			}else if(elemContent=="="){
				evaluate();
			}
		}
	});

	$("input").keyup(function(e) {
		var keyCode = e.which;
		if(keyCode==171||keyCode==13)
			evaluate();
		displayContent = $(this).val();
		var keyPressed = displayContent.substring(displayContent.length-1, displayContent.length);
		var elemContent = keyPressed;
		console.log("keyPressed: " + keyPressed);
		console.log("keyCode: " + keyCode);
	});

	function evaluate(){
		var ok = checkNum(displayContent);
		console.log("displayContent: '" + displayContent + "'");
		if(displayContent != '')
			if(ok==null){
				displayContent = eval(processCalc(displayContent)).toString();
				$("input").val(displayContent);
			}else
				$("input").val(ok);
	}

	function checkNum(str) {
		for (var i = 0; i < str.length; i++) {
			var ch = str.substring(i, i+1);
			if (ch < "0" || ch > "9")
				if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "(" && ch!= ")" && ch!= "×" && ch!="÷" && ch!="." && ch!="Π" && ch!="x")
					return ("invalid entry: '" + ch + "'");
		}
		return null;
	}

	function processCalc(calc){
		calc = calc.replace("×","*");
		calc = calc.replace("x","*");
		calc = calc.replace("÷","/");
		calc = calc.replace("Π","3.141592654");
		return calc;
	}
});
