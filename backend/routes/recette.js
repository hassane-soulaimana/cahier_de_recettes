const express = require('express');
const router = express.Router();
const CtrlR = require('../controllers/recettesController');

router.get('/' ,CtrlR.getAll)
router.get('/' ,CtrlR.getOne)
router.get('/' ,CtrlR.create)
router.get('/' ,CtrlR.remove)
router.get('/' ,CtrlR.update)

module.exports = router;