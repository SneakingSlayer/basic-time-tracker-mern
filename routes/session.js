const router = require("express").Router();
const Computer = require("../models/Computer");
const Session = require("../models/Session");
const uuid = require("uuid");
const { update } = require("../models/Computer");

//Fetch all computers

router.get("/sessions/:id", async (req, res) => {
  try {
    const sessions = await Session.find({ pc_id: req.params.id });
    if (sessions) {
      res.status(200).json({ data: sessions });
      return;
    }
    res.status(404).json({ msg: "No sessions found." });
    return;
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

module.exports = router;
