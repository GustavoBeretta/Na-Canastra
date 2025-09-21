# Na-Canastra

Este é um projeto de e-commerce para a venda de queijos e outros produtos da região da Canastra.

## Tecnologias Utilizadas

- **Frontend:**

  - [Next.js](https://nextjs.org/) - Framework React para renderização do lado do servidor.
  - [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces de usuário.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilização.

- **Backend:**

  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Para criação de endpoints da API.
  - [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL.
  - [Mongoose](https://mongoosejs.com/) - Modelagem de dados para o MongoDB.
  - [NextAuth.js](https://next-auth.js.org/) - Para autenticação de usuários.
  - [Firebase](https://firebase.google.com/) - Utilizado para armazenamento de imagens dos produtos.

- **Outras dependências:**
  - [bcrypt](https://www.npmjs.com/package/bcrypt) - Para hashing de senhas.
  - [react-icons](https://react-icons.github.io/react-icons/) - Para utilização de ícones.

## Como rodar o projeto localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/GustavoBeretta/Na-Canastra.git
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:

   ```
   MONGODB_URI=<sua_uri_de_conexao_do_mongodb>
   NEXTAUTH_SECRET=<seu_secret_para_o_nextauth>
   NEXTAUTH_URL=<sua_url_de_desenvolvimento>

   FIREBASE_API_KEY=<sua_api_key>
   FIREBASE_AUTH_DOMAIN=<seu_auth_domain>
   FIREBASE_PROJECT_ID=<seu_project_id>
   FIREBASE_STORAGE_BUCKET=<seu_storage_bucket>
   FIREBASE_MESSAGING_SENDER_ID=<seu_messaging_sender_id>
   FIREBASE_APP_ID=<seu_app_id>
   ```

4. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.
