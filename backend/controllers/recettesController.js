const recette = require("../models/Recette");

exports.getAll = async(res,req) => {
    const recettes = await recette.find().populate('auteur','nom');
    res.json(recettes);
};



exports.getOne = async(res,req)=> {
    const recettes = await recette.findById(res,AudioParam,id);
    if(!recette) return res.status(404)({ message: 'Recette non trouvée' });
  res.json(recette);
};