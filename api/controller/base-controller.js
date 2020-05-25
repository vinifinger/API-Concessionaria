const sqlExecuter = require('../../config/db-config');
const retorno = require('../../config/return');


module.exports.getAllCar = 
    function getAllCar(req, res, next) {
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
    
module.exports.getInfosCarById = 
    function getInfosCarById(req, res, next) {
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
                tbc.data_entrada
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

module.exports.insertInfosCar = 
    function insertInfosCar(req, res, next) {
        const query = `
        INSERT INTO tb_carros
            (nome, motor, marca, ano, modelo, cambio, tipo, quilometragem, valor, num_portas, direcao, cor, freio, ipva_ano, placa, aro_pneu)
        VALUES
            (@nome, @motor, @marca, @ano, @modelo, @cambio, @tipo, @quilometragem, @valor, @num_portas, @direcao, @cor, @freio, @ipva_ano, @placa, @aro_pneu)

        SELECT @@IDENTITY as [id]
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
            }
        ];
        
        const response = new sqlExecuter({query, inputs});

        response.consultaBanco().then((result) => {
            res.status(200).json(retorno({ data: result.recordsets[0] }));
        }).catch(next);
    }

    
