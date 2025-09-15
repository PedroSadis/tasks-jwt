const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require('../middlewares/authMiddleware');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // Redireciona de volta para o login com uma mensagem de erro
      return res.redirect('/login?error=User not found');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      // Redireciona de volta para o login com uma mensagem de erro
      return res.redirect('/login?error=Invalid password');
    }

    const token = generateToken(user);

    // Salva o token em um cookie
    res.cookie('token', token, {
      httpOnly: true, // O cookie não pode ser acessado por JavaScript no cliente
      secure: process.env.NODE_ENV === 'production', // Use https em produção
      maxAge: 3600000 // 1 hora
    });

    // Redireciona para a página de tarefas
    res.redirect('/tasks');

  } catch (error) {
    res.redirect(`/login?error=${error.message}`);
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.redirect('/register?error=Username already exists');
    }
    
    const newPassword = bcrypt.hashSync(password, 10);

    await User.create({
      name,
      username,
      password: newPassword
    });

    // Redireciona para a página de login após o registro bem-sucedido
    res.redirect('/login?success=true');

  } catch (error) {
    res.redirect(`/register?error=${error.message}`);
  }
};

// Nova função de Logout
const logout = (req, res) => {
  res.clearCookie('token'); // Limpa o cookie do token
  res.redirect('/login');   // Redireciona para a página de login
};

module.exports = {
  login,
  register,
  logout, // Exporte a nova função
};