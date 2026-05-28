const mongoose = require('mongoose');

const commentaireSchema =new mongoose.Schema({
    contenu: { type: String , required: true},
    auteur : {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true},
    recette:    { type: mongoose.Schema.Types.ObjectId, ref: 'Recette', required: true },
}, { timestamps: true });


module.exports = mongoose.model('Commentaire', commentaireSchema);




