const jwt = require("jsonwebtoken");

function AutenticacaoMiddleware(request, response, next) {
    const token = request.headers.token;
    try {
        jwt.verify(token, process.env.TOKEN);
        next();
    } catch(e) {
        return response.status(400).send("Sem autorização! " + e)
    }
}

module.exports = AutenticacaoMiddleware;