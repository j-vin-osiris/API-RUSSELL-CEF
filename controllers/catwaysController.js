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

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body; // Récupérer les données du formulaire
    const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
    await newCatway.save();
    res.redirect("/catways"); // Rediriger vers la liste des catways après la création
  } catch (err) {
    console.error("Erreur lors de la création d'un catway :", err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
  try {
    const { catwayState } = req.body; // Récupère les données du formulaire
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true }
    );
    if (!updatedCatway) return res.status(404).send("Catway introuvable");
    res.redirect("/catways"); // Redirige vers la liste des catways après la mise à jour
  } catch (err) {
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
