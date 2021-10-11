const jwt = require('jsonwebtoken');

const jwtConfig = {
    secret: 'Hgvzmk6xOW6kXpdTs7auh$wPs7UK$lctsC3Sk@uiHSsTK$Zvs%',

    verifyJWT(req, res, next) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, this.secret, (err, decoded) => {
            if (err) return res.status(401).send({ status: 'Token ausente ou inválido' });
            req.id_usuario = decoded.id_usuario;
            next();
        })
    },
}

module.exports = { jwt, jwtConfig };