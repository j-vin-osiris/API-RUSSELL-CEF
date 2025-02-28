const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connecté..."))
  .catch((err) => console.error(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Pour les formulaires HTML
app.use(methodOverride("_method")); // Pour supporter PUT et DELETE dans les formulaires
app.use(cookieParser()); // Pour gérer les cookies

// Configuration du moteur de vues EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Fichiers statiques (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Importer les fichiers de routes
const authMiddleware = require("./middlewares/auth"); // Importer le middleware d'authentification
const catwaysRoutes = require("./routes/catways");
const reservationsRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");
const authLoginRoutes = require("./routes/authLogin");
const authRegisterRoutes = require("./routes/authRegister");

// Associer les routes à leurs chemins
app.use("/catways", authMiddleware, catwaysRoutes);
app.use("/catways/:id/reservations", authMiddleware, reservationsRoutes); // Routes pour les réservations liées aux catways
app.use("/users", authMiddleware, usersRoutes);
app.use("/login", authLoginRoutes);
app.use("/register", authRegisterRoutes);

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.render("index", { title: "Bienvenue au Port de Plaisance Russell" });
});

// Gérer les erreurs 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Page non trouvée" });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}...`));
