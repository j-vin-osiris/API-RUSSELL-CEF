const Catway = require("../models/Catway");

// Récupérer tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find(); // Récupération des catways

    res.render("catways", { title: "Gestion des Catways", catways }); // Rendu de la vue avec les données
  } catch (err) {
    console.error("Erreur lors de la récupération des catways :", err.message); // Étape 3 : Log de l'erreur, si elle survient
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer un catway spécifique
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send("Catway introuvable");
    }
    res.render("catway", { catway });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

//Afficher le formulaire pour créer un nouveau catway
exports.getAddCatwayPage = (req, res) => {
  res.render("addCatway"); // Rendre la vue addCatway.ejs pour le formulaire
};

exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    // Vérifier si un catway avec ce numéro existe déjà
    const existingCatway = await Catway.findOne({ catwayNumber });
    if (existingCatway) {
      return res.render("addCatway", {
        error:
          "Le numéro du catway existe déjà. Veuillez saisir un autre numéro.",
        catwayNumber: catwayNumber,
        catwayType: catwayType,
        catwayState: catwayState,
      });
    }

    // Si aucun catway avec ce numéro n'existe, créer un nouveau catway
    const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
    await newCatway.save();
    res.redirect("/catways");
  } catch (err) {
    console.error("Erreur lors de la création d'un catway :", err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer un catway spécifique pour la page d'édition
exports.getEditCatwayPage = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send("Catway introuvable");
    }
    res.render("editCatway", { catway }); // Rendre la vue editCatway.ejs avec les données du catway
  } catch (err) {
    console.error("Erreur lors de la récupération du catway :", err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
  try {
    const { catwayState } = req.body;
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true }
    );
    if (!updatedCatway) return res.status(404).send("Catway introuvable");
    res.redirect("/catways");
  } catch (err) {
    console.error("Erreur lors de la mise à jour du catway :", err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: req.params.id,
    });
    if (!catway) {
      return res.status(404).send("Catway introuvable");
    }
    res.redirect("/catways");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
