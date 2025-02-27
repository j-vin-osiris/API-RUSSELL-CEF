const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.set("view engine", "ejs");

// Routes
app.use("/api/catways", require("./routes/catways"));
app.use("/api", require("./routes/reservations"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

// Route pour la page d'accueil
app.get("/", (req, res) =>
  res.render("index", { title: "Port de Plaisance Russell" })
);

app.get("/login", (req, res) => res.render("login"));

app.get("/dashboard", (req, res) => res.render("dashboard"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
