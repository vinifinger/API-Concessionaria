const knexfile = (require('../../config/knexfile'));
const knex = require('knex')(knexfile.development);
const retorno = require('../../config/return');
const jwt = require('jsonwebtoken');
const auth = require('../../config/auth.json');

function geradorToken(params = {}) {
    return jwt.sign( params, auth.secret, {
        expiresIn: 28800
    });
}

module.exports.checkLogin = async (req, res) => {
    try {
        const response = await 
            knex('tb_users')
            .where('user', req.body.usuario)
            .where('senha', req.body.senha);
        
        if (response[0]){
            const id = response[0].id;
            const usuario = response[0].user;
            const nome = response[0].nome;
            const permissao = response[0].permissao;
            
            return res.status(200).json({ data: response, token: geradorToken({ id: id, usuario: usuario, nome: nome, permissao: permissao }) });
        } else {
            return res.status(401).json(retorno({ data: 'Usuario e/ou senha inválido' }));
        }
    } catch (err) {
        return res.status(400).json(retorno({ data: err, user: req.user }));
    }
}

module.exports.signUpLogin = async (req, res) => {
    try {
        await knex('tb_users')
        .insert({
            user: req.body.usuario,
            senha: req.body.senha,
            nome: req.body.nome,
            email: req.body.email,
            permissao: 0,
            ativo: 1
        });
            
        res.status(200).json(retorno({ data: [{ message: 'Save' }] }));
    } catch (err) {
        res.status(400).json(retorno({ data: err, user: req.user }));
    }
}