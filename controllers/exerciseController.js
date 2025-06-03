const Exercise = require('../models/exercise');

module.exports = {
  async list(req, res) {
    const userId = req.session.userId;
    const exercises = await Exercise.getAll(userId);
    res.render('exercise/list', { exercises });
  },

  newForm(req, res) {
    res.render('exercise/new');
  },

  async create(req, res) {
    const { title, duration, date } = req.body;
    await Exercise.create({ user_id: req.session.userId, title, duration, date });
    res.redirect('/exercise');
  },

  async editForm(req, res) {
    const exercise = await Exercise.getById(req.params.id);
    res.render('exercise/edit', { exercise });
  },

  async update(req, res) {
    const { title, duration, date } = req.body;
    await Exercise.update(req.params.id, { title, duration, date });
    res.redirect('/exercise');
  },

  async delete(req, res) {
    await Exercise.remove(req.params.id);
    res.redirect('/exercise');
  }
};
