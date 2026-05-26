const Utilisateur = require('../models/Utilisateur');

exports.getAll = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find().select('-motDePasse'); // cache le mdp
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id).select('-motDePasse');
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};