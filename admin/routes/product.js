var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/product.controller');

router.post('/data',dataCtrl.create);
router.put('/data/:id',dataCtrl.update);
router.delete('/data/:id',dataCtrl.remove);
router.post('/removes',dataCtrl.removes);//删除多条数据
router.post('/list',dataCtrl.list);

module.exports = router;
