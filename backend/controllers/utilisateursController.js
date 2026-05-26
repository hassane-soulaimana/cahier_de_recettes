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

// Create
exports.create = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Vérifie si l'email existe déjà
    const existe = await Utilisateur.findOne({ email });
    if (existe) return res.status(400).json({ message: 'Email déjà utilisé' });

    const utilisateur = new Utilisateur({ nom, email, motDePasse });
    await utilisateur.save();

    res.status(201).json({ message: 'Utilisateur créé', utilisateur: { nom, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-motDePasse');
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};