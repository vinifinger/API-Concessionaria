const knexfile = (require('../../config/knexfile'));
const knex = require('knex')(knexfile.development);
const retorno = require('../../config/return');
const moment = require('moment');
const timestamp = moment().format('DD/MM/YYYY HH:MM:SS');

module.exports.getPageInfos = async (req, res) => {
    try {
        const response = await knex.select('*').from('tb_pages').where('ativo', 1);

        return res.status(200).json(retorno({ data: response }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}    

module.exports.insertInfosPage = async (req, res) => {
    try {
        await knex('tb_pages')
        .insert({
            nome: req.body.nome,
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        });

        return res.status(200).json(retorno({ data: [{ message: 'Save' }] }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.updateInfosPage = async (req, res) => {
    try {
        await knex('tb_pages')
        .update({
            nome: req.body.nome,
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).where('id', req.params.id);

        return res.status(200).json(retorno({ data: [{ message: 'Save' }] }));
    } catch(err) {
        return res.status(400).json(retorno({ data: err }));
    }
}