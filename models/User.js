const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définir le schéma pour les utilisateurs
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// Créer le modèle pour les utilisateurs
const User = mongoose.model("User", userSchema);

module.exports = User;
