const multer = require('multer');
const path   = require('path');

// stocker les fichiers
const storage = multer.diskStorage({

  // Dossier de destination
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // Nom du fichier sauvegardé
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nomFichier = Date.now() + '-' + Math.round(Math.random() * 1e9) + extension;
    cb(null, nomFichier);
  }
});

// Accepte les images 
const fileFilter = (req, file, cb) => {
  const typesAutorisés = ['image/jpeg', 'image/png', 'image/webp'];
  if (typesAutorisés.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format non supporté. Utilisez JPG, PNG ou WEBP'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;