const express = require('express');
const bodyParser = require('body-parser');
const car = require('../api/router/car-router');
const config = require('../api/router/config-router');
const page = require('../api/router/page-router');
const auth = require('../api/router/auth-router');
const customer = require('../api/router/customer-router');
const sale = require('../api/router/sale-router');
const middleware = require('../api/middleware/auth-router');

const app = express();
const ApiConfig = {
    app
};

// body-Parser
app.use(bodyParser.json());

// Rotas de Controller
// Exemplo:  
app.use('/auth', auth);
app.use('/v1', middleware);
app.use('/v1/car', car); 
app.use('/v1/page', page);  
app.use('/v1/config', config);
app.use('/v1/customer', customer);
app.use('/v1/sale', sale);

module.exports = ApiConfig;