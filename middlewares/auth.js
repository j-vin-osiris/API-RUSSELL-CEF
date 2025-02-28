const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("Pas de token présent");
    return res.status(401).redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log("Utilisateur authentifié :", req.user);
    next();
  } catch (err) {
    console.log("Erreur de vérification du token :", err.message);
    res.status(401).redirect("/login");
  }
};
