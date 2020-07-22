const controller = require('../controller/car-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);
router.route('/infos').get(controller.getAllCar);
router.route('/infos/sold').get(controller.getAllCarSold);
router.route('/infos/deleted').get(controller.getAllCarDeleted);
router.route('/infos/:id').get(controller.getInfosCarById);
router.route('/infos/insert').post(controller.insertInfosCar);
router.route('/infos/update/:id').post(controller.updateInfosCar);
router.route('/infos/update/options/:id').post(controller.updateInfosCarOptions);

module.exports = router;