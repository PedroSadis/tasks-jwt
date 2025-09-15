const { Router } = require('express');
const { register, login, logout } = require('../controllers/userController');

const router = Router();

// As rotas agora recebem os dados dos formulários
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout); // Rota para logout

module.exports = router;