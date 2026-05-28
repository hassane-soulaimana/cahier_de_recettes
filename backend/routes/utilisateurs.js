const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/utilisateursController');
const auth    = require('../middleware/auth');

router.post('/login', ctrl.login);
router.post('/',      ctrl.create);

router.get('/',       auth, ctrl.getAll);
router.get('/:id',    auth, ctrl.getOne); 
router.put('/:id',    auth, ctrl.update); 
router.delete('/:id', auth, ctrl.remove); 

module.exports = router;