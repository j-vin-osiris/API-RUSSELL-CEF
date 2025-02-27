const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");
const auth = require("../middlewares/auth");

// GET /catways
router.get("/", auth, async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /catways/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ msg: "Catway not found" });
    res.json(catway);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST /catways
router.post("/", auth, async (req, res) => {
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

// PUT /catways/:id
router.put("/:id", auth, async (req, res) => {
  const { catwayState } = req.body;

  try {
    let catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true }
    );
    if (!catway) return res.status(404).json({ msg: "Catway not found" });
    res.json(catway);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE /catways/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    let catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ msg: "Catway not found" });
    res.json({ msg: "Catway deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
