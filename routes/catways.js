const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth"); // Importer le middleware d'authentification
const catwayController = require("../controllers/catwaysController"); // Importer les contrôleurs

// Route pour obtenir tous les catways (protégée)
router.get("/", auth, catwayController.getAllCatways);

// Route pour obtenir un catway spécifique (protégée)
router.get("/:id", auth, catwayController.getCatwayById);

// Route pour créer un catway (protégée)
router.post("/", auth, catwayController.createCatway);

// Route pour mettre à jour un catway (protégée)
router.put("/:id", auth, catwayController.updateCatway);

// Route pour supprimer un catway (protégée)
router.delete("/:id", auth, catwayController.deleteCatway);

module.exports = router;
