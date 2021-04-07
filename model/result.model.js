const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  roll: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, required: true },
  semester: { type: Number, required: true },
  grade: { type: String },
  failedSubject: { type: String },
});

module.exports = Result = mongoose.model("Result", resultSchema);
