const sqlExecuter = require('../../config/db-config');
const retorno = require('../../config/return');


module.exports.getPageInfos = (req, res, next) => {
    const query = `
        SELECT * FROM tb_pages WHERE ativo = 1
    `;
    const inputs = [];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}    

module.exports.insertInfosPage = (req, res, next) => {
    const query = `
        INSERT INTO tb_pages (
            nome,
            titulo,
            conteudo
        ) VALUES (
            @nome,
            @titulo,
            @conteudo
        );

        SELECT @@IDENTITY AS [id];
    `;
    const inputs = [
        {
            nome: 'nome',
            valor: req.body.nome
        },
        {
            nome: 'titulo',
            valor: req.body.titulo
        },
        {
            nome: 'conteudo',
            valor: req.body.conteudo
        }
    ];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}

module.exports.updateInfosPage = (req, res, next) => {
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
        UPDATE tb_pages SET
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
