const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name
  };
  return jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Middleware para proteger rotas de API
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Novo middleware para proteger as páginas renderizadas
const protectPage = (req, res, next) => {
  const token = req.cookies.token; // Pega o token do cookie

  if (!token) {
    return res.redirect('/login'); // Se não houver token, redireciona para o login
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect('/login'); // Se o token for inválido, redireciona para o login
    }
    req.user = decoded; // Salva os dados do usuário na requisição
    res.locals.user = decoded; // Disponibiliza os dados do usuário para as views EJS
    next();
  });
};


module.exports = {
  generateToken,
  authMiddleware,
  protectPage, // Exporte o novo middleware
};