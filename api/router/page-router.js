const controller = require('../controller/page-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);getInfos
router.route('/infos').get(controller.getPageInfos);
router.route('/infos/insert').post(controller.insertInfosPage);
router.route('/infos/update/:id').post(controller.updateInfosPage);

module.exports = router;