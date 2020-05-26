const BaseController = require('../controller/car-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);
router.route('/infos').get(BaseController.getAllCar);
router.route('/infos/:id').get(BaseController.getInfosCarById);
router.route('/infos/insert').post(BaseController.insertInfosCar);

module.exports = router;