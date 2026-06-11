const multer = require('multer');
const path   = require('path');

// stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },

  // Nom du fichier sauvegardé
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const nomFichier = Date.now() + '-' + Math.round(Math.random() * 1e9) + extension;
    callback(null, nomFichier);
  }
});

// Accepte les images 
const fileFilter = (req, file, callback) => {
  const typesAutorisés = ['image/jpeg', 'image/png', 'image/webp'];
  if (typesAutorisés.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Format non supporté. Utilisez JPG, PNG ou WEBP'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 300 * 1024 * 1024 }
});

module.exports = upload;