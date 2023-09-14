const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: Date,
  thumbsUp: Number,
  thumbsDown: Number,
});

module.exports = mongoose.model('Recipe', recipeSchema);
