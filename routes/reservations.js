const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

// Route pour afficher toutes les réservations
router.get("/", reservationsController.getAllReservations);

// Route pour afficher le formulaire d'ajout
router.get("/add", reservationsController.getAddReservationPage);

// Route pour créer une nouvelle réservation
router.post("/", reservationsController.createReservation);

// Route pour afficher le formulaire d'édition d'une réservation
router.get("/:id/edit", reservationsController.getEditReservationPage);

// Route pour mettre à jour une réservation
router.put("/:id", reservationsController.updateReservation);

// Route pour supprimer une réservation
router.delete("/:id", reservationsController.deleteReservation);

module.exports = router;
