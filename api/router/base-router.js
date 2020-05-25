const BaseController = require('../controller/base-controller');
const express = require('express');
const router = express.Router();

// Rotas
//router.route('caminho').get([controller].[função]);
router.route('/car/infos').get(BaseController.getAllCar);
router.route('/car/infos/insert').post(BaseController.insertInfosCar);
router.route('/car/infos/:id').get(BaseController.getInfosCarById);

module.exports = router;