const knexfile = (require('../../config/knexfile'));
const knex = require('knex')(knexfile.development);
const retorno = require('../../config/return');
const moment = require('moment');
const timestamp = moment().format('DD/MM/YYYY HH:MM:SS');

module.exports.getInfosSale = async (req, res) => {
    try {
        const response = await knex('tb_vendas');

        return res.status(200).json(retorno({ data: response, user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}     

module.exports.insertInfosSale = async (req, res) => {
    try {
        await knex('tb_vendas')
        .insert({
            id_carro: req.body.id_carro,
            id_user: req.body.id_user,
            id_cliente: req.body.id_cliente,
            data_venda: timestamp,
            valor: req.body.valor
        });

        return res.status(200).json(retorno({ data: [{ message: 'Save' }], user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}

module.exports.updateInfosSale = async (req, res) => {
    try {
        await knex('tb_vendas')
        .update({
            id_carro: req.body.id_carro,
            id_user: req.body.id_user,
            id_cliente: req.body.id_cliente,
            data_venda: timestamp,
            valor: req.body.valor
        }).where('id', req.params.id);

        return res.status(200).json(retorno({ data: [{ message: 'Save' }], user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}