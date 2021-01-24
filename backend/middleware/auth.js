const jwt = require('jsonwebtoken');

// Validation userId en comparaison avec le token
module.exports = (req, res, next) => {
    try {
        //récuperer le token enveler Bearer
        const token = req.headers.authorization.split(' ')[1];
        //vérifier le token et la clé secrete corresponde à celle dans la fonction login
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};