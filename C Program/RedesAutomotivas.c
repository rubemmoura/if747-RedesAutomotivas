#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int convertHexToInt(int hex_value, int indice_base){
    int result = 0;
    int base_hex = 16;

    if(indice_base == 0){
        base_hex = 1;
    }
    result = hex_value * base_hex;

    return result;
}

int convertLetterToInt(char letter){
    int result = 0;

    switch(letter){
        case 'A':
            result = 10;
            break;
        case 'B':
            result = 11;
            break;
        case 'C':
            result = 12;
            break;
        case 'D':
            result = 13;
            break;
        case 'E':
            result = 14;
            break;
        case 'F':
            result = 15;
            break;
    }
    return result;
}

int letterOrNotLetter(char letter){
    int result;
    if(letter == 'A' || letter == 'B' || letter == 'C' || letter == 'D' || letter == 'E' || letter == 'F'){
        result = convertLetterToInt(letter);
    }else{
        result =  letter - '0';
    }

    return result;
}

int captureOneByte(char byte0, char byte1){
    //convertendo char para int
    int value       = 0;
    int value2      = 0;
    int valueInt    = 0;

    value   = letterOrNotLetter(byte0);
    value2  = letterOrNotLetter(byte1);

    value       = convertHexToInt(value, 1);
    value2      = convertHexToInt(value2, 0);
    valueInt    = value + value2;

    return valueInt;
}

int processPayload(char* byte, char* payload, int endOfFile){

    char sensorHb = payload[8];
    char byte0[2];
    byte0[0] = byte[0];
    byte0[1] = byte[1];

    char ch;
	FILE *out;
	out = fopen("result.txt", "a");

	if(out == NULL){
			printf("Erro, nao foi possivel abrir o arquivo\n");
    }else{
        if(endOfFile == 1){
            fprintf(out,"FIM");
        }else{
            int result = 0;
            switch(sensorHb){
                case '5':
                //Engine coolant temperature!
                //A-40
                    printf(" Engine coolant temperature!\n");

                    int coolantTemperature = 0;
                    coolantTemperature = captureOneByte(byte0[0], byte0[1]) - 40;
                    result = coolantTemperature;
                    fprintf(out,"Coolant Temperature: %d\n", result);
                    printf("\n Coolant Temperature: %d graus Celsius\n", coolantTemperature);
                    break;
                case 'F':
                //Intake air temperature
                //A-40
                    printf(" Intake air temperature!\n");

                    int intakeAirTemperature = 0;
                    intakeAirTemperature = captureOneByte(byte0[0], byte0[1]) - 40;
                    result = intakeAirTemperature;
                    fprintf(out,"Intake Air Temperature: %d\n", result);
                    printf("\n Intake Air Temperature: %d graus Celsius\n", intakeAirTemperature);
                    break;
                case 'C':
                //Engine RPM
                //((A*256)+B)/4
                    printf(" Engine RPM!\n");

                    char byte1[2];
                    byte1[0] = payload[11];
                    byte1[1] = payload[12];

                    int RPM = 0;
                    int A   = 0;
                    int B   = 0;

                    A = captureOneByte(byte0[0], byte0[1]);
                    B = captureOneByte(byte1[0], byte1[1]);

                    RPM = ((A*256)+B)/4;
                    result = RPM;
                    fprintf(out,"RPM: %d\n", result);
                    printf("\n RPM %d \n", RPM);


                    break;
                case 'D':
                //Vehicle speed
                //A
                    printf(" Vehicle speed!\n");

                    int vehicleSpeed = 0;
                    vehicleSpeed = captureOneByte(byte0[0], byte0[1]);
                    result = vehicleSpeed;
                    fprintf(out,"Vehicle speed: %d\n", result);
                    printf("\n Vehicle speed: %d km/h\n", vehicleSpeed);
                    break;
            }
        }
    }

    fclose(out);
    printf("\n\n-----------------------------------------------------\n\n");
    return 0;
}

int main()
{
    char payload[] = "7E804410C1CEB";

    char *ch;
    int count = 0;
    char string_frame[13];
    FILE *frame;
    frame = fopen("frames.txt", "r");

    if(frame == NULL){
	    printf("Erro, nao foi possivel abrir o arquivo\n");
    }
	else{
        char byte0[2];
	    while((ch=fgetc(frame))!= EOF){
	        while(ch != '\n'){
                string_frame[count] = ch;
                count++;
                ch=fgetc(frame);
	        }
	        string_frame[count] = '\0';
	        count = 0;
            printf(" String_frame = %s \n\n", string_frame);

            byte0[0] = string_frame[9];
            byte0[1] = string_frame[10];

            processPayload(byte0, string_frame, 0);

            *string_frame = NULL;
	    }

	    processPayload(byte0, string_frame, 1);

	}

	fclose(frame);
    return 0;
}
