const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
  },
  pc_id: {
    type: String,
    required: true,
  },
  pc_time_in: {
    type: String,
    default: null,
  },
  pc_time_out: {
    type: String,
    default: null,
  },
  pc_amount_due: {
    type: String,
    default: null,
  },
  date_created: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Sessions", sessionSchema);
