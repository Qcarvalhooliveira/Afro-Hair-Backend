vamos trabalhar com fastify
o proposito dela é trazer para a gente a parte tradicional na construção de api como rotas, parametros, requisições e etc, podemos construir isso na mão, mas não é tão necessario e o fastify ja traz isso pra a gente.
fastify é um microframework

# fastify
vantagens
ele é mais bem mantido do que o fastify -muitos updates e etc
uma das opções mais populares no node, e com api semelhante com o express então sabendo um vc acaba aprendendo o outro
mais performatico
pronto para lidar com novas funcionalidades do js
em especial o assync await é muito bem integrado.

# typescript
o typescript é um superset um adicional ao javascript
usamos ele para trabalhar com tipagem ou seja falar o tipo das coisas (se é um number, string, etc) deixa o codigo mais inteligente, porque evita que erros sejam perpetuados. 
como os parametros são tipados, a gente percebe instantaneamente se enviamos por exemplo um parametro errado para a função. ele ajuda a escrita do codigo porque ja te sugere o que devemos usar como tipos. 
o typescript é uma linguagem de programação fortemente tipada que converte o codigo final para javascript (segundo sua propria documentação)
sobre ser uma linguagem de programação, nos temos atualmente compiladores que entendem o typescript sem precisar de conversão para o js e por isso podemos dizer que ele é sim uma linguagem de programação.
a sintaxe é muito parecida com o js a unica diferença é a tipagem:
sobre os erros que o typescript evita. pensa em uma função para calcular a idade do usuario. ela recebe um usuario e vai calcular com base na data de nascimento dele
function calculateUserAge (user) {
return new Date().getFullYear() - user.birthYear
}
isso seria como a gente faria a função de uma maneira bem simplificada e no js. porem o problema com isso que que nos podemos chamar qualquer paramentro nessa função para rodar ela. por exemplo quando a gente for chamar a função para rodar ela ao invez de colocar o user no parametro a gente pode colocar uma string como um nome assim
calculateUserAge ('iuri') 

se a gente fizer isso no js ele não vai apontar erro. mas quando a gente rodar ela vai dar um erro porque iuri é uma string e não o objeto user e não ele nunca vai achar o user.birthYear

a gente tem que instalar o typescript usando o npm i -d typescript
e depois conigurar ele usando o npx tsc --init
vamos la no tsconfig.json e mudamos o target que vai estar em 2016 para 2020.

e para converter o codigo é so a gente usar o tsc e dar o caminho do codigo que queremos converter, ele vai criar um novo arquivo em js .
e assim podemos rodar ele no node.

# instalar fastify
npm i fastify
vamos importar ele e chamar uma const app sendo igual a função fastify
isso vai criar a base da aplicação e agora com a app eu posso usar para fazer todas as funçoes simples que um server tem. principalmente a parte de rotas.
então se a gente escrever app.get ou qualquer outro metodo ele ja esta disponivel.
então se a gente quiser chamar uma rota tipo http://localhost:3333/hello
a gente vai dar um 
app.get('/hello', () =>{
    return 'hello world'
})
a gente faz o get, e o primeiro parametro a gente passa a url, o endereço depois da / e o segundo parametro é uma função com o que isso vai devolver, a gente coloclou um hello world pra exemplificar.

e vamos tambem passar um app.listen({
    port: 3333
})
assim ele vai estar ouvindo a essa porta.esse listen retorna uma promisse, então depois dele eu dou um .then( ()=> {
    console.log('http server running)
})
e quando essa porta for escutada a gente vai dar um console.log para dizer que ela foi ouvida.
a pagina fica assim:
import fastify from 'fastify'

const app = fastify()

app.get('/hello', ()=>{
    return 'hello world!'
})

app.listen({
    port: 3333,
}).then(() =>{
    console.log('http server running!')
})

agora para executar ela com o node a gente precisa converter.
mas antes de converter precisamos instalar o pacote node para que ele não de erro então vamos dar um npm i -D @types/node
agora nos podemos converter e para isso vamos usar o npx tsc src/server.ts
porem esse processo de ficar convertendo é horrivel porque a cada alteraçéao vamos precisar converter.
para automatizar isso vamos instalar a ferramenta tsx em dependencia de desenvolvimento
npm i tsx -D
e o tsx ele converte e executa em node o arquivo convertido sem sujar a pasta ou seja sem criar um clone do arquivo na pasta com final .js.
para usar o tsx agora vai ser com o comando
npx tsx src/server.ts
ou seja npx tsx mais o endereço do arquivo.
o caminho é usar o tsx apenas em desenvolvimento. em produção a gente vai converter para js uma vez que o produto esteja pronto e a gente vai rodar esse.
vamos la no pacjage.json e criar um script para rodar pelo tsx la não precisamos colocar o npx o script fica assim:
 "dev": "tsx src/server.ts",
 e podemos colocar o watch tambem para ele observar as mudanças fica assim
  "dev": "tsx watch src/server.ts",

 # esLint
vamos colocar o lint nesse projeto.
com isso o codigo vai ficar padronizado e essa padronização automatizado.
vamos instalar o eslint ja com o pacote da rocketseat
npm i eslint @rocketseat/eslint-config -D

apos isso estar instalado vamos criar um arquivo na raiz chamado .eslintrc.json
nele a gente cria um objeto e coloca uma opàção chamada extends: passamos um array e colocamos dentro dele @rocketseat/eslint-config/node
fica assim:

salvamos isso e para que o vscode fucnione com o eslint a gente precisa instalar a extenção eslint
agora para automatizar vamos dar um cntrl shift p e procurar por open users settings json

ele abre uma aba com varias configurações
a gente vai procura  a edite passar a opçõas
sorce.fixall.eslint: true

nos vamos também no package json e criamos um comando chamado lint para dar com npm run
o lint vai ser algo que vai verificar todos os erros de todos os arquivos e dar um fix neles de uma vez.
nesse script vai ter eslint a pasta onde estão os codigos por exemplo src --ext para sinalizar a estensão e as extençoes dos arquivos.ts.js etc e um --fix para ele corrigir tudo que for possivel de corrigir.


# sqlite
nos vamos usar o banco de dados sqlite primeiro porque ele usa o sql relacional. 
banco relacional é muito performatico e usa 99% das funcionalidades de outros bancos e é mais simples.
alem disso não precisamos instalar nada na maquina porque os dados são salvos la mesmo.
é muito facil tambem de migrar para outro banco n futuro.
    * conexão com o banco
    cada tecnologia tem formas diferentes de se conectar com o banco de dados.
    as mais comuns são
    1 drivers nativos - ferramentas bibliotecas de baixo nivel que permite que a gente se comunique com o banco de maneira pouco abstrata. por exemplo o mysql2
    a gente tem que escrever a query de forma bem crua exatamente epecificando cada coisa 

    2 query builders - formas de evitar ter que aprender muito sql e focar na linguagem que estamos trabalhando. no caso do node o mais famoso é o knex.js
    ele vai construir querys para nos. facilita a escrita dos comandos sql com codigo js. em outras palavras usa mais ou menos uma sintaxe de js para os comandos sql
    
    3 orn - é um nivel de abstração mais alto. praticamente não nos procuramos com o sql. a sintaxe vem da linguagem


    nos vamos usar o knex

# configurando o knex
temos o comando para instalar o knex npm i knex --save
porem não vamos instalar so o knex mas tambem o driver do banco de dados ja junto. ou seja colocamos o npm install knex sqlite3
uma vez que isso esteja instalado vamos criar dentro da pasta src um arquivo chamado database.ts
esse arquivo vai fazer uma conexação com o banco de dados. então nele vamos importar do knex uma funcção chamada kenx, porem vamos renomear ela como setupKnex para não dar o mesmo nome no nosso uso dela vai ficar assim
import { knex as setupKnex } from 'knex'

agora podemos fazer uma const chamada knex e igualar ela a essa função e exportar ela
fica assim
export const kenx = setupKnex()

agora dentro do setupKnex nos vamos colocar alguns argumentos.

import { knex as setupKnex } from 'knex'

export const config = {
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)

vamos na rota server.ts
vamos na rota hello e transformamos ela em async e nela eu passo uma const tables e ela vai ser igual o await da promisse do knex do database e para ele a gente passa uma tabela padrão do sqlite apenas para testar que é a sqlite_schema  e damos um select'*'
fica assim:
app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})
temos que criar uma pasta tmp ou temp a depender de como escrevemos para o programa achar a pasta para criar o app.db
se agora a gente der um npm run dev ele vai criar a pasta temp com o nosso banco de dados.
a gente tambem vai no gitignore e coloca o nosso temp/app.db nele para que o nosso banco de dados não suba para o github.

para criar a primeira migration precisamos fazer algumas coisas na aplicação
quando a gente instala o knex tem um arquivo binario dele dentro do node_modules
para criar uma migrate a gente pode fazer npx knex migrate:make (nome a tabela com o que a gente quer que a tabela faça no banco de dados.)
porem se a gente fizer assim vai dar erro porque ele não sabe que as configurações do banco de dados esta no database.ts
para que o knex entenda nossas configurações existe uma convenção de criar o arquivo knexfile.ts (o padrão é js) e dentro desse arquivo vamos fazer é importar as configuraçéoes do banco. porem a gente não quer importar a conexão com o banco ou seja não vamos importar o knex do database e siml so o que esta dentro do setup knex.
então a gente separa o que esta dentro do knex em uma outra const chamada config e exporta ela mas tambem passa ela para dentro da const knex fica assim o database.ts:
import { knex as setupKnex } from 'knex'
export const config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)

agora no knexfile a gente vai importar do database apenas o config e exportar essas config de novo.
assim:
import { config } from './src/database'

export default config

porem ainda vai dar erro porque ele ve que o arquivo é um typescript mas nos não temos instalado as bibliotecas para resolver isso em typescript o que temos é a tsc que o knex não usa.  
para resolver isso nos vamos criar um novo script chamado knex que vai executar o node e passar a opção loadet que vai carregar uma biblioteca para executar o codigo ( no caso a tsx) e ai a gente passa o caminho do binario do knex "knex": "node --loader tsx ./node_modules/knex/bin/cli.js"
ai para rodar ele a gente tem que usar o node na verão 18 ou seja
 nvm use 18 

 e agora para fazer a tabela a gente vai dar o npm run knex que vai puxar toda a gambiarra e depois a gente passa -- para mandar um comando para o knex e ai a gente passa o nosso migrate:make create-documents fica assim a sequencia de comandos
 ➜  diet git:(main) ✗ nvm use 18.16.1
Now using node v18.16.1 (npm v9.5.1)
➜  diet git:(main) ✗ npm run knex -- migrate:make create-documents

ai ele cria uma pasta migrate com um arquivo com a data e vazio esse arquivo vai vir com dois metodos o up e down para a gente escrever o que vai fazer e o down para a gente desfazer, ou seja um rollback. assim fica a migrate criada e virgem:
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
}


export async function down(knex: Knex): Promise<void> {
}


porem a gente pode melhorar um pouco la no daabase algumas propriedades para a migration. para isso vamos importar de la do knex o Knex com k maiucuslo no database.ts e vamos dizer que o config precisa usar a interface Knex.Config
agora deppis do nullByDefault rtue a gente pode dar um cntrl espaço e usar muita coisa que aparace e nos vamos usar a opção migrations para ela vamos passar extensione e directory em um objeto.
antes de configurar vamos mudar o nome de nossa pasta temp para db
e dentro dessa db nos vamos salvar migrations no filename tambem mudamps de temp para db e no gitignore tambem. o arquivio databqase fica assim:
import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)


se agora a gente deletar a pasta migrations e rodar o comando migrate:make de novo e ele vai criar a pasta migration dentro da db.


o kenx vai criar um banco de dados com a data precisa como nome.
para podermos migrar para outras plataformas de banco de dados mais tarde é bom lembrar que temos que manter a sintaxe do banco de dados padrão.
dentro desse arquivo de migration que a gentefez vão ter dois metodos o up e down o up é o que ela vai favai fazer.
e o down é que se caso tenha dado errado o down vai fazer o contrario do que o up fez para poder voltar no tempo. se o up criou uma tabela, o down vai apagar ela. e assim por diante.

vamos escrever agora as funções para isso
o arquivo orginal criado automaticamente pelo kenx é assim:
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {}

export async function down(knex: Knex): Promise<void> {}


nos vamos pegar o up e dar um await usar o kenx que é o parametro que a função recebe. dar um .schema. ( e aqui abre uma serie de metodos para fazermos criações.)
vamos usar o createTable vamos passar um nome para essa tabela. e o segundo parametro vai ser uma função. essa função vai receber um parametro chamado table
e dentro dela vamos dar um table. e aqui temos acesso a todos os tipos de possibilidades. vamos usar a primeira coluna como sendo a primaryKey. vai ser um id. podemos fazer ele como um increments() e assim iria de 1 2 3 etc. mas a maioria das aplicações não recomenda que usemos chaves primaria por inteiro. eles preferem que a gente use um valor mais aleatorio e dificil de ser descobrto. vamos usar então o uuid que é um gerador randomico. universal unique id
dentro del passamos o nome do campo da tabela. id e para simboliza que é primaria vamos dar um .primary()
fica assim
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
  })
}

agora passamos para nosso proximo campo na tabela.
table.text('title').notNullable() vai ser um campo de texto o nome dele vai ser titulo e ele não pode ficar vazio (not nullabler.)
por enquanto vamos deixar so esses dois campos e a funcção fica assim antes de passarmos para a down
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
  })
}

agora a down onde vamos desfazer a criação da tabela
damos um drop table e passamos o nome da tabela.
a pagina toda fica assim
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

apos salvar vamos executar essa criação da tabela com um npm run knex -- migrate:latest
e ele vai automaticamente ler todas as migrations e executar. 
e com isso criar a tabela transactions para a gente verificar isso a gente pode usar a rota hello onde a gente estava listando nossas tabelas.
ao dar o get ele vai trazer a nossa tabelam trasnactions mas tambem outras tabelas que ele fez de forma totalmente automatizada poqruq o sqlite 
é isso que ele devolve:
[
	{
		"type": "table",
		"name": "knex_migrations",
		"tbl_name": "knex_migrations",
		"rootpage": 2,
		"sql": "CREATE TABLE `knex_migrations` (`id` integer not null primary key autoincrement, `name` varchar(255), `batch` integer, `migration_time` datetime)"
	},
	{
		"type": "table",
		"name": "sqlite_sequence",
		"tbl_name": "sqlite_sequence",
		"rootpage": 3,
		"sql": "CREATE TABLE sqlite_sequence(name,seq)"
	},
	{
		"type": "table",
		"name": "knex_migrations_lock",
		"tbl_name": "knex_migrations_lock",
		"rootpage": 4,
		"sql": "CREATE TABLE `knex_migrations_lock` (`index` integer not null primary key autoincrement, `is_locked` integer)"
	},
	{
		"type": "table",
		"name": "transactions",
		"tbl_name": "transactions",
		"rootpage": 5,
		"sql": "CREATE TABLE `transactions` (`id` char(36), `title` text not null, primary key (`id`))"
	},
	{
		"type": "index",
		"name": "sqlite_autoindex_transactions_1",
		"tbl_name": "transactions",
		"rootpage": 6,
		"sql": null
	}
]
o sqlite sequence é uma tabela criada pelo sqllite para lidar com colunas deincrement. ele tambem cria a knex migration para listar as tabelas criaas e a knex migration lock. essas duas tabelas são responsaveis por anotar no banco de dados quais migrations ja foram executadas.
a partir do momento que uma migration foi enviada para a produção ou para o nosso time ela nunca mais pode ser editada.
se voce criou uma migration e errou algo vc vai ter que fazer outra para modificar.
porque a partir do momento que outra pessoa executou a migration se vc editar ela nunca vai receber essa edição porque no banco de dados dessa pessoa ja esta anotado como migration executada.se voce ainda não enviou essa migration pra a produção ou para o seu time ainda da para editar. para fazer isso temos que
# editar migration
para o server
e dar um npm run kenx -- migration:rollback

ai ela desfaz a migration e com essa migration desfeita a gente pode alterar o que quiser.
nosvamos la adicionar um novo campo.
campo tipo decimal nome dele vai ser amount e ele vai ter 10, 2 ou seja o dez é o tamanho do numero que queremos armazenar e o 2 é o numero de casas deciamais.
e tambem não vai ser nulo. fica assim:
  table.decimal('amount', 10, 2).notNullable()
  vamos tambem fazer um timestamp com o nome de created_at que é um campo que geralmente colocamos em todas as tabelas para anotar a data que o registro foi criado. para fazer isso a depender das tabelas usamos sintaxe diferente, now ou curenttimestamp etc. mas nosso knex é para poder usar ele em qualquer banco de dados enão temos que fazer algo que todos peguem;
  então dentro do nosso defaultTo() vamos passar knex.fn.now que é algo que o nex tem para fazer a data. fica assim
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    a pagina fica assim:
    import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

salvamos isso. e rodamos de novo a migration latest
com isso a tabela ja esta fucnionando e nos podemos trabalhar com ela.

mas tambem podemos adicionar migrations so para alterar um campo.
no caso de uma tabela ja ter sido enviada;
a gente pode fazer algo como npm run knex -- migrate:make add-session-id-to-transactions

com isso a gente vai criar uma migration não mais de criar uma tabela ma sim de adicionar uma sessão a uma tabela transactions.
ele vai criar um novo arquivo com o mesmo formato para a gente fazer o up e o down e ai no up vamos fazer await knex schema e passar um alter table e nele passamos o nome da tabela que queremos alterar e recebemos essa tabela como um parametro na segunta função
agora podemos por exemplo adicionar um novo campo usando
table.tipo do campo nesse caso uuid. passamos o nome session id e podemos falar onde queremos que ese campo seja posicionado. vamos colocar o after(id) para falar que queremos ele logo apos o id (mas nem todos os bancos de dados suportam isso)
vamos tambem botar um .index() para ele criar automaicamente um index
o index é uma forma de falar para o banco de dados que vamos fazer muitas buscas dentro em transaçoes especificas de um idsession ou seja vai ser muito usad no where assim ele faz um cache para isso e faz as buscas serem mais rapidas.
ficou assim:
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {}


agora vamos fazer o down
vamos desfazer isso
table.dropcolumn
tudo fica assim:
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}

# inserrir transaçoes nas rotas
vamos la no server. na rota get que tem o hello e vamos começar a fazer a logica para inserir as rotas
vamos retirar o que tem na rota e fazer uma const transaction e vai ser igual await knex na tabela transaction e vamos usar o metodo insert para inserir uma nova transação.
e ai temos que abrir um objeto com os tipos de campo que vamos ter na tabela. o id que vai ser um uuid que ja colocamos la na nossa tabela. ai a gente importa o modo crypto do node e usa o metodo random crypto.ramdomuuid()
vamos mandar o titulo 
o amount
não vamos colocar um session id porque ele não é obrigatorio nao tem o notnullable.
e no fim a gente retorna a transaction

  fica assm:
  app.get('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  })
  return transaction
  
})
 * estou achando estranho a rota ser com get. talvez ele ainda mude isso.
 se a gente rodar a rota hello assim ele vai nos dar um retorno 1
 porque o knex por padrão não traz retorno muitos especificos.
 para dar os elementos especificos a gente pode botar no fim da função insert um .returnin(*) o asterisco significa que vai retornar tudo que esta ali
 ficaria assim insert().returning(*)

alem da insercão nos podemos fazer uma busca com o knex('transactions).select(*) que era o codigo que tinhamos antes.
eu fiz duas rotas uma de post e uma de get para ficar mais claro porque na aula ele esta apagano e fazendo outra. todas na de get
ficou assim:
app.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')
  return transactions
})

app.post('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  })
  return transaction
})


voltando na rota de get. nos podemos tambem fazer querys
se apos o knex('transactions) a gente colocar um .where o where da varias opções  mas a gente vai abrir um ('amount', 1000) ou sejapegamos a tabela transactions e onde o amount seja 1000 vamos selecionar tudo.
fica assim
app.get('/hello', async () => {
  const transactions = await knex('transactions')
  .where('amount', 1000)
  .select('*')
  return transactions
})

# variaveis de ambiente
variaveis de ambiente são informações que podem variar a cada ambiente que a nossa aplicação esta executando
ambiente são os momentos de nossa aplicação como de desenvolvimento; de produção, de teste, staging(preview da produção)
existem configura_ções que vao ser diferentes para cada um desses ambientes o banco de dados é um deles. a gente usa um banco de dados enquanto estamos em desenvolvimento porem na produção vamos usar outro.
por isso precisamos das variaveis de ambiente
a gente cria um arquivo .env que vai armazenar as nossas variaveis de ambiente esse arquivo fica na raiz do progeto
para trabalhar com esse arquivo no vs code precisamos instalar a extenção chamada dotEnv
dentro do arquivo.env todas as configurações vao ser chave e valor.
o valor a gente pode colocar entre aspas ou não mas é indicado colocar entre aspas duplas. ai por exemplo vamos dizer que o databe url vai ser o endereço dele por exemplo fica assim:
DATABASE_URL="./db/app.db"

agora para ler esse arquivo .env dentro do node precisamos instalar uma extensão chamada dotenv
npm i dotenv
agora la no nosso arquivo databes.ts nos vamos importar no topo de tudo dotenv/config
para informação a pagina de database.ts fica assim:
import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)


deve ter algo na aula que eu perdi porque a minha estava um pouco diferente.

esse dotenv/config que a gente importou vai ler o database e vai export todos os valores que temos no nosso .env dentro de uma variavel glogal chamada process.env essa process.env vai trazer varias variaveis automaticas e tambem a nossa database_URL que a gente programou no .env.
com isso no lugar de filename que a gente passa o endereco que colocamos para a nosso app.db nos podemos colocar process.env.DATABASE_URL e ele vai ler o valor que nos passamos la. é uma forma de modular o codigo.
export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },

  porem temos um pequeno erro porque o typescript percebe que o database_url pode estar preenchido ou vazio la no .env e o typescript reclama dessa possibilidade dele estar vazio. no futuro vamos resolver isso de uma forma melhor mas por enquanto vamos abrir uma condicional antes do export para faar que se nos não tivermos informado o process.env.database_url nos vamos disparar um erro e ai nenhum codigo que esta abaixo vai executar
  a pagina fica assim por enquanto:
  import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE URL NOT FOUND')
}

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)

as variaveis de ambiente nos colocamos geralmente dados sensiveis, chaves de api que vamos integrar com serviços terceiros e etc. então o .env vai estar no gitignore.
e como esse arquivo não vai entrar no controle de versão ou seja no github um outro desenvolvedor que for pegar seu codigo não vai saber o que informar nas variaveis. então a gente vai criar um arquivo chamado .env.example na raiz do projeto. e dentro desse arquivo colocamos quais são as variaveis que temos mas não colocamos os valores para elas. principalmente de conteudos sensiveis. poderia ficar assim:
DATABASE_URL="./db/app.db"

API_KEY=
por exempl o url da database não é algo realmente sensivel então podemos até deixar. porem a chave de api a gente não coloca nada depois do igual. porque seria algo sensivel.
e o example pode subir no git sem problema.

# eliminar esses if para tratar as env
podemos usar uma biblioteca expecifica para validação de dados, que vai validar se esse dado é um numero, string etc. a gente precisa validar alem da presença dos dados temos que validar tambem se ela foi passada da forma correta.
vamos criar uma pasta env dentro da pasta src e vamos criar um arquivo index.ts
vamos tambem instalar a biblioteca zod para a validação de dados
npm i zod
nos vamos tirar a importação da dot env config do database e passar ela para o env/index.ts
agora essa importação vai ler o nosso arquivo de variaveis e vai passar todas elas para o process.env então podemos acessar ela usando o process.env.DATABASE_url
vamos imortar de dentro do zod o z que serve para a gente criar um schema ou seja um formato de dados que vamos receber das nossas variaveis ambientes e nos vamos fazer de uma vez para todos as nossas variaves de ambiente não vai ser uma por vez.
então vamos definir que o nosso process.env é um objeto usando o z.object
por enquanto fica assim
const envSchema = z.object({
  e aqui dentro vamos passar quais variaveis vamos ter dentro de nossa aplicação

})

vamos colocar   database_URL  e ela vai ser uma string então vamos colocar : z.string() se ela podesse ser nula tambem a gente colocaria um .nullable depois do string() 
e ai dentro desse objeto nos vamos passando uma por uma cada tipo de variavbeis ambientes que a gente colocar no nosso app como por enquanto so temos essa fica so ela.
apos isso  colocamos apos fechar esse objet uma nova const
const env = envSchela.parse(process.env) 
ou seja a const env vai pegar esse objeto e vai aplicar a nosso process.env
caso alguma informação de erro esse metodo de parce vai dar um throw new Error automaticamente e pararia a aplicação. se tudo der certo o restante do codigo vai funcinar automaticamente e não se a gente escreve env. ele ja acha o databaseurl la dentro então podemos usar com o codigo sabendo que é uma string.
so para encher um pouco vamos colocar tambem a variavel port dizendo que precisa ser um numero e se não tiver definida o valor default dela vai ser 3333
apos isso vamos exportar a nossa const env para usar ela em outros lugares. a pagina fica assim:
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

export const env = envSchema.parse(process.env)

e agora sempre que a gente precisar usar uma variavel ambiente ao inves de acessar por process. env a gente acessa diretamente do env que vai ser importado desse arquivo index. assim podemos nos livrar do if que fizemos no database o arquivo database fica assim:
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
 podemos no server tambem ao invez de usar a port 3333 definida a gente simplismente importar do env a port.
 outra variavel ambiente muito comum é a que especifica justamente em qual ambiente estamos a chamada node_env ele geralmente é implicito pelas ferramentes que estamos usando na aplicação mas vamos declarar ele tambem a variavel node env vai ser geralmente development test ou production então vamos usar para ela a caracteristica z.enum() enum significa que ela vai ser uma entre algumas opções no caso essas tres. colocamos isso dentro de um array e para o default o z ja sugere uma dessas tres vamos colocar production ou seja se a gente não especificar vai ser essa. e vamos la no nosso .env e vamos informar como developmen,t. e vamos passar logo isso tambem para nosso example.
 entéao se a gente executar a aplicação sem uma variavel obrigatoria vai dar erro. porem o erro não explica bem o que aconteceu. para o erro ficar mais claro a gente vai  no index e mudar o tipo de parse para o safeParse que é igual o parse mas não dispara o erro caso de um problema. então ao inves de dar o export direto nos vamos chamar essa variavel de _env como variavel provisoria
 e vamos fazer se _env for igual a false que significa que ele falhou porque algo não foi passado a gente vai dar nosso proprio erro com o que acontece e dar um env.error.format para entender qual variavel esta com erro. e caso ele passe por esse erro a gente exporta o env como sendo o data do _env a pagina fica assim
 import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('error: inalid enviroment variables:', _env.error.format())
  throw new Error('invalid variables')
}

export const env = _env.data

# planejamentos do banco de dados
precisamos pensar nessas tres coisas antes de sair criando nossas rotas.
ou seja quais são as funcionalidades da aplicação o que o usuario pode ou não pode fazer no app

## requisitos funcionais

[] o usuario pode criar uma nova transação
[] o usuario deve poder obter um resumo de sua conta (rota que vai retornar o valor total)
[] o usuario deve poder listar todas as transações queja ocorreram
[] o usuario deve poder visualizar uma transação unica

## regras de negocios (condicionais coisas que podem acontecer e o usuario vai validar)

[] a transação pode ser debito ou credito ou seja dinheiro entrando ou saindo do valor total
[]deve ser possivel identificarmos o usuario entre as requisições (ou seja se dois usuarios usarem a aplicação não vamos impactar as transaçoes um do outro)
[]o usuario so pode vizualizar transaçoes que ele criou.


## requisitos não funcionais (vamos adicionar depois )

vamos colocar esse checklist como um readme na raiz do projeto e quando formos fazendo as funcionalidades vamos dando ok.


# plugins do fastify
uma das funcionalidades mais importantes do fastify é a de plugins
que é a possibilidade de separar pedaços de nossa aplicaão em mais arquivos.
por exemplo abrir uma pasta routes para colocar as rotas do transactions
se nesse arquivo transactions dentro da pasta rotas a gente colar a nossa rota que fizemos fcaria assim:

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return transactions
})
app.post('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')
  return transaction
})


porem isso daria errado porque o app não existe nesse contexto então essa rota não saberia o que fazer.
a gente poderia exportar a variavel app do server mas não faz muito sentido porque o app que vai importar as rotas, assim o app faria um vai e vem de exportar a app e trazer de volta as rotas.
então vamos usar essa funcionalidade de dentro do fastify que é a plugin. como vamos usar
na pagina de transactions vamos exportar uma funcção chamada transactionRoutes.
que vai ser o nome do nosso plugin 
e essa função vai receber como parametro o nosso app
e ela vai ter dentro dela as rotas
importamos o knex do nosso database
agora dentro do nosso server vamos retirar a nossas rotas que estavam la e vamos chamar o pluging
fazemos isso assim
app.register(transactionsRoutes) ou seja passamos para o register o nome do nosso plugin
todo plugin do fastify precisa obrigatoriamente ser uma função assincrona enão quando estivermos criando a função transactionRoutes temos que declarar como async
o transaction fica assim:
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes(app) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions')
      .where('amount', 1000)
      .select('*')
    return transactions
  })
  app.post('/hello', async () => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000,
      })
      .returning('*')
    return transaction
  })
}

(ta dando um erro no app sobre implicito qualqeur tipo mas vemos isso depois)
e o server fica assim:

import fastify from 'fastify'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes)
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })
(tambem tem um erro apontando na importação do transaction routes mas ele esta fucnionando normalmenta)
  vamos dar o type colocamos : fastifyInstance
  export async function transactionsRoutes(app: FastifyInstance) mandamos importar o instace automaticamente.
  para resolver o poblema da importação no server é so salvar o transactions como .ts

  podemos fazer diversos plugins e colocar eles em nossa aplicação. quantos quisermos porem é importante ter uma ordem neles. a ordem de leitura caso ul precise modificar algo do outro. mas em breve vamos aprender mais sobre isso.
  
  # rotas
  como nossas rotas todas vão ter o endereço /transactions nos podemos tirar esse endereço usando a importação do plugin no register passando um segundo parametro com informações u seja la no server na register a gente passa o prefix como uma informação no objeto do segundo argumento da função. fica assim:
  app.register(transactionsRoutes, {
  prefix: 'transactions',
})

agora todas nossas rotas podem estar com somente / e ele vai interpretar como /transactions.

vamos agora atualizar a rota post usando o body da transação ao invez de fazer aquele post estatico como estava.
estava assim:
 app.post('/', async () => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000,
      })
      .returning('*')
    return transaction
  })

  vamos retirar a const transaction e colocar uma desestruturação para pegar da requisição as informações que vao vir de la.
  nos podemos receber dentro dessa async a nossa request
   e agora dando request. nos temos varias possibilidades nos vamos pegar o body. de onde vem as informações enviadas pelo usuario.
   porem esse request.body tem o tipo como desconhecido. e queremos evitar isso.
   dentro do request body nos queremos receber tres coisas o tittle o amount e o type (credito ou debito) 
   então nos vamos usar novamente o zod para validar essas coisas
   dentro da rota de app post nos vamos fazer uma const para validar esse schema usando o Z.object fica assim:
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    e agora vamos criar uma const body para dar um parce no nosso request body por esse schema. vai ficar assim.
      const body = createTransactionBodySchema.parse(request.body)

      ou seja nos validamos se o que vem do nosso request body bate com o esquema de validação que criamos. caso de erro o parseda um throw e ai não le o resto do codigo.
      agora dentro do body nos ja temos o tipo dessa validaçéao. nos podemos então substituir o body por uma desestruturação. a gente coloca um objeto do lado esquerdo para pegar o title o amount e o tyope. fica assim:
      const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    agora vamos criar a nova transação
    poderia ser assim:
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount,
        type,
      })

      porem no nosso banco de dados nos não criamos a coluna para o typo. então o que vamos fazer com isso.
      a gente vai retirar o type do insert e no amount nos vamos fazer uma condicional.
      se for do tipo credito vamos usar o amount como ele esta. se for debito vamos usar ele como negativo assim:
        amount: type === 'credit' ? amount : amount * -1,

        nas api a gente geralmete não faz retorno e não vamos tirar essa parte do .returning(*)
        nos vamos tambem tirar o const transaction = para não precisar retornar nada ou seja não precisar usar essa const. vai iniciar ja com o await
        porem nos sabemos que precisamos retornar um http code
        vamos entao passar para a funçao a response que o knex chama de reply
        assim podemos retornar essa resposta e vamos usar ele assim
        return reply.status(201).send()
        o status vai ser o codigo que ele vai mandar e o send épara enviar. nesse caso esta vazio então ele envia essa resposta so com o codigo. mas no send a gente pode colocar algo dentro se quiser como um texto.
        a pagina fica assim com o post alterado:
        import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions')
      .where('amount', 1000)
      .select('*')
    return transactions
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })
    return reply.status(201).send()
  })
}

# tipagem tabela knex
o knex não consegue identificar de maneira automatica quais campos e quais tabelas no nosso banco de dados
ou seja se a gente for inserir algo na tabela ele não vai te sugerir o que exite na tabela para que a gente possa fazer de forma correta
porem podemos dizer manualmente para o knex quais as tabelas e quais campos tem.
vamos criar a pasta @types
ela vai servir para a gente sobrescrever tipagens de outras bibliotecas.
vamos criar um arquivo chamado knex (porem o nome tanto faz) mas a extenção é .d.ts
o d vem de definição de tipos. é um arquivo sem javascript nele. somente codigos typescript ou seja somente o typescript entende ele.
quando a gente for trabalhar um arquivo de types a primeira coisa a fazer nele é importar a biblioteca.
então importamos o Knex from knex
como nos não vamos usar a variavel Knex a gente passa um comentario para o eslint para ele ignorar a proxima linha e não ficar disparando esse erro fica assim:
// eslint-disable-next-line
import { Knex } from 'knex'

nos não usamos o Knex porem essa declaração é uma forma de declarar que queremos usar os types que ja existem na bilbioteca knex
agora nos vamos declarar coisas suplementares a isso.
vamos declarar o modulo knex/types/table
esse modulo é porque o knex tem o tables dentro dele como interface se a gente for procurar la dentro do knex indo a fundo. porem essa interface esta vazia.
esse é um arquivo que ajuda a mapear as tables do banco de dados. e usando o modulo que a gente vai declarar nos podemos atualizar ele e deixar o knex mais esperto para nosso programa
dentro da nossa declaração a gente vai exportar uma interface Tables {}
e dentro dela vamos falar quais tabelas existem em nosso banco de dados
ao declarar uma tabela. nas nossas rotas quando a gente escrever o knex() ele ja vai identificar a tabela.
a pagina fica assim:
// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}

e agora ao dar um insert ele tras pra a gente todos os campos, e se a gente tentar inserir um campo, que não existe ele da erro.
fazendo essas coisas é bom para nosso codigo ficar mais simples e facil de receber manutenção

# atualização na lsitagem
vamos fazer a rota usando o get e a / e vamos tirar o where. vai ficar dessa forma:
  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return transactions
  })

  retornando o transactios simples
  porem se um dia a gente quiser fazer um retorno com ações extra como ter a contagem do total de transações. fica ruim de fazer. então a gente vai retornar um objeto e dentro dele a gente coloca a transactioons
  assim:
    app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return {aqui podemos adicionar coisas e depois termos a transactions}
  })

vamos aproveitar e criar uma outra rota que busca detalhes de uma transação unica.
vamos pegar o /:id para pegar um parametro da rota que vem com id
depois disso vamos fazer a async
e de dentro da request vamos acessar os params so que essesparams vao estar como desconhecidos então vamos fazer o mesmo esquemado zod
vamos dar uma const de getTransactionSchema = z.objetc{
  id: z.string().uuid()
}
o zod ja permite que nossa validação pegue que não apenas seja uma string como que seja um uuid
depois a gente pega o id dela passando o nosso request.params pelos parse do schema.
fica assim
 app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)
  })

  agora vamos fazer a const transaction dentro dessa rota que vai ser um await knex('transactions).where('id', id).first()
  temos que botar o first no final porque nos vamos ter uma unica transação com esse id. e se a gente não colocar o metodo first ele vai retornar isso como um array.
  e nos queremos apenas a entrada, então o first vai gtrazer um resultado que vai ignorar a possibilidade de ter mais de um e por isso ele não vai fazer um array.
  e depois disso damos um return {transaction}
  fica assim:
   app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()
    return { transaction }
  })

e agora podemos pegar algo pelo id no insomnia.

# resumo
o usuario deve poder ver o resumpo de sua conta.
vamos criar uma rota chamada sumary com um app.get('/sumary, async
)

essa rota vai fazer uma query para o banco de dados.
ou seja const transactions = await kenx('transactions)
e agora vamos usar um metodo de agregação chamado sum() esse metodo vai somar tudo que tem dentro de uma coluna então passamos amount para ele fica assim
  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount')
  })

  e ai como ele soma todos os valores o resultado vai ser um resultado so então se a gente retorna return {summary} ele vai retornar como array então vamos colocar um first no final para ele entender que o retorno é um so
  tambem o nome que vai aparecer la vai ser sum amount: o valor da soma
  para mudar isso a gente pode no segundo parametro da sum() passar algumas configurações em um objeto. uma dessas configurações é o as : '' e ai podemos colocar o nome que a gente quer que apareça vamos colocar o nome da coluna que vai ser amount
  fica assim: 
   app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  # transação especifica para os usuarios
  para que quando varios usuarios usarem a aplicação nos queremos que cada usuario tenha aceso apenas a suas tabelas.
  como fazer isso?
  tudo inicia na criação da primeira transação. nos queremos ter alguma forma de anotar na maquina desse usuario um id e qual esse id o usuario vai utilizar em todas as açoes sequentes para identificar que esse usuario é o mesmo que criou a tabela em questão.
  para isso vamos usar coockies
  são formas de mantermos contexto entre requisições
  eles vao salvar algumas coisas como um id dentro do seu navegador esse id é uma forma da aplicação validar que a mesma pessoa fez tais processos dentro da aplicação
   e uma vez logado na aplicação todo esse historico de coisas que voce fez antes de logar são salvos na sua conta
   nos vamos utilizar a estrategia de coockes para a gente saber que o mesmo usuario que esta utilizando a aplicação é o que criou uma transaction.
   por isso criamos a session id
   obviamente a gente so faz isso por que não temos sistema de autenticação.
   com esse session id o fluxo que queremos na aplicação é apartir do momento que o usuario criar a primeira transação nos vamos anotar para ele um session id nos cockies deles. quando ele for listar uma transição nos vamos validar apenas transações desse mesmo session id
   para trabalhar com cokkies no fastify vamos ter que instalar o pacote de cookies dele assim:
    npm i @fastify/cookie

    agora vamos no server e antes das rotas porque o cadastro dos cookies precisa acontecer antes de nossas rotas acontecerem. vamos dar um app.register
    e vamos passar para o register o cookie que nos vamos importar do fastify/cookie
    fica assim:
    import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })


salvamos isso e agora dentro das transactions no app.post antes de inserir o dado no banco
vamos dar um let sessionId = request.cookies.sessionId
o que isso esta fazendo esta procurando dentro dos cookies da requisição se ja existe uma sessionId se ela ja existir nos vamos passar ela quando a gente criara transação.
se não vamos fazer a condicional de if !sessionId ou seja o usuario não tenha uma nos coockies dele a gente vai criar um novo para ele usando o ramb=dom uuid e vamos salvar nos cookies utiizando o reply.cookie uma informação chamada sessionid com o valor que acabamos de criar e vamos passar algumas configurações para esses cookies abrindo um objeto. dessas as mais importantes são quais rotas do backend vai poder acessar. se usar / todas vao poder acessar vamos dar isso de path.
temos tamvbem as informações sobre a exiração. todo cookie em algum momento vai expirar então temos duas formas de passar isso se a gente passar o expires a gente precisa passar um date com a data correta que o cookie vai expirar usando o new Date( passar a data ate o segundo)
o que a gente faz é o maxAge one passamos em milisegundos o quanto de tempo o cookies deve passar no navegador do usuario. então vamos passar 1000 (um segundo) * 60 (um minuto) * 60 (uma hora) * 24 (1 dia) * 7 umasemana. para ser cleancode a gente coloca logo depois um comentario dizendo o que esse numero significa. fica assim o total:
    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }


agora pode salvar e ir criar um post na aba cookies ele vai retornar o valor da session id

# validar os cookies
o que precisamos fazer agora nas rotas tanto de listagem, post e etc é buscar as informaçoes daquele usuario para interagir apenas com as tabelas desse usuario.
vamos começar pela que lista
nos podemos por exemplo buscar o sessionId dentro de request.coockies.sessionId
e dizerq que se a sessionId não existir dentro dos cooclies a gente pode dar um retorno de erro dando um reply.status(401).send('voce não esta autorizado a fazer essa requisição)
o codigo de não autorizado é 401

podemos pelo insomnia deletar o cookie.
fica assim:
 app.get('/', async (request, reply) => {
    const sessionId = request.cookies.sessionId
    if (!sessionId) {
      return reply.status(401).send({
        error: 'unauthorized',
      })
    }
    const transactions = await knex('transactions').select()
    return { transactions }
  })
  agora se a gente for no insomnia e limapr os coockies e tentar acessar a lista ele vai dar unauthorized se a gente criar algo novo ele vai criar o cookie para a gente e ai vamos poder ver.
  porem nos queremos listar transaçoes apenas onde o sessionId seja igual ao que a pessoa esta logada então vamos na const transactions depois do select e colocar um where('sessionId', sessionId) ou seja as tabelas com o campo sessionId sejam iguais ao sessionId que é mostrado pelo request fica assim
  const transactions = await knex('transactions')
      .select()
      .where('session_id', sessionId)
    return { transactions }
  })

  assim funciona. porem esse codigo que valida que o coockie existe vai aparecer para todas as rotas então ao invez de ter o mesmo codigo repetitivo, a gente poderia talvez fazer algo para não ficar repetindo isso.
  para isso no fastify o nome seria prehandler mas a gente vai chamar de middleware.
  criamos uma pasta chamada middlewhere
  o middleware vai ser um interpretados que vai ser executado antes de qualuqer rota.
  e caso tenha um erro ele vai dar logo um erro se não ele vai deixar rolar 
  vamos dar o nome para o arquivo checkSessionIdExists.ts
  dentro dele nos vamos exportar uma async function que vai ser como a função que passamos de segundo parametro para a rota ela vai receber um request reply e vamos passar a logica de check que estava la na rota para o corpo dessa função. 
  export async function checkSessionIdExists(request, reply) {
  const sessionId = request.cookies.sessionId
  if (!sessionId) {
    return reply.status(401).send({
      error: 'unauthorized',
    })
  }
}
veja que nos não passamos nada para o caso do if não pegar um erro, porque o padrão desses codigos é que se não cair nsse erro ele vai seguindo tranquilamente o resto da aplicação. ou seja se o middleware não interceptar ele vai continuar.
o request e reply estão como any, podemos mudar isso. vamos tipar eles usando o fastify request e reply que vamos importar do fastyfy fica assim:
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  agora voltamos para nossa rota.
  para o session id parar de dar erro a gente pega ele de volta do cookies assim
   const { sessionId } = request.cookies
   mas nos queremos que a nossa verificação aconteça antes de rodar nosso codigo então na função logo apos a rota e antes da função em si nos vamos passar um objeto.
   export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/',{nos colocamos o objeto bem aqui} ,async (request, reply) => {

nisso a gente pode passar varias coisas e o que a gente vai passar agora é o prehandler. handler é a função que executa o codigo e prehandler vai ser algo que é executado antes
nesse prehandler a gente vai passar o nosso lidkeware. como podemos passar varios a gente passa eles dentro de um array, mas em nosso caso o array so vai ter uma coisa dentro. fica assim:
import { checkSessionIdExists } from '../middleware/checkSessionIdExist'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .select()
        .where('session_id', sessionId)
      return { transactions }
    },
  )
  agora a gente copia essa parte de prehandler e cola em todas nossas rotas
  menos na de post porque ela tem uma logica diferente que ja esta feita.
  nos vamos agora adicionando a linha de pegar o sessionId dos cookies e  adicionar na transactrion um andWhere('session_id' sessionId) ou podemos no primeiro where simplismente passar um objeto e passar os id e o sessionId ficaria assim:
  const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first()
      return { transaction }

      na da summary como so tem o sessionId a gente deixa a semantica andiga dde 'session_id', sessionId

      a pagina fica assim:
      import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'
import { checkSessionIdExists } from '../middleware/checkSessionIdExist'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .select()
        .where('session_id', sessionId)
      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = getTransactionsParamsSchema.parse(request.params)
      const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first()
      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}

# midleware global
o nosso prehandler esta ativando em rotas especificas a gente esta indo em cada rota e ativando ele.
porem podem existir prehandlers ou middleares globais que a gente queira que sejam usados em todas as toras.
porem é ainda mais interessante entender que quando a gente cria um plugin ou seja a gente tem uma parte separada da aplicação. essa parte separada possui um contexto especifico ou seja tudo que for registrado no contexto do nosso arquvo de rotas apesar de ser global vai valer apenas para as rotas desse contexto. porque nosso arquivo de rotas transactionRoutes é um plugin
então se a gente criar um outro arquivo de rotas para lidar com rotas diferentes. tudo que foi salvo no arquivo de transactionroutes não vai valer para ele.
então para criar um um handler global ou seja um prehandler que rode independete da rota qua o usuario esteja usando a gente vai criar um
app.addhook('preHandler', colcar nossa função async)
e essa função vai acabar sendo no mesmo esquema das outras. a gente vai colocar esse app.addHook no proprio arquivo de rotas antes do app.get
essa função então que esta la no addhook vai valer para todas as rotas. para testar isso nos vamos fazer um console.log e agora o que a gente fizer vai aparecer no nosso terminal. fica assim:
export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(
      `voce usou o metodo [${request.method}] e a rota ${request.url}`,
    )
  })
  app.get(
 
 e isso vai funcionar em todos as rotas inclusive na post. 
 lembrando que a gente poderia escrever essa função em um middleware e no addhook passar somente a importação dessa função. funcionaria tambem e o codigo ficaria limpo se fosse uma função grande.
 isso esta fucnionando.

 porem o quea gente faz ali fica especifico ao contexto das rotas desse qrquivo transactionRoutes.
 se a gente criar uma nova rota em outro arquivo como por exemplo /hello dentro do arquivo server. ai o nosso console.log não vai fucionar porque estamos em outro contexto;
 então para fazer ele global realmente de funcionar em todas as rotas da aplicação a gente teria que chamar ele a parte. colocar ele no server antes de chamar qualquer coisa. vamos retirar ele da rota transactionRoutes e colocar dentro do server. porque ai ele vai fucnionar no contexto global do fastify.
 o arquivo routes fica como estava antes desse ponto de rotas globais e o arquivo server fica assim:
 import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request, reply) => {
  console.log(`voce usou o metodo [${request.method}] e a rota ${request.url}`)
})
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })

# testes automatizados
são formas de a gente manter a confiança na hora de dar manutenção no codigo a longo prazo
não é simplismente garantir que a aplicação esta funcionando. mas ela tambem da confiança para trabalhar no codigo sem ter medo que algo possa quebrar ao modificar algo.
aplicação grandes precisam de testes porque muita coisa pode acontecer.
as vezes a gente mexe em uma parte do codigo e outra coisa distante quebra
com testes automatizados a gente simula açoes que o usuario faria na aplicação e assim assegura que sempre que alterarmos algo vamos perceber se algo quebrar.
varios tipos de testes os mais famosos são
 unitarios
 * vao testar apenas uma unidade da aplicação ou seja uma pequena parte da aplicação de forma totalmente isolada por exemplo executar uma função sozinha e ver se ela retorna o que esperavamos. não vamos testar se a rota que usa essa função vai continuar funcionando. gerealmente o teste masi usado na app
 integração
 * quando testamos a comunicação 2 ou mais unidades aqui ja vemos como os pedaços menores da aplicação funcionam trabalhando juntos
 end to end ou e2e ou ponta a ponta
 * testes que simulam um usuario operando na aplicação. testa tudo. 
 o teste e2e no frontend nos realmente fazemos um 'robo" que vai digitar as coisas, clicar nas coisas e etc, usando um navegador. porem no backend o usuario é o frontend ent então o que ele vai fazer são chamadas http websockets, etc vamos testar as camadas expostas ao mundo externo. ou seja camadas que se comunicam com o frontend. vamos testar se as portas de entrada de nossa aplicação estão funciionando até o nosso banco de dados.
 # piramide de testes
 cada teste tem uma dificuldade e algumas exigencias que precisamos seguir na nossa aplicação. o primeiro teste que temos que aprender é o end to end
 porque eles não dependem de nenhuma tecnologia, nel de arquitetura de software nem nada, qualquer pessoa pode escrever independente da aplicação da tecnologia da arquitetura eetc. eles tem uma barreira de entrada bem pequna. nessa aula vamos fazer so teste end to end
 mas porque não escrevemos so teste end to end, ja que eles testam tudo?
 porque eles simulam o usuario final e etc, porque eles são extremamente lentos.
 o app da rocketseat tem mais de 2000 testes, imagina todos esses testes sendo lentos.
 os outros tipos de testes são muito mais performaticos. a ideia é a gente ter poucos testes end to end meios testes de integração e muitos testes unitarios.
 nos não vamos criar eles agora porque eles dependem de uma arquitetura da aplicação mais inteligente.
 vamos fazer nossos primeiros testes
 # primeiro teste
 geralmente usamos uma outra feramenta para escrever os testes. o node ate tem uma api propria de teste mas ela é bem recente. então vamos usar uma biblioteca.
  e a sintaxe é a mesma que vamos usar para qualquer ambiente javascript.
  a ferramenta mais famos de teste hoje em dia é o jestJs.io
  mas não vamos usar o jest porque a um tempo lançaram o vitest que é das mesma familia do vite
  o vitest é uma framework ou seja um ecosistema para testes o mais importante é que por baixo dos panos ele usa a ferramente esbuild que tambem esta por traz do vite. quando a gente faz o teste ele vai ta escrito em typescript, e eles vão ser traduzidos para o js para o node, e o jest a gente tem que instalar isso tudo a parte mas no vitest ja vem automatico. suporta typescript o ecmascript modules e etcs e suporta tambem jsx. a sintaxe é exatamente igual ao jest.
  a instalação do jest a gente tem que configurar varias coisas no vitest é praticamente so instalar.
  amos dar um npm i vitest -D
  criamos uma pasta chamada tests e dentro dela um arquivo de teste vamos fazer o example. os testes gralmente terminal com a extenção .test.ts ou .spec.ts podemos escolher a que quisermos
  nesse arquivo vamos importar test from vitest

  chamar a funcção test() e dar um nome para ela assim test('nome do teste') no segundo argumento passar uma função e dentro dessa função vamos escrever nosso teste.
  o teste é composto por tres coisas importantes.
  1 - enunciado - o que ele esta proposto a fazer
  2 - operação - como vamos escrever o codigo para o teste realizar o que a gente quer
  3 - validação - apos fazer o teste temos que dar um resultado se foi bem sucedido ou não isso a gente

  para validar a gente coloca por exemplo um expect(responseStatusCode).toEqual(201) ou seja a gente espera que a resposta do serivod a nossa chamada seja um 201 ou um codigo que fucnionou. claro que abaixo esta em hardcode mas uma ideia seria isso:

  import { expect, test } from 'vitest'

test('user create new function', () => {
  const responseStatusCode = 201
  expect(responseStatusCode).toEqual(201)
})

a gente roda ele com npx vitest
para não ficar rodando npx vitest e ele ja encontra a pasta tests a gente pode ir no package json e criar um script test para executar vitest
resultado mostrado em um teste que funciona e em um que falha:
✓ tests/example.test.ts (1)
   ✓ user create new function

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  17:13:08
   Duration  191ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

➜  apiRest git:(main) ✗ npm run test

> apirest@1.0.0 test
> vitest


 DEV  v0.34.3 /mnt/c/users/queis/onedrive/documentos/testevite/backend/apiRest

 ❯ tests/example.test.ts (1)
   × user create new function

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/example.test.ts > user create new function
AssertionError: expected 200 to deeply equal 201

- Expected
+ Received

- 201
+ 200

 ❯ tests/example.test.ts:5:30
      3| test('user create new function', () => {
      4|   const responseStatusCode = 200
      5|   expect(responseStatusCode).toEqual(201)
       |                              ^
      6| })
      7|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  17:13:21
   Duration  5.01s (transform 656ms, setup 0ms, collect 780ms, tests 43ms, environment 0ms, prepare 2.38s)


 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

# testar a criação da trasação
vamos criar um teste que vai criar uma transição e vai validar se ela foi realmente criada
esse teste vai fazer uma chamada http
no nosso server nos usamos o app.listen
o que quer dizer que se no nosso teste nos importarmos o app que é a porta de entrada para fazer requisições. ao importar isso ele vai tentar subir um servidor na porta 3333 porem para o teste não é bom subir um servidor porque o pode dar conflito usar a mesma porta que o programa e tudo maais.
a gente poderia usar outra porta, porem colocar o servidor no ar demora um pouco tando pra iniciar quanto para matar. então existe uma ferramente para o ambiente de node chamada supertest e vamos instalar ela
npm i supertest -D
essa ferramente pode serir para fazer requisições para a aplicação sem colocar a aplicação no ar, sel usar o metodo listne. para fazer isso vamos separar nosso server em dois arquivos. o app.ts e o server que ja existe.
no app nos vamos pegar todo o codigo que esta antes do app.listen e jogar ele la e exportar o app.
no server nos vamos importr o app e importar as variaveis ambientes e fazer so o listen.
o app.ts fica assim:
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request, reply) => {
  console.log(`voce usou o metodo [${request.method}] e a rota ${request.url}`)
})
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

e o server fica assim:
import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })

ao dar o run dev não da erro porque ele ainda roda o server e no server tem o listen e a chamada pro app.
e agora no test nos vamos usar so o app sem usar o listen.
e vamos no teste tamvem importar o supertest (usando o nome request) no arquivo de teste porem da um erro na importação do supertest porque ela foi construida com javascript e ai o typescript reclama porque ele não acha os types la. a gente pode ver isso porque no npm site tem um dt que mostra que a parte do typescript foi criada pela comunidade e esta em outro lugar então temos que instalar esse pacote de para o typescript.
npm install -D @types/supertest
agora no nosso test nos vamos dar uma  const response que vai ser igal a await request(app.server) (por conta do await a nossa função tem que ser async ) vamos chamar o request e nele vamos passar o app.server  com essa função a gente cria um servidor node puro, sem framework. o supertest sempre precisa receber esse servidor do node. e agora a gente pode usar os metodo http .post(determinamos a rota).send(aqui vamos enviar os campos que temos que determinar no body do post)
agora podemos dar um expect(response.statusCode).toEqual(201)
porem o supertest nos da uma funcionalidade que a gente pode elimidar a const response, e ao invez de dar um expect(response) a gente so cola la na nossa função um .expect(201) fica assim
import { expect, test } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

test('user create new function', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'new transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})

esse .expect vai validar automaticamente se o retorno é 201.
se a gente rodar o testes assim vai dar erro. por que ele vai retornar um 404 e não um 201. dizendo que a rota não existe
dentro de cada plugin nos temos um await ou seja pode demorar para rodar ou seja a aplicação pode demorar para cadastrar todos os plugins e ai o teste roda sem estar todos os plugins cadastrados. nos precisamos assegurar que os plugins estão cadastrados antes de executar o teste para isso dentro dos testes nos vamos importar do vitest uma funçéao chamada beforeAll a gente coloca ela na raiz antes do nosso teste e dentro dela a gente pode colocar algo para executar antes de todos os testes se a gente quoisesse que fosse antes de cada teste a gente usaria o beforeEach depois de cada teste afterEach depois de tudo afterAll. mas aqui vamos usar o beforAll
vamos chamar ele e dentro dele fazer uma função async e coloca um await app.ready
isso significa que ele vai esperar o app estar pronto. a função do fastify ready ja resolve tudo

vamos usar tambem o afterall e passar para ele uma função async e passar um await app.close() a appclose fecha a aplicação ou seja tira ele da memoria. a pagina ficouassim:
import { afterAll, beforeAll, expect, test } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('user create new function', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'new transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})

agora os testes passam.

## categorizando testes
antes de fazer mais testes a gente pode categorizar eles
ou seja todos os testes da rotas da transação a gente coloca no mesmo arquivo algo como transactions e a gente pode tambem colocar eles dentro de uma categoria usando o describe do vitest vamos importar o describe que serve para categorizar a gente chama describe e coloca um nome como 'transaction routes', no segundo argumento a gente coloca uma função arow e ai a gente coloca tudo dentro dessa funçÃO  inclusive o before all e agora o before all e o after all vao valer apenas para essa categoria. ou seja criamos um contexto.  e agora quando um teste falhar ele vai dizer qual o nome do teste falohou e de qual categoria ele estava.
a gente pode fazer subcategorias usando o describe dentro do describe como por exemplo a gente tem varias rotas get a gente poderia fazer uma subcategoria para os testes da get nela.
outra coisa é que geralmente existe duas funções iguais a test e a it,  nome é diferente mas elas fazem a mesma coisa. ai a gente coloca como a gente quer. o it é porque a semantica de como a gente escreveia it('should be able to create transaction')
mas ai a gente pode deixar como teste tambem. da no mesmo. melhor deixar teste para mim.
# test list all transactions
  para listar as transação a gente precisa de um session id que é criado no cookie quando a gente cria uma transação. como fazer isso no teste? 

  o test tem algumas funções legais qo colocar . como por exemplo um skip que vai pular esse teste. ou o .todo que vai ser para lembrar de fazer esse teste no futuro ao rodar o test ele te lembra que tem um para fazer. e tem o .only pqra rodar apenas aquele test.
  ficaria por exemplo assim:
   test.skip('list all transactions', async () => {})

   umz forma de pegar o cookie seria ao fazer o test de post a gente pegar o cookie dele colocando a chamaa da função em uma const como response e depois dando um response.get('set_Cookie') ficaria assim:
   test('user can create new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
    console.log(response.get('set_Cokkie'))

    mas como pegar isso que esta no contexto de um test para o outro teste?
    não tem como passar. todo teste deve obrigatoriamente se excluir de qualquer contexto. 
    NAO PODEMOS NUNCA ESCREVER UM TESTE QUE DEPENDE DE OUTRO 
    
    então como fazer?
    a gente pode fazer no novo teste a mesma chamada que cria uma transação . ate porque para listar transações nos somos obrigados a ter uma transação adastrada.
    nos tiramos então do post essa const response mas fazemos o post com ela no de list porem tiramos o expect 201 porque não precisamos mais testar issoa gora. vamos mudar o response para create transaction response e vamos criar uma const cokkies pegando o cokkie que foi criado. fica assim a pagina por enquanto:
   import { afterAll, beforeAll, test, describe } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { it } from 'node:test'

describe('transacrion routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('user can create new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })
  test.skip('list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('set_Cookie')
  })
})


agora fazemos uma nova requisição para o servidor para a rota get.
usando o set() para enviar o cookie e colocamos um excpet 200. fica assim:
import { afterAll, beforeAll, test, describe } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { it } from 'node:test'

describe('transacrion routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('user can create new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })
  test.skip('list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('set_Cookie')

    await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)
  })
})

porem para melhorar um pouco a gente melhorar um pouco a gente pode salvar essa requisição como uma const listTransactions e dar um console.log no fim com list Transactions para a gente ver a lista de transações criadas pelo test. mas melhor que esse console.log para ver o transactions a gente pode criar um test para comparar se o que voi criado é o que a gente queria então vamos dar um expect(listTransactions.body).toEqual([{}])
ou seja esperamos que o corpo dessa const seja igual a um array e dentro desse aray tenha um objeto com essa formaração e dentreo desse objeto vamos dizer que vai ter um o title, o amount e o type com os valores indicados. porem o id e o session id created at, e etc a gente ão sabe o valor. para isso nos temos duas formas de resolver.  nos vamos importar o expect e para o id vamos dar um expect.any(String) ou seja vamos dizer qu o id vai ser uma string qualquer e poderiamos colocar isso para todos que a gente não sabe. ou então a gente diz continua igual, declara o array e dentro desse array a gente coloca um expect.objectContaining( ) ou seja a gente espera que tenha um objeto contendo essas coisas, mas não quer dizer que ele não pode conter outras coisas tambem para isso vamos passar um objeto com o titulo e o amount. o type não é salvo no banco de dados. fica assim:
import { afterAll, beforeAll, test, describe, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('transacrion routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('user can create new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })
  test('list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('set_Cookie')

    const listTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactions.body.transactions).toEqual([
      expect.objectContaining({ title: 'new transaction', amount: 5000 }),
    ])
  })
})
deu um erro porque a gente configurou mal. a gente ediu para vir logo o array mas ao olhar o insomnia a gente ve que vem um objeto e dentro dele vem transactions:[{}]
ou seja o array esta envelopado e um objeto para poder cada array ter o seu nome.

então temos que passar body.transactions no expect. vou corrigir no codigo acima.

# configurando banco de dados para teste
nos estamos usando o mesmo banco de dados para teste e para a aplicação
isso acaba sujando o nosso banco de dados
o ideal é que cada vez que a gente execute o teste a gente esteja em um ambiente zerado.
porem dentro do nosso env a url do banco de dados esta fixa e vai ser passada fixa para o server.
nos vamos criar então na aplicação um arquivo .env.test
vamos coloca_lo tambem no gitignore
e nesse arquivo vamos colocar as variaveis que queremos ser chamadas nos tests.
mudamos o node env para test e o database para test fica assim:
DATABASE_URL="./db/test.db"
NODE_ENV="test"
porem o vitest preenche automaticamente a variavel node_env com test então a gente não precisa colocar isso no .env.test
criamos tambem o .env.test.example para que alguem que baixe possa usar o exemplo.
agora na nossa env/index.ts temos a importação do dotenv/config ele sempre carrega o .env porem nos podemos mudar isso. a gente pode importar do dotenv o metodo config
assim
import { config } from 'dotenv'

e vamos fazer o seguinte a gente pode fazer uma condicional de se o node_ENV for igual a test (que é prenchido mesmpo antes de chamar o config se a gente tiver rodando testes)
nos vamos executar o metodo config e passando um path para ele do .env.test
caso não a gente passa a varaivel config sem passar path e ai ele procura por padrão no .env o arquivo completo fica assim:
import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z
    .string()
    .nonempty()
    .refine(
      (value) => {
        if (typeof value === 'string' && isNaN(Number(value))) {
          return true
        }
        return false
      },
      { message: 'DATABASE_URL must be a non-numeric string' },
    ),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('error: invalid environment variables:', _env.error.format())
  throw new Error('invalid environment variables')
}

export const env = _env.data

agora nos temos duas variaveis ambientes uma para cada contexto do programa, test ou desenvolvimento.
e agora ao rodar o testes ele vai criar um banco de dados separado para testes.
porem vai dar erro porque a tabela transaction não vai existir no novo db, ja que ela é criada por migration. para resolver isso vamos no nosso arquivo de testes
vamos dar um beforeEach( )
vamos importar do node:childprocess que é uma forma de a gente conseguir pegar varias funções para executar scripts em paralelo. e de la vamos pegar a função chamada execsync e com ela a gente consegue executar comandos do terminal por dentro da aplicação node. então com isso a gente pode dar um comando la no terminal para rodar. essa função escreve o que a gente vai escrever como comando ent#ão vamos dar o nosso de rodar as migrate. ou seja npm run knex migrate:latest com isso ele vai rodar as nossas migrações. a gente poderia fazer para rodar no beforeAll. porem o cenario ideal de testes é pegar uma aplicação zerada. então é melhor a gente fazer a migration a cada vez para sempre estar com uma tabela zerada para isso a gente pode antes de cada um dostestes executar o rollback para voltar cada migration.  ou seja a cada teste a gente apaga o banco e criade novo. teste end to end é cada vez vai ficando mais lentos por causa disso. então teste end to end ésão poucos e tem que testar bem a aplicação.

a pagina fica assim:
import { afterAll, beforeAll, test, describe, expect, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('transacrion routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('user can create new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  test('list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('set-cookie')

    const listTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactions.body.transactions).toEqual([
      expect.objectContaining({ title: 'new transaction', amount: 5000 }),
    ])
  })
})


é importante saber que caso fique muito lento a gente pode adaptar os testes, mas sempre com muito cuidado para que eles não fiquem defasados e acabem não testando algo importante o que pode ser ainda pior do que não ter o teste, porque vc vai achar que funciona quando na verdade tem um erro escondido.


### importante. nos precisamos usar a versão node 18 entã antes de rodar os testes a gente pode manualmente dar um nvm use com a versão 18 ouentão colocar isso tambem como exec, so que escolhi deixar no manual essa parte porque se no futuro as atualizações funcionarem isso que é uma 'gambiarra' não vai ficar no codigo.

# outros testes
vamos criar os testes que vao agir sobre as demais portas de entrada de nossas aplicação ouj seja as outras rotas.
vamos copiar  teste existente de listagem e colar ele para um teste novo de rota especifica.
porem qgora quando scar ela pelo ilas transaçõe a gente precisa buscar ela pelo id
porem quando a gente cria a transação a nossa rota na aplicação nao retorna nada. nem o id que foi criado então a gente vai ter que dar um jeito de achar isso.
o teste tem que se adaptar ao codigo e néao o codigo se adaptar ao teste (eu acho que nos vamos er que listar todas para buscar o id de uma e depois catar ela pelo id) é isso mesmo. nos vamos fazer a listagem que ja esta sendo feita pelo codigo que copiamos e depois dela vamos dar um const id e vamos pegar o id da primeira posição do array de transactions que vai estar dentro do body que vai estar na listTranscatioResponse assim:
 const transactionId = listTransactionsResponse.body.transactions[0].id
 agora abaixo disso a gente vai fazer uma nova verificação chamada getTransactionResponse que vai ser igual a outra porem passando o id dentro da transaction assim
  const getTransactionsResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

agora a gente espera que o retorno disso seja
parecido com o outro porem como ele retorna direto o objet e não mais um array a gente tira o array e o nome muda para getTransactionResponse e agora é so transaction no singular. fica assim:
  expect(getTransactionsResponse.body.transaction).toEqual(
      expect.objectContaining({ title: 'new transaction', amount: 5000 }),
    )
  })

  vamos agora fazer o teste do summary. copiamos novamente a que lista todos.
  para o resumo é melhor a gente criar duas transações e não so uma, dessa forma ele pode fazer a soma dos amount.
  nos criamos a primeira e dela nos pegamos os cookies e ai a gente cria uma segunda pegando do await ate o fim do objeto e colando isso apos a const de cookie. vamos vcolocar o setCookies depois do post transactions
  e vamos chamar ela de debit modificar o amount e o type fica assim:
   const cookies = createTransactionResponse.get('set-cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'debit transaction',
        amount: 3000,
        type: 'debit',
      })


trocamos a response para summaryResponse. e no de expect a gente vai pegar direto do body o summary pq ele ja retorna direto isso sem passar por transactions. 
e o retorno dele tem que toEqual({amount: 2000}) por que é 5 mil menos os 3 do debit. fica assim:
const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({ amount: 2000 })
# deploy

## preparando o app para deploy
nos vamos configurar o projeto e fazer o processo de deploy ou seja colocar ele em produção
existe uma infinidade de modelos e serviços para fazer deploy da aplicação node e tambem de arquiteturas de deploy, não como é arquitetado o codigo e sim formas de se subir o projeto.
aqui nos vamos usar uma forma mais smplies usando um serviço gerenciasdo que automatiza um pouco as coisas. se a gente usasse um serviço de plataforma algumas coisas que a gente vai fazer na mão eles ja entregam no pacote delesque é pago.
primeiro passo. o codigo esta em typescript e nenhuma plataforma de deploy de node vai entender typescript então o primeiro passo é a gente converter isso para js
a gente pode usar o proprio compilador do tpscrypt então podemos usar o tsc para compilar o codigo.
indo la nas configuraçéoes do ts.config a gente pode descomentar o rootDir: e passar para ele onde esta nosso codigo ./src e tambem descomentar o outDir e colocar onde vai sair o codigo compilado, podemos colocar um endereço como ./build se agora no terminal a gente rodar npx tsc ele vai compilar e converter e criar uma pasta build (vai ter alguns erros que poderiamos ver se a gente fosse usar esse metodo o erro que diz é que nem tudo esta na pasta src pelo visto.)
so que esse processo é lento e com codigo grande fica ainda mais lento e nos temos ferramentas melhores.
vamos instalar a tsup
npm i tsup -D
o tsup é uma ferramenta para fazer o processo de build porem ele usa por baixo dos panos o asbuild que acelera miuito os processos para trabalhar com typscript.
agora que ele esta instalado no arquivo package.json nos vamos criar um script chamado build e esse script vai executar tsup src
 "build": "tsup src"
agora podemos rodar npm run build
é bem rapido e ele cria uma pasta dist com todo o codigo da aplicação. sem dar erros.
se a gente quisesse outro nome na pasta a gente tem que colocar no script tsup src -d nome da pasta.

o codigo que ele gera é bem diferente por conta da conversão então fica mais dificil de entender.
porem a gente deve conseguir apenas rodando o node rodar esse servidor em js então se dermos no terminal o comando 
node dist/server.js ele tem que funcionar. esse é um teste que podemos fazer.
ta rodando
vamos agora fazer mais algiuns ajustes.
o eslint esta dando varios erros. porem não faz sentido o eslint rodar em nosso build então a gente cria um arquivo .eslintignore
e dentro dele a gente escreve dist qi ele vai ignorar a pasta dist
aproveitamos e colocamos tambem a pasta node_modules.
colocamos tambem a pasta dist no gitignore isso é necessario. a gente pode colocar comentarios para classificar a nossa pasta gitignore.
vamos alterar o database e colocar um asterisco apos a determinação da pagina e antes do .db assim ele vai ignorar todos arquivos que erminam com .db nessa pasta fica assim:
jogo da velha database
db/*.db

vamos agora subir esse projeto no github
a gente pode criar o repositorio pela interface do github. no site github;com

como a gente esta sempre jogando nosso codigo no github a gente não precisa.
porem para fazer o deploy nos precisamos desses dois passos
o codigo estar no github (sem a build(dist) que é ignorada)
e a aplicação esta conseguindo gerar a build(dist)

existem muita plataformas onde a gente pode fazer deploy. existem algumas que a gente possa usar de forma gratuita antes de realmente estar em produção e ter usuarios reais.
podemos usar o 
render.com (paniel de administraão otimo)
fly.io (um pouco mais complexo)
railway.app 
nos vamos usar o render
precisamos criar uma conta.
apos criar a conta a vamos cair na dashboard deles
na nossa aplicação a gente usa um banco de dados relacional. sql
com o knex a gente cria o script para os bancos de dados mas se q gente quiser trocar de banco no futuro deve funcionar. e é isso aue a gente vai fazer.
no render vamos criar um banco de dados ele suporta apenas postgreSql a grande maioria suporta apenas o postgres porque ele é realmente opensource o mysql não é tão opensource assim é uma das melhores comunidades de bancos relacionais.
no render dashboard bamos clicar no banco de dados para criar um newPostgreSQL
vamos dar um nome. na região a gente escolhe uma que faça sentido. escolhi frankfurt
por ser gratuito o banco de dados vai expirar em 90 dias.
vamos competar as coisas e pedir para criar o banco. é um processo que demora um pouco.
enquanto isso vamos mudando algumas coisas.
no nosso env/indes.ts temos a databaseurl que esta uma z.string
 DATABASE_URL: z
    .string()
    .nonempty() ...etc

    a gente agora vai antes do database_url informar no env o databaseclient
    que vai ser um z.enum porque ele tem opcçoes fixas.
    DATABASE_CLIENT: z.enum(['sqlite', 'pg']),

    a gente usa pg no lugar de postgres porque é assim que o kenx tem cadastrado. agora que a aplicação pode receber o postgres a gente vai instalar ele
    npm i pg
    não colocamos o -D porque não vai ser de desenvolvimento e sim de produção.
    agora colocamos essa linha em todos os nossos .env
    DATABASE_CLIENT="sqlite"
    e agora no nosso database.ts onde tinha cliente a gente vai trocar por env.databaseClient assim
    export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,

  agora no conection se a gente olhar o knex ele diz que para o pg a gente tem que passar uma string depois de conection e para o sqlite a gente tem que passar um objeto e la dentro uma conection. então vamos fazer uma condicional.
  atualmente esta assim:connection: {
    filename: env.DATABASE_URL,
  },

  nos vamos mudar para isso:
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,

      ou seja se o client for sqlite a gente vai passar um objeto wue dentro tem o filename databaseurl. se não a gente passa direto o databaseurl que é uma string.

      o render por padrão esta usando a versão 14 do node. mas essa versão é bem antiga a gente ta usando a 18 e atualmente ja ta na 20 então varias coisas que a gente fez aqui podem não funcionar na versão 14 então uma coisa que a gente pode fazer é ir no packageJson e onde tem o main title etc ou seja no root do package a gente vai declarar engines e dizer que o node pode ser maior ou igual a 18. fica assim:
      "name": "apirest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "node": ">=18"
  }, resto do package.

  com isso salvo fica faltando ainda uma coisa que devemos fazer antes do deploy
  que é a porta.
 no server a gente ouve a port aassim
  .listen({
    port: env.PORT,

    ou seja ele pega a porta do env que a gente não passou ainda mas esta no schema que o default é 3333 então ele entende isso.
    mas a gente pode agora no env passar uma porta.
    porem o render envia uma porta para a gente. porem ele envia como string e não como numero. e vai dar erro porque no nosso schema do env env/indes.ts a gente esta pendido um numero para a porta dessa forma:
      PORT: z.number().default(3333),
      e vamos receber do render uma string.
      porem o zod tem uma coisa que vai nos permitir mudar isso que é o coerse. fica assim:
      PORT: z.coerce.number().default(3333),
      o coerce ele transforma o valor que a gente recebe na porta e transforma em um numero e e não for um valor valito ele bota 3333 que é o default.
      entéao nos não precisamos colocar nenhuma porta no nosso env porque o render envia isso
      o valor que ele vai enviar vai ser uma string e a gente vai transformar em um numero e ai o nosso programa vai ler.

      com isso feito vamos dar mais um push do nosso codigo no githb.

      agora a gente vai no site do render e olhamos o nosso banco de dados.
      vai ter a internal database url e a external database url.
      se a gente for usar a partir de nossa maquina vamos usar a external mas se for usar utilizando o proprio render por meios internos dele que é o que a gente vai fazer vamos usar o internal. então copiamos a url do internal.
      clicalmos no new no header do site e colocamos criar um novo web service.
      a gente tem que conectar o render ao nosso github para ele ver nossos repositorios.
      a gente conecta com o repositorio em questão. a gente coloca o nome escolhe o local igual ao do banco de dados para que não tenha problemas de latencia. 
      o root é para caso de varios projetos no mesmo repositorio, como não é nosso caso a gente deixa em branco. a brancha a gente esoclhe a branch do github onde esta atualizado o que a gente quer usar.
      runtime é o node mesmo .
      e em comandos para o build a gente tem que colocar o comando para dar o build da nossa aplicação no nosso caso a gente tem que converter para javascript então tem que ser todo o comando ou seja no projeto local a gente joga so o nom run build e funciona. mas la no render não vai porque o tscup não esta instalado. então nos valos primeiro instalar todas dependencias.
      npm install && npm run knex -- migrate:latest && npm run build
      ou seja ele vai instalar e quando terminar vai rodar as migrations e quando terminar ele vai rodar o build
      e agora no start comande a gente vai colocar
      node dist/server.js
      ou seja ele vai construir a partir do js que vai ser feito na pasta dist quando a gente rodar o build..
  escolhemos o plan free
  embaixo tem a opão advanced vamos clicar nela.
  ai aparece a opção de adicionar uma variavel ambiente.
  clicando nisso a gente ve adicionar manualmente duas variaveis.*DATABASE_CLIENT e como valor vai ser pg
  e 
  DATABASE_URL que vai ser a que a gente copia la do banco de dados.
  apos isso ta tudo pronto o resto a gente não precisa fazer.
  o autodeploy esta ligado então cada vez que a gente der um comit no github ele vai dar update n o projeto. agora a gente pode criar
  abre uma nova tela no site com o terminal que a gente pode acompanhar o que esta acontecendo ele vai instalando e depois roda as migrations o build e depois o server começa a rodar.
  ele roda mas deu um erro de porta
  Não estava funcionando e depois de um tempo pesquisando eu descobri que tinha que determinar host: 0000 no server.
  o server fica assim:
  import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })



  como a gente pode testar a gente pega o endereço que ele da do nosso banco de dados vai no inmonia e troca o localhost pelo endereço que ele deu pra a gente. assim a gente tenta fazer as coisas usando ele. e deve fucnionar.
  no imsomnia para não ficar trocando as url a gente pode criar environments
  a gente cria dois um dev e um prod no dev a gente cadastra URL como a localhost e em prod a gente cadastra tambem a url mas coloca a do render
  a gente pode colocar uma cor diferente tambem para não confundir. cadastra abrindo u objeto e dando "url": "localhost etc"
  agora com isso fechado a gente pode entrar no ambiente que a gente quer e usar a url apagando o endereço e dando um cntrl espaço pra pear a url.
  fazemos isso em todas as rotas.




