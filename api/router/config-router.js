const controller = require('../controller/config-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);getInfos
router.route('/base/infos').get(controller.getBaseInfos);
router.route('/users/infos').get(controller.getUsersInfos);

module.exports = router;