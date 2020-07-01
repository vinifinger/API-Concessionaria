const sqlExecuter = require('../../config/db-config');
const retorno = require('../../config/return');
const jwt = require('jsonwebtoken');
const auth = require('../../config/auth.json');

function geradorToken(params = {}) {
    return jwt.sign( params, auth.secret, {
        expiresIn: 28800
    });
}

module.exports.checkLogin = (req, res, next) => {
    const query = `
        SELECT
            id, 
            nome, 
            email  
        FROM tb_users 
        WHERE ativo = 1 
        AND [user] = @usuario 
        AND senha = @senha
    `;
    const inputs = [
        {
            nome: 'usuario',
            valor: req.body.usuario
        },
        {
            nome: 'senha',
            valor: req.body.senha
        }
    ];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        if (result.rowsAffected[0]){
            const id = result.recordsets[0].id;
            return res.status(200).json({ data: result.recordset[0], token: geradorToken({ id: id }) });
        } else {
            return res.status(401).json(retorno({ data: 'Usuario e/ou senha inválido'}));
        }
    }).catch(next);
}
    
/*
===== Exemplo de endpoint =====

module.exports.[Nome Função] = (req, res, next) => {
        const query = ``;
        const inputs = [];
        
        const response = new sqlExecuter({query, inputs});

        response.consultaBanco().then((result) => {
            res.status(200).json(retorno({ data: result.recordsets[0] }));
        }).catch(next);
    }

*/
