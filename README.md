# Documentação para rodar o projeto

1. **Copie o arquivo de exemplo de variáveis de ambiente:**
  Renomeie o arquivo `.env.example` para `.env` na raiz do projeto. Isso garante que as variáveis de ambiente necessárias estejam configuradas corretamente.

  ```bash
  cp .env.example .env
  ```

2. **Instale as dependências do projeto:**
  Execute o comando abaixo para instalar todas as dependências listadas no `package.json`.

  ```bash
  npm install
  ```

3. **Inicie o projeto:**
  Após configurar o `.env` e instalar as dependências, execute o comando abaixo para iniciar a aplicação.

  ```bash
  npm start
  ```

Pronto! O projeto estará rodando conforme as configurações definidas no arquivo `.env`.