const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définir le schéma pour les réservations
const reservationSchema = new Schema({
  catwayNumber: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  boatName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

// Créer le modèle pour les réservations
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
