const sqlExecuter = require('../../config/db-config');
const retorno = require('../../config/return');

module.exports.getInfosBase = (req, res, next) => {
    const query = `
        SELECT * FROM tb_config_geral
    `;
    const inputs = [];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}

module.exports.updateInfosBase = (req, res, next) => {
    const parametros = req.body;
    const colunas = Object.keys(parametros);
    const valores = Object.values(parametros);  
    var estrutura = '';
    for (let i = 0; i < colunas.length; i++) {
        if (i + 1 < colunas.length){
            estrutura += "[" + colunas[i] + "] = '" + valores[i] + "', ";
        } else {
            estrutura += "[" + colunas[i] + "] = '" + valores[i] + "'";
        }
    }
    const query = `
        DECLARE @query VARCHAR(MAX)

        SET @query = '
        UPDATE tb_config_geral SET
        ' + @estrutura + '
        WHERE id = ' + CAST(@id AS Varchar(MAX))

        EXEC(@query);
    `;
    const inputs = [
        {
            nome: 'id',
            valor: parseInt(req.params.id)
        },
        {
            nome: 'estrutura',
            valor: estrutura
        }
    ];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}

module.exports.getInfosUsers = (req, res, next) => {
    const query = `
        SELECT * FROM tb_users WHERE ativo = 1
    `;
    const inputs = [];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}    

module.exports.insertInfosUser = (req, res, next) => {
    const query = `
        INSERT INTO tb_users (
            [user],
            senha,
            nome,
            email,
            permissao
        ) VALUES (
            @user,
            @senha,
            @nome,
            @email,
            @permissao
        );

        SELECT @@IDENTITY AS [id];
    `;
    const inputs = [
        {
            nome: 'user',
            valor: req.body.user
        },
        {
            nome: 'senha',
            valor: req.body.senha
        },
        {
            nome: 'nome',
            valor: req.body.nome
        },
        {
            nome: 'email',
            valor: req.body.email
        },
        {
            nome: 'permissao',
            valor: req.body.permissao
        }
    ];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}

module.exports.updateInfosUser = (req, res, next) => {
    const parametros = req.body;
    const colunas = Object.keys(parametros);
    const valores = Object.values(parametros);
    var estrutura = '';
    for (let i = 0; i < colunas.length; i++) {
        if (i + 1 < colunas.length){
            estrutura += "[" + colunas[i] + "] = '" + valores[i] + "', ";
        } else {
            estrutura += "[" + colunas[i] + "] = '" + valores[i] + "'";
        }
    }
    const query = `
        DECLARE @query VARCHAR(MAX)

        SET @query = '
        UPDATE tb_users SET
        ' + @estrutura + '
        WHERE id = ' + CAST(@id AS Varchar(MAX))

        EXEC(@query);
    `;
    const inputs = [
        {
            nome: 'id',
            valor: parseInt(req.params.id)
        },
        {
            nome: 'estrutura',
            valor: estrutura
        }
    ];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
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
