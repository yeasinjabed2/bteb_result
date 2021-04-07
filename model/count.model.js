const mongoose = require("mongoose");

const countSchema = mongoose.Schema({
  count: { type: String },
  totalSearch: { type: Number },
});

module.exports = Count = mongoose.model("SearchCount", countSchema);
