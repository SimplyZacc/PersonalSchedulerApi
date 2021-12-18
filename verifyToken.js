const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({
            'message': 'Access Denied',
            'data': null,
            'status': false,
        });
    }

    try {
        const verified = jwt.verify(token, process.env.Token_Secret);
        req.user = verified;
        next();
    } catch (error) {

    }
}