const { Router } = require('express');
const { protectPage } = require('../middlewares/authMiddleware');
const Task = require('../models/Task');

const router = Router();

// Rota principal - redireciona para as tarefas se logado, ou para o login se não
router.get('/', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        return res.redirect('/tasks');
    }
    res.redirect('/login');
});

// Página de Login
router.get('/login', (req, res) => {
    res.render('login', { error: req.query.error, success: req.query.success });
});

// Página de Registro
router.get('/register', (req, res) => {
    res.render('register', { error: req.query.error });
});

// Página para o formulário de nova tarefa
router.get('/tasks/new', protectPage, (req, res) => {
    res.render('task-form', { task: null }); // Passa task como null para indicar criação
});

// Página para o formulário de edição de tarefa
router.get('/tasks/edit/:id', protectPage, async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (task) {
            res.render('task-form', { task }); // Passa a tarefa para preencher o formulário
        } else {
            res.redirect('/tasks');
        }
    } catch (error) {
        res.redirect('/tasks');
    }
});


// As rotas de tarefas em si (list, create, etc.) estão em taskRoutes.js
// A rota principal '/tasks' é gerenciada por taskRoutes.js
router.use('/tasks', require('./taskRoutes'));

// As rotas de usuário (login, register, etc.) estão em userRoutes.js
router.use('/user', require('./userRoutes'));


module.exports = router;