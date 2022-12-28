const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 50,
  },
  rank: {
    type: Number,
  },
  link: { type: String, maxLength: 200 },
  score: { type: String, maxLength: 50 },
  category: { type: String, maxLength: 200 },
  poster: { type: String, maxLength: 200 },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
