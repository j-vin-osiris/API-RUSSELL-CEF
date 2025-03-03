const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwaysController");

// Liste de tous les catways
router.get("/", catwayController.getAllCatways);

// Créer un nouveau catway
router.get("/add", (req, res) => {
  res.render("catways/addCatway"); // Page pour le formulaire d'ajout
});
router.post("/", catwayController.createCatway);

// Détails d'un catway spécifique
router.get("/:id", catwayController.getCatwayById);

// Route pour afficher le formulaire d'édition d'un catway
router.get("/:id/edit", catwayController.getEditCatwayPage);

// Modifier un catway
router.get("/:id/edit", (req, res) => {
  res.render("catways/editCatway"); // Page pour le formulaire d'édition
});
router.put("/:id", catwayController.updateCatway);

// Supprimer un catway
router.delete("/:id", catwayController.deleteCatway);

module.exports = router;
