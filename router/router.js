const router = require('express').Router();
const controller = require('../controller/controller');

router.get('/getAllGoods',controller.getAllGoods);
router.post('/getGoodsByType',controller.getGoodByType);
router.post('/setOrder',controller.Setorder);
router.post('/getGoodById',controller.getGoodById);

module.exports = router;