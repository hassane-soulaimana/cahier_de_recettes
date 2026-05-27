const Recette = require('../models/Recette');

exports.getAll = async (req, res) => {
  try {
    const { ingredient, auteur, tri } = req.query;
    let filtre = {};

    // Filtre par ingrédient
    if (ingredient) {
      filtre.ingredients = { $regex: ingredient};
    }

    // Filtre par auteur
    if (auteur) {
      filtre.auteur = auteur;
    }

    // Tri
    let triOption = { createdAt: -1 };
    if (tri === 'date_asc')  triOption = { createdAt: 1 };
    if (tri === 'date_desc') triOption = { createdAt: -1 };

    const recettes = await Recette.find(filtre)
      .sort(triOption)
      .populate('auteur', 'nom email');

    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};


exports.getOne = async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id)
      .populate('auteur', 'nom email');
    if (!recette) return res.status(404).json({ message: 'Recette non trouvée' });
    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const recette = new Recette(req.body);
    await recette.save();
    res.status(201).json(recette);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const recette = await Recette.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!recette) return res.status(404).json({ message: 'Recette non trouvée' });
    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const recette = await Recette.findByIdAndDelete(req.params.id);
    if (!recette) return res.status(404).json({ message: 'Recette non trouvée' });
    res.json({ message: 'Recette supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};