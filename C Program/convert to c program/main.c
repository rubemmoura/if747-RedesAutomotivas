#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *ch;
    FILE *frame;
    frame = fopen("data.txt", "r");
    FILE *out;
	out = fopen("result.txt", "a");

    if((frame || out) == NULL){
	    printf("Erro, nao foi possivel abrir o arquivo\n");
    }
	else{
        char byte0[2];
	    while((ch=fgetc(frame))!= EOF){
	        while(ch != ']'){
                printf("ch = %c \n", ch);
                ch=fgetc(frame);
	        }
            fprintf(out,"7E8");
	        while(ch != '\n'){
                printf("ch2 = %c \n", ch);
                ch=fgetc(frame);
                if(ch != ' '){
                    printf("ch3 = %c \n", ch);
                    fprintf(out,"%c",ch);
                }
	        }
	    }
	}

	fclose(out);
	fclose(frame);
    return 0;
}
