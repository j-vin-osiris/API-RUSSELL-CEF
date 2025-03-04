const Reservation = require("../models/Reservation");

// Afficher le formulaire pour créer une nouvelle réservation
exports.getAddReservationPage = (req, res) => {
  res.render("reservations/addReservation"); // Rendre la vue addReservation.ejs pour le formulaire
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.body.catwayNumber);
    const { clientName, boatName, startDate, endDate } = req.body;

    // Convertir les dates en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Vérifier si une réservation existe déjà pour ce catway durant la période donnée
    const conflictingReservation = await Reservation.findOne({
      catwayNumber: catwayNumber,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (conflictingReservation) {
      return res.render("reservations/addReservation", {
        error:
          "Une réservation existe déjà pour ce catway pendant cette période. Veuillez choisir une autre période ou un autre catway.",
        catwayNumber: catwayNumber,
        clientName: clientName,
        boatName: boatName,
        startDate: startDate,
        endDate: endDate,
      });
    }

    // Si aucune réservation ne se chevauche, créer une nouvelle réservation
    const newReservation = new Reservation({
      catwayNumber,
      clientName,
      boatName,
      startDate: start,
      endDate: end,
    });
    await newReservation.save();
    res.redirect("/reservations");
  } catch (err) {
    console.error(
      "Erreur lors de la création d'une réservation :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer toutes les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("reservations/reservations", {
      title: "Gestion des Réservations",
      reservations,
    });
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des réservations :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer une réservation spécifique pour la page d'édition
exports.getEditReservationPage = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send("Réservation introuvable");
    }
    res.render("reservations/editReservation", { reservation }); // Rendre la vue editReservation.ejs avec les données de la réservation
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de la réservation :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.body.catwayNumber);
    const { clientName, boatName, startDate, endDate } = req.body;
    const reservationId = req.params.id;

    // Convertir les dates en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Vérifier si une réservation existe déjà pour ce catway durant la période donnée, excluant la réservation actuelle
    const conflictingReservation = await Reservation.findOne({
      _id: { $ne: reservationId },
      catwayNumber: catwayNumber,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (conflictingReservation) {
      const reservation = await Reservation.findById(reservationId);
      return res.render("reservations/editReservation", {
        error:
          "Une réservation existe déjà pour ce catway pendant cette période. Veuillez choisir une autre période ou un autre catway.",
        reservation: reservation,
      });
    }

    // Mettre à jour la réservation
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { catwayNumber, clientName, boatName, startDate: start, endDate: end },
      { new: true, runValidators: true }
    );
    if (!updatedReservation)
      return res.status(404).send("Réservation introuvable");

    res.redirect("/reservations");
  } catch (err) {
    console.error(
      "Erreur lors de la mise à jour de la réservation :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).send("Réservation introuvable");
    }
    res.redirect("/reservations");
  } catch (err) {
    console.error(
      "Erreur lors de la suppression de la réservation :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};
