const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth"); // Middleware d'authentification

// Route pour le tableau de bord
router.get("/", auth, (req, res) => {
  res.render("dashboard", {
    title: "Tableau de Bord",
    user: req.user, // Les infos de l'utilisateur connecté depuis le middleware
  });
});

module.exports = router;
