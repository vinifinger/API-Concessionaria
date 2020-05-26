const express = require('express');
const bodyParser = require('body-parser');
const car = require('../api/router/car-router');
const config = require('../api/router/config-router');
const page = require('../api/router/page-router');

const app = express();
const ApiConfig = {
    app
};

// body-Parser
app.use(bodyParser.json());

// Rotas de Controller
// Exemplo:
app.use('/v1/car', car);  
app.use('/v1/config', config);  
app.use('/v1/page', page);  

module.exports = ApiConfig;