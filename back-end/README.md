# 🚀 Backend - Sistema de Barbearia

API REST para gerenciamento de barbearia com autenticação JWT.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório e navegue até a pasta do backend:**
   ```bash
   cd back-end
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto
   - Copie as configurações do exemplo abaixo:

   ```env
   # Configurações do Servidor
   PORT=3000
   NODE_ENV=development

   # Configurações do Banco de Dados PostgreSQL
   DIALECT=postgres
   HOST_DB=localhost
   PORT_DB=5432
   USERNAME_DB=postgres
   PASSWORD_DB=sua_senha
   DATABASE_DB=barbearia_db

   # Configurações JWT
   TOKEN=seu_token_super_secreto_aqui

   # Configurações CORS
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Configure o banco de dados:**
   - Crie um banco PostgreSQL chamado `barbearia_db`
   - As tabelas serão criadas automaticamente na primeira execução

## 🚀 Executando o projeto

### Desenvolvimento (com nodemon):
```bash
npm run dev
```

### Produção:
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 📚 Endpoints da API

### 🔓 Rotas Públicas (sem autenticação)
- `POST /api/login` - Login de usuário

### 🔒 Rotas Privadas (requer token JWT)
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/barbeiros` - Listar barbeiros
- `POST /api/barbeiros` - Criar barbeiro
- `GET /api/agendamentos` - Listar agendamentos
- `POST /api/agendamentos` - Criar agendamento
- E muito mais...

## 🔐 Autenticação

Para acessar rotas privadas, inclua o token JWT no header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

## 🗂️ Estrutura do Projeto

```
src/
├── Config/          # Configurações (banco, helpers)
├── Controller/      # Lógica de negócio
├── Database/        # Inicialização do banco
├── Middleware/      # Middlewares (autenticação)
├── Model/          # Modelos do Sequelize
├── Routes/         # Definição das rotas
└── Services/       # Serviços auxiliares
```

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em desenvolvimento (com nodemon)
- `npm test` - Executa os testes (ainda não implementado)

## 📝 Logs

O servidor exibe logs informativos no console:
- ✅ Conexão com banco estabelecida
- ✅ Modelos sincronizados
- 🚀 Servidor rodando
- 📱 Endpoints disponíveis

## 🐛 Troubleshooting

### Erro de conexão com banco:
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Certifique-se que o banco `barbearia_db` existe

### Erro de porta em uso:
- Mude a porta no arquivo `.env`
- Ou mate o processo que está usando a porta 3000