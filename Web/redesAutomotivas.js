var fileDisplayCT	= document.getElementById('fileDisplayCT');
var fileDisplayRPM	= document.getElementById('fileDisplayRPM');
var fileDisplayVS	= document.getElementById('fileDisplayVS');
var fileDisplayITA	= document.getElementById('fileDisplayITA');

var numberValueCT	= "";
var numberValueRPM	= "";
var numberValueVS	= "";
var numberValueITA	= "";
var firstLetter;

function checkFirstLetter(count, string){
	count++; //Pulando o espaço em branco
	while(count < string.length){
		count++;
		switch(firstLetter){
			case 'C':
				numberValueCT = numberValueCT + string.charAt(count);
				fileDisplayCT.innerText		= numberValueCT;
				break;
			case 'R':
				numberValueRPM = numberValueRPM + string.charAt(count);
				fileDisplayRPM.innerText	= numberValueRPM;
				break;
			case 'V':
				numberValueVS = numberValueVS + string.charAt(count);
				fileDisplayVS.innerText		= numberValueVS;
				break;
			case 'I':
				numberValueITA = numberValueITA + string.charAt(count);
				fileDisplayITA.innerText	= numberValueITA;
				break;
			default:
				console.log("Letra desconhecida.");
		}
	}

	console.log("numberValueCT = " + numberValueCT);
	console.log("numberValueRPM = " + numberValueRPM);
	console.log("numberValueVS = " + numberValueVS);
	console.log("numberValueITA = " + numberValueITA);
}

function myFunction() {
    readTextFile("result.txt");
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var line = allText.split("\n");
                var count, count2;

                for(count = 0; count < line.length; count++){ //Tomando linha por linha
                	if(line[count].charAt(count2) != "F"){
                		for(count2 = 0; line[count].charAt(count2) != ":"; count2++){ //Tomando a primeira letra e caminhando caracter por caracter da linha até ":"
                			if(count2 == 0){
                				firstLetter = line[count].charAt(count2);
                			}
	                	}
	                	checkFirstLetter(count2, line[count]);
                	}else{
						console.log("firstLetter = F => Fim do Arquivo.");
                	}

                	count2 = 0;
                }
            }
        }
    }
    rawFile.send(null);
}