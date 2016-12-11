var fileDisplayCT	= document.getElementById('fileDisplayCT');
var fileDisplayRPM	= document.getElementById('fileDisplayRPM');
var fileDisplayVS	= document.getElementById('fileDisplayVS');
var fileDisplayITA	= document.getElementById('fileDisplayITA');
var image1			= document.getElementById('imgCoolant');

var numberValueCT	= "";
var numberValueRPM	= "";
var numberValueVS	= "";
var numberValueITA	= "";
var firstLetter;

var allText;
var line;
var count = 0
var count2 = 0;
var time;

function checkFirstLetter(count, string){
	count++; //Pulando o espaço em branco
	while(count < (string.length - 2)){
		count++;
		switch(firstLetter){
			case 'C':
				numberValueCT = numberValueCT + string.charAt(count);
				if(numberValueCT > 87){
					$("#imageCoolantTemp").attr("src","images/temp1_on.png");
				}else{
					$("#imageCoolantTemp").attr("src","images/temp1_off.png");
				}
				fileDisplayCT.innerText		= numberValueCT 	+ " °C";
				break;
			case 'R':
				numberValueRPM = numberValueRPM + string.charAt(count);
				console.log("numberValueRPM = " + numberValueRPM);
				if(numberValueRPM > 1000){
					$("#imageRPM").attr("src","images/rpm_on.png");
					//$("#rpm").css("background","#ff6c00");
				}else{
					$("#imageRPM").attr("src","images/rpm_off.png");
					//$("#rpm").css("background","#5FBEB8");
				}
				fileDisplayRPM.innerText	= numberValueRPM 	+ " Rpm";
				break;
			case 'V':
				numberValueVS = numberValueVS + string.charAt(count);
				if(numberValueVS > 20){
					$("#imageVehicleSpeed").attr("src","images/rpm_on.png");
				}else{
					$("#imageVehicleSpeed").attr("src","images/rpm_off.png");
				}
				fileDisplayVS.innerText		= numberValueVS 	+ " Km/h";
				break;
			case 'I':
				numberValueITA = numberValueITA + string.charAt(count);
				if(numberValueITA > 44){
					$("#imageIntakeAirTemp").attr("src","images/temp2_on.png");
				}else{
					$("#imageIntakeAirTemp").attr("src","images/temp2_off.png");
				}
				fileDisplayITA.innerText	= numberValueITA 	+ " °C";
				break;
			default:
				console.log("Letra desconhecida.");
		}
	}
}

function readLine(){
	if(line[count].charAt(count2) != "F"){
		for(count2 = 0; line[count].charAt(count2) != ":"; count2++){ //Tomando a primeira letra e caminhando caracter por caracter da linha até ":"
			if(count2 == 0){
				firstLetter = line[count].charAt(count2);
			}
    	}
    	checkFirstLetter(count2, line[count]);
    	time = setTimeout(readLine, 250);
	}else{
		clearTimeout(time);
		alert("Fim do Arquivo.");
		console.log("Fim do Arquivo.");
	}
	numberValueCT = "";
	numberValueRPM = "";
	numberValueVS = "";
	numberValueITA = "";
	count++;
	count2 = 0;
}

function start() {
    readTextFile("result.txt");
    time = setTimeout(readLine, 250);
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
                allText = rawFile.responseText;
               	line = allText.split("\n");
            }
        }
    }
    rawFile.send(null);
}