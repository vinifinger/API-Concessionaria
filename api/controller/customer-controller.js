const knexfile = (require('../../config/knexfile'));
const knex = require('knex')(knexfile.development);
const retorno = require('../../config/return');
const moment = require('moment');
const timestamp = moment().format('DD/MM/YYYY HH:MM:SS');

module.exports.getAllCustomer = async (req, res) => {
    try {
        const response = await 
            knex.select(
                'id',
                'nome',
                'cpf',
                'rg',
                'sexo')
            .from('tb_clientes');

        return res.status(200).json(retorno({ data: response, user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}    

module.exports.getInfosCustomerById = async (req, res) => {
    try {
        const response = await knex('tb_clientes').where('id', req.params.id);

        return res.status(200).json(retorno({ data: response, user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}    

module.exports.insertInfosCustomer = async (req, res) => {
    try {
        await knex('tb_clientes')
        .insert({
            nome: req.body.nome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            email: req.body.email,
            idade: req.body.idade,
            sexo: req.body.sexo,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            telefone1: req.body.telefone1,
            telefone2: req.body.telefone2,
            telefone3: req.body.telefone3
        });

        return res.status(200).json(retorno({ data: [{ message: 'Save' }], user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}

module.exports.updateInfosCustomer = async (req, res) => {
    try {
        await knex('tb_clientes')
        .update({
            nome: req.body.nome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            email: req.body.email,
            idade: req.body.idade,
            sexo: req.body.sexo,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            telefone1: req.body.telefone1,
            telefone2: req.body.telefone2,
            telefone3: req.body.telefone3
        }).where('id', req.params.id);

        return res.status(200).json(retorno({ data: [{ message: 'Save' }], user: req.user }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}