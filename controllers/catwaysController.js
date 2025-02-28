const Catway = require("../models/Catway");

// Récupérer tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    console.log("Requête reçue pour récupérer tous les catways"); // Étape 1 : Log au début de la méthode
    const catways = await Catway.find({ catwayNumber: 1 }); // Récupération des catways
    console.log("Catways récupérés depuis la base de données :", catways); // Étape 2 : Log des données récupérées

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
    res.render("catways/editCatway", { catway });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;

  try {
    const newCatway = new Catway({
      catwayNumber,
      catwayType,
      catwayState,
    });

    await newCatway.save();
    res.redirect("/catways");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
  const { catwayState } = req.body;

  try {
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true }
    );
    if (!updatedCatway) {
      return res.status(404).send("Catway introuvable");
    }
    res.redirect("/catways");
  } catch (err) {
    console.error(err.message);
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
