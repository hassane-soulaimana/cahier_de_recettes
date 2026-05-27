// Validation d'une recette
exports.validerRecette = (req, res, next) => {
  const { titre, ingredients, etapes } = req.body;

  if (!titre || titre.trim() === '') {
    return res.status(400).json({ message: 'Le titre est obligatoire' });
  }
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: 'Au moins un ingrédient est requis' });
  }
  if (!etapes || etapes.length === 0) {
    return res.status(400).json({ message: 'Au moins une étape est requise' });
  }

  next(); // tout est OK, on continue
};

// Validation d'un utilisateur
exports.validerUtilisateur = (req, res, next) => {
  const { nom, email, motDePasse } = req.body;

  if (!nom || nom.trim() === '') {
    return res.status(400).json({ message: 'Le nom est obligatoire' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email invalide' });
  }
  if (!motDePasse || motDePasse.length < 6) {
    return res.status(400).json({ message: 'Mot de passe trop court (6 caractères min)' });
  }

  next();
};

// Validation d'un commentaire
exports.validerCommentaire = (req, res, next) => {
  const { contenu, auteur } = req.body;

  if (!contenu || contenu.trim() === '') {
    return res.status(400).json({ message: 'Le contenu est obligatoire' });
  }
  if (!auteur) {
    return res.status(400).json({ message: 'L auteur est obligatoire' });
  }

  next();
};