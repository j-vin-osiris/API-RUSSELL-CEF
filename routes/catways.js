const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwaysController");
const auth = require("../middlewares/auth"); // Middleware d'authentification

// Routes pour les opérations CRUD sur les catways
router.get("/", auth, catwayController.getAllCatways); // Lister tous les catways
router.get("/:id", auth, catwayController.getCatwayById); // Récupérer un catway par ID
router.post("/", auth, catwayController.createCatway); // Créer un nouveau catway
router.put("/:id", auth, catwayController.updateCatway); // Modifier l'état d'un catway
router.delete("/:id", auth, catwayController.deleteCatway); // Supprimer un catway

module.exports = router;
