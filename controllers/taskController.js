const Task = require('../models/Task');
const User = require('../models/User');

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user_id: req.user.id });
    res.redirect('/tasks'); // Redireciona para a lista de tarefas
  } catch (error) {
    res.status(500).send({ error: 'Failed to create task' });
  }
};

const list = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      include: User,
      order: [['createdAt', 'DESC']], // Ordena as tarefas mais novas primeiro
    });
    // Renderiza a página de tarefas, passando as tarefas encontradas
    res.render('tasks', { tasks });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
};

// Nova função para atualizar uma tarefa
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });

    if (task) {
      await task.update({ title, description });
      res.redirect('/tasks');
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to update task' });
  }
};

// Nova função para marcar uma tarefa como completa/incompleta
const toggleComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id, user_id: req.user.id } });

        if (task) {
            task.completed = !task.completed; // Inverte o valor atual
            await task.save();
            res.redirect('/tasks');
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to update task status' });
    }
};

// Nova função para deletar uma tarefa
const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });

    if (task) {
      await task.destroy();
      res.redirect('/tasks');
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
};

module.exports = {
  create,
  list,
  update,
  toggleComplete,
  destroy,
};