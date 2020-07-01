const controller = require('../controller/config-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);
router.route('/base/infos').get(controller.getInfosBase);
router.route('/base/infos/update/:id').post(controller.updateInfosBase);
router.route('/users/infos').get(controller.getInfosUsers);
router.route('/users/infos/insert').post(controller.insertInfosUser);
router.route('/users/infos/update/:id').post(controller.updateInfosUser);

module.exports = router;