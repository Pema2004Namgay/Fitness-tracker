const bcrypt = require('bcrypt');
const { createUser } = require('../models/user');

const renderLandingPage = (req, res) => {
  const features = [
    { title: 'Track Workouts', description: 'Log your daily exercises easily.' },
    { title: 'Set Goals', description: 'Define and pursue fitness milestones.' },
    { title: 'View Progress', description: 'Visualize achievements over time.' },
  ];
  res.render('index', { features });
};

const renderSignupPage = (req, res) => {
  res.render('signup');
};

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword);
    res.redirect('/');
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send('Error signing up. Please try again.');
  }
};

module.exports = {
  renderLandingPage,
  renderSignupPage,
  handleSignup
};
