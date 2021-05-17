# the-cat-api

## Descrição:
Para a solução do case utilizei um container Docker com uma imagem do mysql onde está inserido todos os dados dos felinos, um outro container com a imagem do NodeJs com Express para rodar em localhost obtendo dados do MySql, (além de usar também o Winston para poder gerar os logs), e a aplicação front end em HTML com JavaScript que consome os dados do localhost e renderiza a página com os gatinhos.

## Parametros:
Na URI possuimos alguns parametros:
- /cats : Acessa as informações de todas as 66 raças , contendo name(nome da raça), origin(origem), temperament(temperamento), description(descrição)
- /cats/{id} : Acessa as informações de uma unica raça, podemos passar como parametro o ID que varia de 1 a 66;
- /cats/temperament/{temperament} : Acessa as informações de todas as raças com o temperamento que é passado pelo parametro;
- /cats/origin/{origin} : Acessa as informações de todas as raças com a origem que é passada pelo parametro;
<br><br>
- /hats : Acessa a informação de 3 imagens de gatos com chapéu;
- /hats/{id} : Acessa a informação de uma unica imagem, podemos passar o parametro ID que varia de 1 a 3;
<br><br>
- /glasses : Acessa a informação de 3 imagens de gatos com óculos;
- /glasses/{id} : Acessa a informação de uma unica imagem, podemos passar o parametro ID que varia de 1 a 3.

## O que é necessário para rodar a aplicação:
- Docker para buildar os container;
- Postman ou de sua prefêrencia para consumir as API;
- Git para clonar o projeto.

## Como rodar a aplicação:
1. Clone este repositório em seu diretório local.
- Através do comando: git clone https://github.com/gmbrunoo/the-cat-api
<br><br>
2. Inicie o Docker Desktop;
<br><br>
3. Na pasta do projeto navegue até a pasta raiz
- Copie o caminho 
<br><br>
4. Abra o CMD;
- Utilize o comando CD e cole o link cópiado
<br><br>
5. Com o Docker ligado digite o seguinte comando no CMD para construir a imagem do MySQL
- docker build -t mysql-image -f api/db/Dockerfile .   <<- (Não esqueça do ponto)
<br><br>
7. Em seguida execute esse outro comando, agora iremos construir a imagem do NodeJs
- docker build -t node-image -f api/Dockerfile .   <<- (Não esqueça do ponto)
<br><br>
8. Agora vamos executar o comando para rodar o container do MySQL
- docker run -d -v "%cd%"/api/db/data:/var/lib/mysql --name mysql-container mysql-image
- OBS: caso utilize linux, substitua o "%cd%" por ${pwd}
<br><br>
9. Container de pé agora vamos habilitar o terminal para usar dentro do MySQL
- docker exec -it mysql-container /bin/bash
<br><br>
10. Navegaremos até nossa Base de dados
- mysql -uroot -pthecatapi
<br><br>
11. E utilizamos os seguintes comandos:
- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'thecatapi';     <<- (não esqueça o ponto e virgula)
- flush privileges;    <<- (não esqueça o ponto e virgula)
- exit
- exit
<br><br>
12. Maravilha. Agora precisamos subir o container com o NodeJS
- docker run -d -v "%cd%"/api:/home/node/app -p 9001:9001 --link mysql-container --name node-container node-image
- OBS: caso utilize linux, substitua o "%cd%" por ${pwd}
<br><br>
13. E finalmente vamos subir nossos dados no MySQL
- docker exec -i mysql-container mysql -uroot -pthecatapi < api/db/script.sql
<br><br>

## Postman
Agora vamos fazer algumas requisições com o postman.

1. Abra o postman e clique no botão import
2. Em seguida clique em upload files
3. Procure a pasta do projeto e navegue até a pasta 'Documentação'
4. Clique no arquivo The Cat API .postman_collection e em abrir 
5. Clique em import
6. Vá até collections e clique no metodo que deseja testar
8. Exemplos de raças clicando em send:
9. Exemplo de raças por id (raça específica), não esqueça de passar o /id desejado depois de '/cats' e clicar em send
10. Exemplo de raças por temperament (raça por temperamento) , não esqueça de passar o /temperament/tipo_de_temperamento desejado depois de '/temperament/' e clicar em send
11. Exemplo de raças por origin(origem), não esqueça de passar a origin/lugar desejado depois de '/origin/' e clicar em send
12. Exemplo de gatos de Glasses(Óculos) clicando em send
13. Exemplo de gatos de Hats(Chapéu) clicando em send
14. Sempre após fazer uma requisição no POSTMAN será gerado um log, para acessa-lo navegue para a pasta api/src/log
15. Após o log ser gerado ele ficará gravado em uma pasta de logs chamado thecatapi.log

## Aplicação Front-End
Por fim podemos ver como ficou a nossa página html que consome da nossa api local

1. Na pasta do projeto vá até o diretório website
2. Execute o arquivo index.html
- Aqui podemos filtrar os gatinhos por nome da raça, origem e temperamento
- Nos botões do menu superior temos acesso as paginas que renderizam os gatinhos de óculos e de chapéu.
