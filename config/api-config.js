const express = require('express');
const bodyParser = require('body-parser');
const base = require('../api/router/base-router')

const app = express();
const ApiConfig = {
    app
};

// body-Parser
app.use(bodyParser.json());

// Rotas de Controller
// Exemplo:
app.use('/v1/base/', base);  

module.exports = ApiConfig;