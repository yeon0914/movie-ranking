const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  id: {
    type: String,
  },
  passwd: {
    type: String,
  },
  genre: { type: String },
  name: { type: String },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = { Member };
