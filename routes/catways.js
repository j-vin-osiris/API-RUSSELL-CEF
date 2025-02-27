const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

// GET /catways
router.get("/", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST /catways
router.post("/", async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;

  try {
    let catway = new Catway({ catwayNumber, catwayType, catwayState });
    await catway.save();
    res.json(catway);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
