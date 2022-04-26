const mongoose = require("mongoose");

const computerSchema = new mongoose.Schema({
  pc_name: {
    type: String,
    required: true,
  },
  pc_number: {
    type: String,
    required: true,
  },
  pc_status: {
    type: String,
    required: true,
  },
  pc_current_session_id: {
    type: String,
    default: null,
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

module.exports = mongoose.model("Computers", computerSchema);
