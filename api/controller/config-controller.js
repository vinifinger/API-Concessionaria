const knexfile = (require('../../config/knexfile'));
const knex = require('knex')(knexfile.development);
const retorno = require('../../config/return');
const moment = require('moment');
const timestamp = moment().format('DD/MM/YYYY HH:MM:SS');

module.exports.getInfosBase = async (req, res, next) => {
    try {
        const response = await knex.select('*').from('tb_config_geral');

        return res.status(200).json(retorno({ data: response }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.updateInfosBase = async (req, res) => {
    try {
        await knex('tb_users')
        .update({
            nome_site: req.body.nome_site,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            email: req.body.email,
            cep: req.body.cep,
            bairro: req.body.bairro,
            rua: req.body.rua,
            numero: req.body.numero,
            cidade: req.body.cidade,
            uf: req.body.uf,
            referencia: req.body.referencia,
            mapa: req.body.mapa,
            telefone1: req.body.telefone1,
            telefone2: req.body.telefone2,
            telefone3: req.body.telefone3,
            whatsapp: req.body.whatsapp,
            facebook: req.body.facebook,
            instagram: req.body.instagram
        }).where('id', req.params.id);

        return res.status(200).json(retorno({ data: [{message: 'Save' }] }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.getInfosUsers = async (req, res) => {
    try {
        const response = await knex.select('*').from('tb_users').where('ativo', 1);

        return res.status(200).json(retorno({ data: response }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}    

module.exports.insertInfosUser = async (req, res) => {
    try {
        await knex('tb_users')
        .insert({
            user: req.body.usuario,
            senha: req.body.senha,
            nome: req.body.nome,
            email: req.body.email,
            permissao: req.body.permissao,
            ativo: 1
        });

        return res.status(200).json(retorno({ data: [{message: 'Save' }] }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.updateInfosUser = async (req, res) => {
    try {
        await knex('tb_users')
        .update({
            nome: req.body.nome,
            email: req.body.email,
            permissao: req.body.permissao,
            ativo: req.body.ativo
        }).where('id', req.params.id);

        return res.status(200).json(retorno({ data: [{message: 'Save' }] }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}