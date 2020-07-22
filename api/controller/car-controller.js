const knexfile = (require('../../config/knexfile'));
const knex = require('knex')(knexfile.development);
const retorno = require('../../config/return');
const moment = require('moment');
const timestamp = moment().format('DD/MM/YYYY HH:MM:SS');

module.exports.getAllCar = async (req, res, next) => {
    try {
        const response = await 
            knex.select(
                'id', 
                'nome', 
                'marca', 
                'ano', 
                'valor')
            .from('tb_carros')
            .where('deletado', 0)
            .where('vendido', 0);

        return res.status(200).json(retorno({ data: response }));
    } catch (err) {
        return res.status(400).json(retorno({ data: err }));
    }
}
    
module.exports.getInfosCarById = async (req, res, next) => {
    try {
        const response = await 
            knex.select(
                'tb_carros.id',
                'tb_carros.nome',
                'tb_carros.motor',
                'tb_carros.marca',
                'tb_carros.ano',
                'tb_carros.modelo',
                'tb_carros.cambio',
                'tb_carros.tipo',
                'tb_carros.quilometragem',
                'tb_carros.valor',
                'tb_carros.num_portas',
                'tb_carros.direcao',
                'tb_carros.cor',
                'tb_carros.freio',
                'tb_carros.ipva_ano',
                'tb_carros.placa',
                'tb_carros.aro_pneu',
                'tb_carros.destaque',
                'tb_carros.vendido',
                'tb_carros.deletado',
                'tb_carros.data_entrada',
                'tb_carros.data_atualizacao',
                'tb_carros_opcionais.airbag',
                'tb_carros_opcionais.vidro_eletrico',
                'tb_carros_opcionais.ar_condicionado',
                'tb_carros_opcionais.trava_eletrica',
                'tb_carros_opcionais.teto_solar',
                'tb_carros_opcionais.farol_neblina',
                'tb_carros_opcionais.camera_estacionamento',
                'tb_carros_opcionais.sensores_chuva',
                'tb_carros_opcionais.sensores_estacionamento_frontal',
                'tb_carros_opcionais.sensores_estacionamento_traseiro',
                'tb_carros_opcionais.computador_bordo',
                'tb_carros_opcionais.star_stop',
                'tb_carros_opcionais.hack',
                'tb_carros_opcionais.alarme',
                'tb_carros_opcionais.corta_corrente',
                'tb_carros_opcionais.insulfilme')
            .from('tb_carros')
            .innerJoin('tb_carros_opcionais', 'tb_carros_opcionais.id_carro', 'tb_carros.id')
            .where('tb_carros.id', req.params.id);

            console.log(timestamp);
        
        return res.status(200).json(retorno({ data: response }));
    } catch (err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.insertInfosCar = async (req, res) => {
    try {
        await knex('tb_carros')
        .insert({
            nome: req.body.nome,
            motor: req.body.motor,
            marca: req.body.motor,
            ano: req.body.ano,
            modelo: req.body.modelo,
            cambio: req.body.cambio, 
            tipo: req.body.tipo,
            quilometragem: req.body.quilometragem,
            valor: req.body.valor,
            num_portas: req.body.num_portas,
            direcao: req.body.direcao,
            cor: req.body.cor,
            freio: req.body.freio,
            ipva_ano: req.body.ipva_ano,
            placa: req.body.placa,
            aro_pneu: req.body.aro_pneu,
            destaque: 0,
            vendido: 0,
            deletado: 0,
            data_entrada: timestamp,
            data_atualizacao: timestamp
        });
        
        const response = await knex.select('id').from('tb_carros').orderBy('id', 'DESC').limit(1);
        await knex('tb_carros_opcionais')
        .insert({
            id_carro: response[0].id,
            airbag: req.body.airbag,
            vidro_eletrico: req.body.vidro_eletrico,
            ar_condicionado: req.body.ar_condicionado,
            trava_eletrica: req.body.trava_eletrica,
            teto_solar: req.body.teto_solar,
            farol_neblina: req.body.farol_neblina,
            camera_estacionamento: req.body.camera_estacionamento,
            sensores_chuva: req.body.sensores_chuva,
            sensores_estacionamento_frontal: req.body.sensores_estacionamento_frontal,
            sensores_estacionamento_traseiro: req.body.sensores_estacionamento_traseiro,
            computador_bordo: req.body.computador_bordo,
            star_stop: req.body.star_stop,
            hack: req.body.hack,
            alarme: req.body.alarme,
            corta_corrente: req.body.corta_corrente,
            insulfilme: req.body.insulfilme,
            data_atualizacao: timestamp
        });

        return res.status(200).json(retorno({ data: [{ message: 'Save' }] }));
    } catch (err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.updateInfosCar = async (req, res) => {
    try {
        const response = await knex('tb_carros')
        .update({
            nome: req.body.nome,
            motor: req.body.motor,
            marca: req.body.motor,
            ano: req.body.ano,
            modelo: req.body.modelo,
            cambio: req.body.cambio, 
            tipo: req.body.tipo,
            quilometragem: req.body.quilometragem,
            valor: req.body.valor,
            num_portas: req.body.num_portas,
            direcao: req.body.direcao,
            cor: req.body.cor,
            freio: req.body.freio,
            ipva_ano: req.body.ipva_ano,
            placa: req.body.placa,
            aro_pneu: req.body.aro_pneu,
            destaque: req.body.deletado,
            vendido: req.body.vendido,
            deletado: req.body.deletado,
            data_entrada: timestamp,
            data_atualizacao: timestamp
        }).where('id', req.params.id);
        
        return res.status(200).json(retorno({ data: [{ message: 'Save' }] }));
    } catch (err) {
        return res.status(400).json(retorno({ data: err }));
    }
}

module.exports.updateInfosCarOptions = async (req, res) => {
    try {
        await knex('tb_carros_opcionais')
        .update({
            airbag: req.body.airbag,
            vidro_eletrico: req.body.vidro_eletrico,
            ar_condicionado: req.body.ar_condicionado,
            trava_eletrica: req.body.trava_eletrica,
            teto_solar: req.body.teto_solar,
            farol_neblina: req.body.farol_neblina,
            camera_estacionamento: req.body.camera_estacionamento,
            sensores_chuva: req.body.sensores_chuva,
            sensores_estacionamento_frontal: req.body.sensores_estacionamento_frontal,
            sensores_estacionamento_traseiro: req.body.sensores_estacionamento_traseiro,
            computador_bordo: req.body.computador_bordo,
            star_stop: req.body.star_stop,
            hack: req.body.hack,
            alarme: req.body.alarme,
            corta_corrente: req.body.corta_corrente,
            insulfilme: req.body.insulfilme,
            data_atualizacao: timestamp
        }).where('id_carro', req.params.id);
        
        return res.status(200).json(retorno({ data: [{ message: 'Save' }] }));
    } catch (err) {
        return res.status(400).json(retorno({ data: err }));
    }
}   