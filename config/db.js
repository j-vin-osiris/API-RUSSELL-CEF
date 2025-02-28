const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Tentative de connexion à MongoDB..."); // Log avant la tentative de connexion

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connecté avec succès !"); // Log en cas de succès
  } catch (err) {
    console.error("Erreur lors de la connexion à MongoDB :", err.message); // Log en cas d'erreur
    process.exit(1); // Quitte le processus si la connexion échoue
  }
};

module.exports = connectDB;
