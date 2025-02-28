const Catway = require("../models/Catway");

// Récupérer tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("catways/catways", { catways });
  } catch (err) {
    console.error(err.message);
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
