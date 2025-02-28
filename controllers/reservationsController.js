const Reservation = require("../models/Reservation");

// Récupérer toutes les réservations pour un catway
exports.getReservationsByCatway = async (req, res) => {
  try {
    const catwayNumber = req.params.id;
    const reservations = await Reservation.find({ catwayNumber });
    res.render("reservations", { catwayNumber, reservations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  const { clientName, boatName, startDate, endDate } = req.body;
  const catwayNumber = req.params.id;

  try {
    const newReservation = new Reservation({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate,
    });

    await newReservation.save();
    res.redirect(`/catways/${catwayNumber}/reservations`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Modifier une réservation
exports.updateReservation = async (req, res) => {
  const { clientName, boatName, startDate, endDate } = req.body;

  try {
    const updatedReservation = await Reservation.findOneAndUpdate(
      { _id: req.params.idReservation },
      { clientName, boatName, startDate, endDate },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).send("Réservation introuvable");
    }

    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
    });

    if (!deletedReservation) {
      return res.status(404).send("Réservation introuvable");
    }

    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
