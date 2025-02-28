const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Récupérer le token depuis les cookies
  const token = req.cookies.token;

  // Vérifier si le token existe
  if (!token) {
    return res.status(401).json({ msg: "Accès refusé. Aucun token fourni." });
  }

  try {
    // Vérifier et décoder le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur décodé à la requête pour les prochaines opérations
    req.user = decoded.user;

    // Passer au middleware ou à la route suivante
    next();
  } catch (err) {
    // Si le token est invalide ou expiré
    res.status(401).json({ msg: "Token non valide." });
  }
};
