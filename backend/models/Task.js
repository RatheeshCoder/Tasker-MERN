const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { type: String },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
