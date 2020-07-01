const sqlExecuter = require('../../config/db-config');
const retorno = require('../../config/return');


module.exports.getAllCar = (req, res, next) => {
    const query = `
        SELECT 
            id, 
            nome,  
            marca,
            ano,
            valor
        FROM tb_carros
        WHERE deletado = 0
    `;
    const inputs = [];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}
    
module.exports.getInfosCarById = (req, res, next) => {
    const query = `
        SELECT 
            tbc.id,
            tbc.nome,
            tbc.motor,
            tbc.marca,
            tbc.ano,
            tbc.modelo,
            tbc.tipo,
            tbc.quilometragem,
            tbc.valor,
            tbc.num_portas,
            tbc.direcao,
            tbc.cor,
            tbc.freio,
            tbca.airbag,
            tbca.alarme,
            tbca.ar_condicionado,
            tbca.camera_estacionamento,
            tbca.computador_bordo,
            tbca.corta_corrente,
            tbca.farol_neblina,
            tbca.hack,
            tbca.insulfilme,
            tbca.sensores_chuva,
            tbca.sensores_estacionamento_frontal,
            tbca.sensores_estacionamento_traseiro,
            tbca.star_stop,
            tbca.teto_solar,
            tbca.trava_eletrica,
            tbca.vidro_eletrico,
            tbc.ipva_ano,
            tbc.placa,
            tbc.aro_pneu,
            tbc.destaque,
            tbc.vendido,
            tbc.deletado,
            tbc.data_entrada,
            tbc.data_atualizacao
        FROM tb_carros tbc
            INNER JOIN tb_carros_opcionais tbca
            ON tbc.id = tbca.id_carro
        WHERE tbc.id = @id;
    `;

    const inputs = [
        {
            nome: 'id',
            valor: req.params.id
        }
    ];

    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}

module.exports.insertInfosCar = (req, res, next) => {
    const query = `
    INSERT INTO tb_carros
        (
            nome, 
            motor, 
            marca, 
            ano, 
            modelo, 
            cambio, 
            tipo, 
            quilometragem, 
            valor, 
            num_portas, 
            direcao, 
            cor, 
            freio, 
            ipva_ano, 
            placa, 
            aro_pneu
        )
    VALUES
        (
            @nome, 
            @motor, 
            @marca, 
            @ano, 
            @modelo, 
            @cambio, 
            @tipo, 
            @quilometragem, 
            @valor, 
            @num_portas, 
            @direcao, 
            @cor, 
            @freio, 
            @ipva_ano, 
            @placa, 
            @aro_pneu
        );

    SET @id_carro = @@IDENTITY;
        
    INSERT INTO tb_carros_opcionais 
        (
            id_carro, 
            airbag, 
            vidro_eletrico, 
            ar_condicionado, 
            trava_eletrica, 
            teto_solar, 
            farol_neblina, 
            camera_estacionamento, 
            sensores_chuva, 
            sensores_estacionamento_frontal, 
            sensores_estacionamento_traseiro, 
            star_stop,
            hack,
            alarme,
            corta_corrente,
            insulfilme
        )
    VALUES
        (
            @id_carro,
            @airbag,
            @vidro_eletrico,
            @ar_condicionado,
            @trava_eletrica,
            @teto_solar,
            @farol_neblina,
            @camera_estacionamento,
            @sensores_chuva,
            @sensores_estacionamento_frontal,
            @sensores_estacionamento_traseiro,
            @star_stop,
            @hack,
            @alarme,
            @corta_corrente,
            @insulfilme
        );
        

    SELECT @id_carro AS [id_carro], @@IDENTITY AS [id_opcionais];
    `
    const inputs = [
        {
            nome: 'nome',
            valor: req.body.nome
        },
        {
            nome: 'motor',
            valor: req.body.motor
        },
        {
            nome: 'marca',
            valor: req.body.marca
        },
        {
            nome: 'ano',
            valor: req.body.ano
        },
        {
            nome: 'modelo',
            valor: req.body.modelo
        },
        {
            nome: 'cambio',
            valor: req.body.cambio
        },
        {
            nome: 'tipo',
            valor: req.body.tipo
        },
        {
            nome: 'quilometragem',
            valor: req.body.quilometragem
        },
        {
            nome: 'valor',
            valor: req.body.valor
        },
        {
            nome: 'num_portas',
            valor: req.body.num_portas
        },
        {
            nome: 'direcao',
            valor: req.body.direcao
        },
        {
            nome: 'cor',
            valor: req.body.cor
        },
        {
            nome: 'freio',
            valor: req.body.freio
        },
        {
            nome: 'ipva_ano',
            valor: req.body.ipva_ano
        },
        {
            nome: 'placa',
            valor: req.body.placa
        },
        {
            nome: 'aro_pneu',
            valor: req.body.aro_pneu
        },
        {
            nome: 'id_carro',
            valor: 0
        },
        {
            nome: 'airbag',
            valor: req.body.airbag
        },
        {
            nome: 'vidro_eletrico',
            valor: req.body.vidro_eletrico
        },
        {
            nome: 'ar_condicionado',
            valor: req.body.ar_condicionado
        },
        {
            nome: 'trava_eletrica',
            valor: req.body.trava_eletrica
        },
        {
            nome: 'teto_solar',
            valor: req.body.teto_solar
        },
        {
            nome: 'farol_neblina',
            valor: req.body.farol_neblina
        },
        {
            nome: 'camera_estacionamento',
            valor: req.body.camera_estacionamento
        },
        {
            nome: 'sensores_chuva',
            valor: req.body.sensores_chuva
        },
        {
            nome: 'sensores_estacionamento_frontal',
            valor: req.body.sensores_estacionamento_frontal
        },
        {
            nome: 'sensores_estacionamento_traseiro',
            valor: req.body.sensores_estacionamento_traseiro
        },
        {
            nome: 'star_stop',
            valor: req.body.star_stop
        },
        {
            nome: 'hack',
            valor: req.body.hack
        },
        {
            nome: 'alarme',
            valor: req.body.alarme
        },
        {
            nome: 'corta_corrente',
            valor: req.body.corta_corrente
        },
        {
            nome: 'insulfilme',
            valor: req.body.insulfilme
        }
    ];
    
    const response = new sqlExecuter({query, inputs});

    response.consultaBanco().then((result) => {
        res.status(200).json(retorno({ data: result.recordsets[0] }));
    }).catch(next);
}

module.exports.updateInfosCar = (req, res, next) => {
    const parametros = req.body;
    const colunas = Object.keys(parametros);
    const valores = Object.values(parametros);
    var estrutura = '';
    for (let i = 0; i < colunas.length; i++) {
        estrutura += "[" + colunas[i] + "] = '" + valores[i] + "', ";
    }
    const query = `
        DECLARE @query VARCHAR(MAX)

        SET @query = '
        UPDATE tb_carros SET
        ' + @estrutura + '
        data_atualizacao = GETDATE()
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



module.exports.updateInfosCarOptions = (req, res, next) => {
    const parametros = req.body;
    const colunas = Object.keys(parametros);
    const valores = Object.values(parametros);
    var estrutura = '';
    for (let i = 0; i < colunas.length; i++) {
        estrutura += "[" + colunas[i] + "] = '" + valores[i] + "', ";
    }
    const query = `
        DECLARE @query VARCHAR(MAX)

        SET @query = '
        UPDATE tb_carros_opcionais SET
        ' + @estrutura + '
        data_atualizacao = GETDATE()
        WHERE id_carro = ' + CAST(@id AS Varchar(MAX))

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

    
