const Reservation = require("../models/Reservation");

exports.getDashboard = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      /* Filtrer par réservations en cours */
    });
    const user = req.user; // Informations de l'utilisateur connecté, fournies par auth.js

    res.render("dashboard", {
      title: "Tableau de Bord",
      user, // Nom et email de l'utilisateur connecté
      reservations, // Liste des réservations en cours
      currentDate: new Date().toLocaleDateString("fr-FR"), // Date du jour
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
