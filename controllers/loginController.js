const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    // Génère un token JWT après connexion
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Stocke le token dans un cookie HTTP-only
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard"); // Redirection après connexion réussie
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
