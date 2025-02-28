const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const reservationController = require("../controllers/reservationsController");

// Routes protégées
router.get(
  "/:catwayId/reservations",
  auth,
  reservationController.getReservationsByCatway
);

router.post(
  "/:catwayId/reservations",
  auth,
  reservationController.createReservation
);
router.put(
  "/:catwayId/reservations/:idReservation",
  auth,
  reservationController.updateReservation
);
router.delete(
  "/:catwayId/reservations/:idReservation",
  auth,
  reservationController.deleteReservation
);

module.exports = router;
