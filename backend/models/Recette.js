const mongoose = require('mongoose');

const SchemaRecettes = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  ingredients: [String],
  etapes: [String],
  tempsPreparation: Number,
  categorie: String,     
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
}, { timestamps: true });

module.exports = mongoose.model('Recette',SchemaRecettes);