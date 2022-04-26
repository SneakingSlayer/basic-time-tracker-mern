const router = require("express").Router();
const Computer = require("../models/Computer");
const Session = require("../models/Session");
const uuid = require("uuid");
const { update } = require("../models/Computer");

//Fetch all computers

router.get("/computers", async (req, res) => {
  try {
    const computers = await Computer.find();
    res.status(200).json({ data: computers });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

//Get one computer
router.get("/computers/:id", async (req, res) => {
  try {
    const findComputer = await Computer.find({ _id: req.params.id });
    if (findComputer) {
      res.status(200).send({ data: findComputer });
      return;
    }
    res.status(404).send({ msg: "Computer not found." });
  } catch (e) {
    res.status(400).json({ msg: e });
    return;
  }
});

//Add Computer
router.post("/computers", async (req, res) => {
  const computer = new Computer({
    pc_name: req.body.name,
    pc_number: req.body.number,
    pc_status: "Offline",
    pc_current_session_id: "empty",
    date_created: new Date(),
  });
  try {
    const saveComputer = await computer.save();
    res.status(200).json({ msg: "Computer added successfully." });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

//Computer Time-In
router.put("/computers/login", async (req, res) => {
  const computer = {
    pc_id: req.body.pc_id,
    pc_session_id: req.body.pc_session_id,
    pc_time_in: req.body.pc_current_session_id,
    pc_time_out: req.body.pc_time_out,
    pc_amount_due: req.body.pc_amount_due,
  };

  try {
    const findComputer = await Computer.findOne({ _id: computer.pc_id });
    if (findComputer) {
      if (findComputer.pc_status === "Active") {
        res.status(200).json({ msg: "PC is currently in an active session." });
        return;
      }
      const query = {
        _id: computer.pc_id,
      };
      const sessionId = uuid.v4();
      const timeIn = new Date();
      const updateOne = await Computer.updateOne(query, {
        $set: {
          pc_status: "Active",
          pc_current_session_id: sessionId,
          pc_amount_due: null,
          pc_time_in: timeIn,
          pc_time_out: null,
        },
      });
      const newSession = new Session({
        pc_id: computer.pc_id,
        session_id: sessionId,
        pc_amount_due: null,
        pc_time_out: null,
        pc_time_in: timeIn,
        date_created: timeIn,
      });
      const saveNewSession = await newSession.save();
      console.log(updateOne);
      res.status(200).json({ msg: "Session successfully created." });
      return;
    }
    res.status(404).json({ msg: "PC not found." });
    return;
  } catch (e) {
    res.status(400).json({ msg: e });
    return;
  }
});

//Computer Time-Out
router.put("/computers/logout", async (req, res) => {
  const computer = {
    pc_id: req.body.pc_id,
    pc_session_id: req.body.pc_session_id,
    pc_time_in: req.body.pc_current_session_id,
    pc_time_out: req.body.pc_time_out,
    pc_amount_due: req.body.pc_amount_due,
  };

  try {
    const findComputer = await Computer.findOne({ _id: computer.pc_id });
    if (findComputer) {
      if (findComputer.pc_status === "Offline") {
        res.status(200).json({ msg: "PC is currently offline." });
        return;
      }
      const query = {
        _id: computer.pc_id,
      };
      const sessionQuery = {
        session_id: findComputer.pc_current_session_id,
      };
      const amountDue = parseFloat(
        (Math.abs(new Date() - new Date(findComputer.pc_time_in)) /
          1000 /
          60 /
          60) *
          20
      )
        .toFixed(2)
        .toString();

      const timeOut = new Date();

      const updateOne = await Computer.updateOne(query, {
        $set: {
          pc_status: "Offline",
          pc_amount_due: amountDue,
          pc_time_out: timeOut,
        },
      });
      const updateSession = await Session.updateOne(sessionQuery, {
        $set: {
          pc_time_out: timeOut,
          pc_amount_due: amountDue,
        },
      });
      res.status(200).json({ msg: "Session successfully created." });
      return;
    }
    res.status(404).json({ msg: "PC not found." });
    return;
  } catch (e) {
    res.status(400).json({ msg: e });
    return;
  }
});

//Delete Computer
router.delete("/computers", async (req, res) => {
  const findComputer = await Computer.findOne({ _id: req.body.pc_id });
  try {
    if (findComputer) {
      const deleteSessions = await Session.deleteMany({
        pc_id: req.body.pc_id,
      });
      const deleteComputer = await Computer.deleteOne({
        _id: req.body.pc_id,
      });

      res.status(200).json({ msg: "Successfully deleted pc." });
      return;
    }
    res.status(404).json({ msg: "PC not found." });
    return;
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

module.exports = router;
