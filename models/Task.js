const db = require('../db');
const User = require('./User');

const Task = db.define('task', {
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.TEXT,
    allowNull: true,
  },
  completed: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Task;
