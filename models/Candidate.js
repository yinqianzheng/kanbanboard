const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNum: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  comments: [{
    commenter: String,
    text: String
  }],
  rating: [{
    provider: String,
    value: Number
  }],
  process: {
    type: String,
    default: "applied"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Candidate = mongoose.model("Candidate", CandidateSchema);
