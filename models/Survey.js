const mongoose = require("mongoose");

// Create Schema
const SurveySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  coordinator: {
    type: String
  },
  student: {
    type: String
  },
  hostfamily: {
    type: String
  },
  englishname: {
    type: String
  },
  question1: {
    type: String
  },
  question2: {
    type: String
  },
  question3: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Survey = mongoose.model("survey", SurveySchema);
