const express = require('express');
const router  = express.Router();
const ctlr   = require('../controllers/recettesController');
const ctrlCom = require('../controllers/commentairesController');
const { validerRecette, validerCommentaire } = require('../middleware/validation');

// Recettes
router.get('/',    ctrlr.getAll);
router.get('/:id', ctrlr.getOne);
router.post('/',   validerRecette, ctrlr.create);
router.put('/:id', validerRecette, ctrlr.update);
router.delete('/:id', ctrlr.remove);

// Commentaires
router.get('/:id/commentaires',    ctrlCom.getAll);
router.post('/:id/commentaires',   validerCommentaire, ctrlCom.create);
router.delete('/:id/commentaires/:commentaireId', ctrlCom.remove);

module.exports = router;