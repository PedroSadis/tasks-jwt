const { Router } = require('express');
const { list, create, update, toggleComplete, destroy } = require('../controllers/taskController');
const { protectPage } = require('../middlewares/authMiddleware');

const router = Router();

// Protegemos todas as rotas de tarefas com o middleware 'protectPage'
router.get('/', protectPage, list);
router.post('/', protectPage, create);
router.post('/edit/:id', protectPage, update); // Rota para submeter a edição
router.get('/complete/:id', protectPage, toggleComplete); // Rota para completar tarefa
router.get('/delete/:id', protectPage, destroy); // Rota para deletar tarefa

module.exports = router;