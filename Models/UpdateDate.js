const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  update: {
    type: String,
  },
});

const UpdateDate = mongoose.model("UpdateDate", dateSchema);

module.exports = { UpdateDate };
