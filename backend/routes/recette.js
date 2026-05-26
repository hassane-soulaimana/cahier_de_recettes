const express = require('express');
const router = express.Router();
const CtrlR = require('../controllers/recettesController');

router.get('/', CtrlR.getAll);
router.get('/:id', CtrlR.getOne);
router.post('/', CtrlR.create);
router.put('/:id', CtrlR.update);
router.delete('/:id', CtrlR.remove);

module.exports = router;