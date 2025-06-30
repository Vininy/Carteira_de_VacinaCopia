# Carteira de Vacinação - Sistema Completo 🚑💉

Este repositório contém o back-end e o front-end para o sistema Carteira de Vacinação, que gerencia o histórico de vacinação dos usuários, permitindo que registrem e consultem suas vacinas.

## 1. Visão Geral 📝

A aplicação é composta por três partes principais:

- **Back-End**: API construída com Express.js e Sequelize para interagir com o banco de dados.
- **Front-End**: Interface de usuário construída com Vue.js (ou outro framework configurado no projeto).
- **Banco de Dados**: Utiliza PostgreSQL para armazenar as informações dos usuários e vacinas.

## 2. Instruções para Execução Local 🖥️

### Pré-Requisitos 📦

Antes de executar o projeto, tenha as seguintes ferramentas instaladas:

- **Node.js** (versão 14 ou superior) 🔧
- **PostgreSQL** (ou qualquer outro banco de dados relacional configurado com Sequelize) 🗄️
- **Git** (para clonar o repositório) 🧑‍💻

### 1. Clonando o Repositório 📂

Se você ainda não tiver o repositório localmente, use o comando abaixo:

```bash
git clone https://github.com/thallyson1997/Carteira_de_Vacina.git
cd Carteira_de_Vacina
2. Configuração do Banco de Dados 🗄️
Banco de Dados PostgreSQL:

Crie um banco de dados no PostgreSQL (ou em outro banco relacional, se configurado adequadamente).

Exemplo: Carteira_vacinacao.

Arquivo .env:
Na raiz do projeto back-end, crie um arquivo .env com as configurações de banco de dados. Exemplo:

env
Copiar
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Carteira_vacinacao
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
JWT_SECRET=seu_token_jwt_super_secreto
3. Configuração do Back-End 🚀
Instalar Dependências:
Navegue até a pasta back-end e instale as dependências necessárias:

bash
Copiar
cd backend
npm install
Rodar o Back-End:
Execute o seguinte comando para iniciar o servidor back-end:

bash
Copiar
npm run dev
Isso irá iniciar o servidor na porta 3000 (ou na porta configurada no arquivo .env).

4. Configuração do Front-End 🌐
Instalar Dependências:
Navegue até a pasta front-end e instale as dependências do front-end:

bash
Copiar
cd ../frontend
npm install
Rodar o Front-End:
Execute o comando para iniciar a aplicação front-end:

bash
Copiar
npm run dev
O front-end estará acessível em http://localhost:5173 (ou na porta configurada).

5. Testando a Integração 🔗
Verifique que ambos os servidores (front-end e back-end) estão rodando.

Interaja com a aplicação acessando o front-end em http://localhost:5173 e verificando as funcionalidades de registro e consulta de vacinas, que fazem requisições para a API do back-end.

3. Estrutura de Pastas 📂
backend/: Contém o servidor da API com Express, Sequelize e autenticação via JWT.

controllers/: Controladores dos endpoints (como login, registro de vacinas, etc.).

models/: Modelos do banco de dados (User, Vaccine, UserVaccine).

routes/: Rotas da API.

middleware/: Middleware para autenticação (verificação de token JWT).

config/: Configuração do banco de dados e variáveis de ambiente.

frontend/: Contém a interface de usuário utilizando Vue.js (ou outro framework).

src/: Código fonte da aplicação.

assets/: Arquivos estáticos, como imagens.

components/: Componentes Vue.js para a interface.

4. Banco de Dados 🗄️
A aplicação utiliza o Sequelize para interagir com o banco de dados PostgreSQL.

Tabelas principais:
User: Armazena dados do usuário, como nome, e-mail, CPF, etc.

Vaccine: Armazena dados das vacinas.

UserVaccine: Tabela de junção entre usuários e vacinas, incluindo status de aplicação.

5. Documentação da API 📜
Para uma explicação mais detalhada sobre os endpoints da API, consulte o PDF da Documentação dos Endpoints da API.

6. Link do Dashboard da Trilha de Dados 📊
Para acessar o dashboard da Trilha de Dados, clique no link abaixo:

Dashboard da Trilha de Dados

7. Documentação de UX 📄
Para acessar a documentação de UX (Desafio 5), consulte o arquivo Desafio 5.pdf.

8. Conclusão 🎯
Agora você tem um sistema completo com front-end, back-end e banco de dados configurados e prontos para uso local! 🌟

Se tiver dúvidas ou problemas durante a execução, estamos disponíveis para tirar suas dúvidas! 😊
