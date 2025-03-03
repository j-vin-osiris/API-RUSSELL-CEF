const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Route pour afficher tous les utilisateurs
router.get("/", usersController.getAllUsers);

// Route pour créer un nouvel utilisateur
router.post("/", usersController.createUser);

// Route pour afficher le formulaire d'édition d'un utilisateur
router.get("/:id/edit", usersController.getEditUserPage);

// Route pour mettre à jour un utilisateur
router.put("/:id", usersController.updateUser);

// Route pour supprimer un utilisateur
router.delete("/:id", usersController.deleteUser);

module.exports = router;
