const express = require('express');
const router = express.Router();
const controller = require('../controllers/exerciseController');

// ✅ Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) return next();
  res.redirect('/login');
};

// ✅ Routes

// List all exercises
router.get('/', isAuthenticated, controller.list);

// Show form to create new exercise
router.get('/new', isAuthenticated, controller.newForm);
router.post('/new', isAuthenticated, controller.create);

// ✅ Show form to edit exercise
router.get('/edit/:id', isAuthenticated, controller.editForm);

// ✅ Handle edit submission
router.post('/edit/:id', isAuthenticated, controller.update);

// ✅ Handle delete
router.post('/delete/:id', isAuthenticated, controller.delete);

module.exports = router;
