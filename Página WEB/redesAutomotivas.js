function myFunction() {
    var x = document.getElementById("p");
    x.style.color = "red"; 
}

var fileDisplayCT	= document.getElementById('fileDisplayCT');
var fileDisplayRPM	= document.getElementById('fileDisplayRPM');
var fileDisplayVS	= document.getElementById('fileDisplayVS');
var fileDisplayITA	= document.getElementById('fileDisplayITA');

var numberValue;

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
                var numberValueCT	= "";
                var numberValueRPM	= "";
                var numberValueVS	= "";
                var numberValueITA	= "";
                var firstLetter;

                for(count = 0; count < line.length; count++){ //Tomando linha por linha
                	if(line[count].charAt(count2) != "F"){
                		for(count2 = 0; line[count].charAt(count2) != ":"; count2++){ //Tomando a primeira letra e caminhando caracter por caracter da linha até ":"
                			if(count2 == 0){
                				firstLetter = line[count].charAt(count2);
                			}
	                	}
						count2++; //Pulando o espaço em branco
	                	while(count2 < line[count].length){
	                		count2++;
	                		switch(firstLetter){
	                			case 'C':
									numberValueCT = numberValueCT + line[count].charAt(count2);
									break;
								case 'R':
									numberValueRPM = numberValueRPM + line[count].charAt(count2);
									break;
								case 'V':
									numberValueVS = numberValueVS + line[count].charAt(count2);
									break;
								case 'I':
									numberValueITA = numberValueITA + line[count].charAt(count2);
									break;
								default:
									console.log("Fim do Arquivo.");
	                		}
	                	}
                	}else{
						console.log("firstLetter = F => Fim do Arquivo.");
                	}

                	count2 = 0;
                	
                	fileDisplayCT.innerText		= numberValueCT;
                	fileDisplayRPM.innerText	= numberValueRPM;
					fileDisplayVS.innerText		= numberValueVS;
                	fileDisplayITA.innerText	= numberValueITA;

                }
            }
        }
    }
    rawFile.send(null);
}

readTextFile("result.txt");
