const controller = require('../controller/sale-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);
router.route('/infos').get(controller.getInfosSale);
router.route('/infos/insert').post(controller.insertInfosSale);
router.route('/infos/update/:id').post(controller.updateInfosSale);

module.exports = router;