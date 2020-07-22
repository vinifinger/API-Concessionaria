const jwt = require('jsonwebtoken');
const auth = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (!authHeader) 
        return res.status(401).json({ error: 'No token provided'});

    jwt.verify(authHeader, auth.secret, (err, decoded) => {
        if (err) 
            return res.status(401).json({ error: 'Token invalid' });
        
        req.id = decoded.id;
        req.usuario = decoded.usuario;
        req.nome = decoded.nome;
        req.permissao = decoded.permissao;

        return next();
    })
}