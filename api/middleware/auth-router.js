const jwt = require('jsonwebtoken');
const auth = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (!authHeader) 
        return res.status(401).json({ error: 'No token provided'});

    jwt.verify(authHeader, auth.secret, (err, decoded) => {
        if (err) 
            return res.status(401).json({ error: 'Token invalid' });

        req.user = { 
            id: decoded.id,
            usuario: decoded.usuario,
            nome: decoded.nome,
            permissao: decoded.permissao
        }

        if (req.method === 'POST') {
            if (req.user.permissao)
                return next();         
            else 
                return res.status(401).json({ error: 'User without permission' });
        }

        return next();
    })
}