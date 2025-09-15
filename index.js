require('dotenv').config();

const express = require('express');
const db = require('./db');
const cookieParser = require('cookie-parser'); // Importe o cookie-parser
const path = require('path'); // Módulo para lidar com caminhos de arquivos

const app = express();
const port = process.env.PORT || 3000;

// Configurar o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define o diretório das views

// Sincronizar banco de dados
db.sync();

// Middlewares
app.use(cookieParser()); // Use o cookie-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para ler dados de formulários HTML
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

// Rotas da API (continuam existindo)
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));

// Novas Rotas para as Views (vamos criar este arquivo a seguir)
app.use('/', require('./routes/viewRoutes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});