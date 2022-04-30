<h4 align="center"> 
	🚧  Back-End Challenge Coodesh 🏅 2021 🚧
</h4>

Nessa etapa você deverá construir uma API Restful com as melhores práticas de desenvolvimento, baseada na API Space Flight News. Para isso você deve executar os passos a seguir:

#### Obrigatório 1 :
Você deverá desenvolver as seguintes rotas:

- [x] `[GET]/:  Retornar um Status: 200 e uma Mensagem "Fullstack Challenge 2021 🏅 - Space Flight News"`

- [x] `[GET]/articles/: Listar todos os artigos da base de dados, utilizar o sistema de paginação na resposta do endpoint para não sobrecarregar a REQUEST`

- [x] `[GET]/articles/{id}: Obter a informação somente de um artigo`

- [x] `[POST]/articles/: Adicionar um novo artigo`

- [x] `[PUT]/articles/{id}: Atualizar um artigo baseado no id`

- [x] `[DELETE]/articles/{id}: Remover um artigo baseado no id`

#### Obrigatório 2: 
- [x] Para alimentar o seu banco de dados você deve criar um script para armazenar os dados de todos os artigos na Space Flight News API.

#### Obrigatório 3: 
- [x] Além disso você precisa desenvolver um CRON para ser executado diariamente às 9h e armazenar em seu os novos artigos ao seu banco de dados. (Para essa tarefa você poderá alterar o seu modelo de dados)

#### Diferencial 1:
- [X] Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
### Diferencial 2:
- [X] Configurar um sistema de alerta se houver algum falha durante a sincronização dos artigos;
#### Diferencial 3:  
- [x] Descrever a documentação da API utilizando o conceito de Open API 3.0;
#### Diferencial 4:
- [ ] Escrever Unit Tests para os endpoints da API;
