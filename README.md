# IF747-RedesAutomotivas
Projeto da disciplina [IF747] - Redes Automotivas.
## Alunos: 
Rubem Moura e Thaysa Pryscilla.


## Proposta de Projeto


* **Parte 1** - Implementar um sistema capaz de obter dados de veículos (mínimo de 5 sensores) em tempo real, tais como os dados coletados no artigo fingerprint. Os dados extraídos devem constituir um banco de dados.
Como sugestão de hardware para extrair os dados das redes intra-veiculares do veículo, sugere-se usar um chip ELM 327 ou uma CAN Bus shield. Para enviar esses dados à um banco de dados sugere-se usar um microcontrolador, uma Raspberry Pi, um smartphone ou ainda um computador pessoal.

* **Parte 2** - **Opção 1:** Tal como no artigo fingerprint, deve-se implementar uma aplicação utilizando algoritmos de aprendizagem de máquina e os dados extraídos do veículo para classificar condutores. **Opção 2:** Utilizando uma distribuição Linux para um computador pessoal ou então para uma Raspberry Pi, utilizar a API SocketCAN para simular dois nós de uma rede CAN. Importar os dados do banco de dados construído na parte 1 para o nó 1 e transmiti-los para o nó 2; criptografar os dados no transporte poderá contabilizar pontuação extra. Os dados recebidos no nó 2 devem ser interfaceados implementando-se uma interface gráfica simples ou então utilizando hardware (leds RGB, buzzers, displays, etc) de forma a executar alguma resposta em função dos dados recebidos. Esta função pode ser, por exemplo, um dashboard exibindo os dados de rpm do veículo para uma implementação de interface gráfica via software, ou então a emissão de um alerta sonoro para quando o rpm do veículo ultrapassar determinado limiar, para o caso de se estar usando hardware.*
