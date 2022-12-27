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
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
