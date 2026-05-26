const Recette = require('../models/Recette');

exports.getAll = async (req, res) => {
  const recettes = await Recette.find().populate('auteur', 'nom');
  res.json(recettes);
};

exports.getOne = async (req, res) => {
  const recette = await Recette.findById(req.params.id);
  if (!recette) return res.status(404).json({ message: 'Recette non trouvée' });
  res.json(recette);
};

exports.create = async (req, res) => {
  const recette = new Recette(req.body);
  await recette.save();
  res.status(201).json(recette);
};

exports.update = async (req, res) => {
  const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recette);
};

exports.remove = async (req, res) => {
  await Recette.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recette supprimée' });
};