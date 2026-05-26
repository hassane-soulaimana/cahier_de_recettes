const Utilisateur = require('../models/Utilisateur');

exports.getAll = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find().select('-motDePasse'); // cache le mdp
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};