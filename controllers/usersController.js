const User = require("../models/User");

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("users/addUser", {
        error: "L'email existe déjà. Veuillez saisir un autre email.",
        username: username,
        email: email,
        role: role,
      });
    }

    // Si aucun utilisateur avec cet email n'existe, créer un nouvel utilisateur
    const newUser = new User({ username, email, role });
    await newUser.save();
    res.redirect("/users");
  } catch (err) {
    console.error("Erreur lors de la création d'un utilisateur :", err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("users/users", { title: "Gestion des Utilisateurs", users });
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des utilisateurs :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer un utilisateur spécifique pour la page d'édition
exports.getEditUserPage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }
    res.render("users/editUser", { user }); // Rendre la vue editUser.ejs avec les données de l'utilisateur
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send("Utilisateur introuvable");
    res.redirect("/users");
  } catch (err) {
    console.error(
      "Erreur lors de la mise à jour de l'utilisateur :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }
    res.redirect("/users");
  } catch (err) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur :",
      err.message
    );
    res.status(500).send("Erreur serveur");
  }
};
