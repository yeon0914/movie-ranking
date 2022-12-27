const mongoose = require("mongoose"); // mongoose를 선언해주고,

const movieSchema = mongoose.Schema({
  // userSchema라는 이름의 schema를 작성해준다.
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
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
