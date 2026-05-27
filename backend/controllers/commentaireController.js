const Commentaire = require('../models/Commentaire');
const Recette     = require('../models/Recette');

exports.getAll = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ recette: req.params.id })
      .populate('auteur', 'nom');
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) return res.status(404).json({ message: 'Recette non trouvée' });

    const commentaire = new Commentaire({
      contenu: req.body.contenu,
      auteur:  req.body.auteur,
      recette: req.params.id,
    });

    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Commentaire.findByIdAndDelete(req.params.commentaireId);
    res.json({ message: 'Commentaire supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};