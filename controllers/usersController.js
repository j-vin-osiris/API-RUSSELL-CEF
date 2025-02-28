const User = require("../models/User"); // Import du modèle User

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Récupération de tous les utilisateurs dans la base de données
    res.json(users); // Retourne les utilisateurs en format JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer un utilisateur par son email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }); // Recherche d'un utilisateur par email
    if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé" });
    res.json(user); // Retourne l'utilisateur trouvé
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email déjà utilisé" });

    const newUser = new User({ username, email, password });
    await newUser.save(); // Sauvegarde de l'utilisateur dans la base de données
    res.status(201).json(newUser); // Retourne l'utilisateur créé
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour un utilisateur par son email
exports.updateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email }, // Recherche par email
      { username, password }, // Mise à jour des champs
      { new: true } // Retourne l'utilisateur mis à jour
    );

    if (!updatedUser)
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    res.json(updatedUser); // Retourne les détails de l'utilisateur mis à jour
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer un utilisateur par son email
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      email: req.params.email,
    }); // Suppression par email
    if (!deletedUser)
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
