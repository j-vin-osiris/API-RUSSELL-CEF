const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// GET /catways/:id/reservations
router.get('/:id/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /catways/:id/reservations
router.post('/:id/reservations', async (req, res) => {
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
