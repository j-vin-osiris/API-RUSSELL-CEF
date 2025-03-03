const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwaysController");

// Liste de tous les catways
router.get("/", catwayController.getAllCatways);

// Créer un nouveau catway
router.get("/add", (req, res) => {
  res.render("addCatway"); // Page pour le formulaire d'ajout
});
router.post("/", catwayController.createCatway);

// Détails d'un catway spécifique
router.get("/:id", catwayController.getCatwayById);

// Modifier un catway
router.get("/:id/edit", (req, res) => {
  res.render("editCatway"); // Page pour le formulaire d'édition
});
router.put("/:id", catwayController.updateCatway);

// Supprimer un catway
router.delete("/:id", catwayController.deleteCatway);

module.exports = router;
