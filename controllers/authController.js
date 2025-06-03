const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/user');

// ✅ Render Signup Page
const renderSignupPage = (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  res.render('signup', { message });
};

// ✅ Handle Signup Logic
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      req.session.message = { type: 'error', text: 'Email already registered.' };
      return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword);

    req.session.message = { type: 'success', text: 'Registration successful! Please log in.' };
    res.redirect('/login');
  } catch (err) {
    console.error('❌ Signup error:', err);
    req.session.message = { type: 'error', text: 'Registration failed. Please try again.' };
    res.redirect('/signup');
  }
};

// ✅ Render Login Page
const renderLoginPage = (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  res.render('login', { message });
};

// ✅ Handle Login Logic
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      req.session.message = { type: 'error', text: 'Invalid email or password.' };
      return res.redirect('/login');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.session.message = { type: 'error', text: 'Invalid email or password.' };
      return res.redirect('/login');
    }

    // ✅ Set session values
    req.session.userId = user.id;
    req.session.userName = user.name;

    // 🔄 Redirect to exercise page after login
    res.redirect('/exercise');

  } catch (err) {
    console.error('❌ Login error:', err);
    req.session.message = { type: 'error', text: 'Login failed. Please try again.' };
    res.redirect('/login');
  }
};

// ✅ Logout
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/exercise');
    }
    res.redirect('/login');
  });
};

module.exports = {
  renderSignupPage,
  signup,
  renderLoginPage,
  login,
  logout
};
