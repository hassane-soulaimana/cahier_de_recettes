const express = require('express');
const router  = express.Router();
const ctrlr   = require('../controllers/recettesController');
const ctrlCom = require('../controllers/commentaireController');
const { validerRecette, validerCommentaire } = require('../middleware/validation');
const upload = require ('../middleware/upload')
const auth = require ('../middleware/auth');

// GET
router.get('/',    ctrlr.getAll);
router.get('/:id', ctrlr.getOne);

//  POST, PUT, DELETE
router.post('/',   auth, upload.single('image'), ctrlr.create);
router.put('/:id', auth, upload.single('image'), ctrlr.update);
router.delete('/:id', auth, ctrlr.remove);

// Commentaires
router.get('/:id/commentaires',    ctrlCom.getAll);
router.post('/:id/commentaires',   auth, validerCommentaire, ctrlCom.create);
router.delete('/:id/commentaires/:commentaireId', auth, ctrlCom.remove);

module.exports = router;