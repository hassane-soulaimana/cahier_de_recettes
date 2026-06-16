const Utilisateur = require('../models/Utilisateur');
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');

// Create
exports.create = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    const existe = await Utilisateur.findOne({ email });
    if (existe) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hash du mot de passe
    const hash = await bcrypt.hash(motDePasse, 8);

    const utilisateur = new Utilisateur({ nom, email, motDePasse: hash });
    await utilisateur.save();

    res.status(201).json({ message: 'Utilisateur créé', utilisateur: { nom, email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// POST
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifie si l'utilisateur existe
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Vérifie le mot de passe
    const valide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!valide) return res.status(401).json({ message: 'Mot de passe incorrect' });

    //token JWT
    const token = jwt.sign(
      { id: utilisateur._id, nom: utilisateur.nom },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};
// Get : tous les utilisateurs
exports.getAll = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find().select('-motDePasse');
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id).select('-motDePasse');
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
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
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};