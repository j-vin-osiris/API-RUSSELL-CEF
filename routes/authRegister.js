const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

// Route pour afficher le formulaire d'inscription (GET)
router.get("/", (req, res) => {
  res.render("register", { title: "Inscription" });
});

// Route pour gérer les données d'inscription (POST)
router.post("/", registerController.registerUser);

module.exports = router;
