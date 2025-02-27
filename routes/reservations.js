const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const auth = require("../middleware/auth");

// GET /catways/:id/reservations
router.get("/:id/reservations", auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.id,
    });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /catways/:id/reservations/:idReservation
router.get("/:id/reservations/:idReservation", auth, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: req.params.id,
    });
    if (!reservation)
      return res.status(404).json({ msg: "Reservation not found" });
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST /catways/:id/reservations
router.post("/:id/reservations", auth, async (req, res) => {
  const { clientName, boatName, startDate, endDate } = req.body;

  try {
    let reservation = new Reservation({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      startDate,
      endDate,
    });
    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PUT /catways/:id/reservations/:idReservation
router.put("/:id/reservations/:idReservation", auth, async (req, res) => {
  const { clientName, boatName, startDate, endDate } = req.body;

  try {
    let reservation = await Reservation.findOneAndUpdate(
      {
        _id: req.params.idReservation,
        catwayNumber: req.params.id,
      },
      { clientName, boatName, startDate, endDate },
      { new: true }
    );
    if (!reservation)
      return res.status(404).json({ msg: "Reservation not found" });
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE /catways/:id/reservations/:idReservation
router.delete("/:id/reservations/:idReservation", auth, async (req, res) => {
  try {
    let reservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: req.params.id,
    });
    if (!reservation)
      return res.status(404).json({ msg: "Reservation not found" });
    res.json({ msg: "Reservation deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
