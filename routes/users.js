const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/usersController");

// Routes protégées
router.get("/", auth, userController.getAllUsers);
router.get("/:email", auth, userController.getUserByEmail);
router.post("/", auth, userController.createUser);
router.put("/:email", auth, userController.updateUser);
router.delete("/:email", auth, userController.deleteUser);

module.exports = router;
