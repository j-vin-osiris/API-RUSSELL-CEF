const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middlewares/auth"); // Importer le middleware d'authentification
const dashboardController = require("./controllers/dashboardController"); // Importer le contrôleur du tableau de bord
const path = require("path");

// Charger les variables d'environnement
dotenv.config();
connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour les formulaires HTML
app.use(methodOverride("_method")); // Pour supporter PUT et DELETE dans les formulaires
app.use(cookieParser()); // Pour gérer les cookies

// Configuration du moteur de vues EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Fichiers statiques (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Importer les fichiers de routes
const authLoginRoutes = require("./routes/authLogin");
const authRegisterRoutes = require("./routes/authRegister");
const dashboardRoutes = require("./routes/dashboard");
const catwaysRoutes = require("./routes/catways");
const reservationsRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");

// Associer les routes à leurs chemins
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

app.use("/login", authLoginRoutes);
app.use("/register", authRegisterRoutes);
app.use("/dashboard", authenticateToken, dashboardRoutes); // Protéger la route du tableau de bord
app.use("/catways", authenticateToken, catwaysRoutes); // Protéger la route des catways
app.use("/reservations", authenticateToken, reservationsRoutes); // Protéger la route des réservations
app.use("/users", authenticateToken, usersRoutes); // Protéger la route des utilisateurs

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.render("index", { title: "Bienvenue au Port de Plaisance Russell" });
});

// Route pour la documentation de l'API
app.get("/documentation", (req, res) => {
  res.render("documentation");
});

// Route de déconnexion
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// Route du tableau de bord protégée
app.get("/dashboard", authenticateToken, dashboardController.getDashboard);

// Gérer les erreurs 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Page non trouvée" });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}...`));
