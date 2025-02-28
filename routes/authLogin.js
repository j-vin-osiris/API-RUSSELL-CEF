const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); // Contrôleur pour la connexion

// Route pour afficher le formulaire de connexion (GET)
router.get("/", (req, res) => {
  res.render("login", { title: "Connexion" });
});

// Route pour gérer la connexion (POST)
router.post("/", loginController.loginUser);

module.exports = router;
