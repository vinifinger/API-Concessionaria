const controller = require('../controller/customer-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);
router.route('/infos').get(controller.getAllCustomer);
router.route('/infos/:id').get(controller.getInfosCustomerById);
router.route('/infos/insert').post(controller.insertInfosCustomer);
router.route('/infos/update/:id').post(controller.updateInfosCustomer);

module.exports = router;