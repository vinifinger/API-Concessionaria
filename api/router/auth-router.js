const controller = require('../controller/auth-controller');
const express = require('express');
const router = express.Router();

// Rotas
//Exemplo de rota
//router.route('caminho').get([controller].[Nome Função]);getInfos
router.route('/login').get(controller.checkLogin);
router.route('/signup').post(controller.signUpLogin);

module.exports = router;