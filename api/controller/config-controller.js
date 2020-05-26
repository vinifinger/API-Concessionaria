const sqlExecuter = require('../../config/db-config');
const retorno = require('../../config/return');

module.exports.getBaseInfos = 
    function getBaseInfos(req, res, next) {
        const query = `
            SELECT * FROM tb_config_geral
        `;
        const inputs = [];
        
        const response = new sqlExecuter({query, inputs});

        response.consultaBanco().then((result) => {
            res.status(200).json(retorno({ data: result.recordsets[0] }));
        }).catch(next);
    }


module.exports.getUsersInfos = 
    function getUsersInfos(req, res, next) {
        const query = `
            SELECT * FROM tb_users
        `;
        const inputs = [];
        
        const response = new sqlExecuter({query, inputs});

        response.consultaBanco().then((result) => {
            res.status(200).json(retorno({ data: result.recordsets[0] }));
        }).catch(next);
    }    









    
/*
===== Exemplo de endpoint =====

module.exports.[Nome Função] = 
    function [Nome Função](req, res, next) {
        const query = ``;
        const inputs = [];
        
        const response = new sqlExecuter({query, inputs});

        response.consultaBanco().then((result) => {
            res.status(200).json(retorno({ data: result.recordsets[0] }));
        }).catch(next);
    }

*/
