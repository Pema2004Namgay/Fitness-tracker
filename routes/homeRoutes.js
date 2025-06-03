// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Landing Page
router.get('/', homeController.renderLandingPage);

module.exports = router;
