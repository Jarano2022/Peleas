const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/env').tokenKey;

function getTokenFromRequest(req) {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.split(' ')[1];
    if (bearerToken) {
        return bearerToken;
    }

    const cookieHeader = req.headers.cookie || '';
    const cookiePair = cookieHeader
        .split(';')
        .map((part) => part.trim())
        .find((part) => part.startsWith('auth_token='));

    if (!cookiePair) {
        return null;
    }

    return decodeURIComponent(cookiePair.slice('auth_token='.length));
}

function rejectRequest(req, res, statusCode, message) {
    const shouldRedirect =
        req.originalUrl.startsWith('/dashboard') ||
        req.originalUrl.startsWith('/dashboardFiles');

    if (shouldRedirect) {
        return res.redirect('/');
    }

    return res.status(statusCode).json({ message });
}

function verificarToken(req, res, next) {
    const token = getTokenFromRequest(req);

    if (!token) {
        return rejectRequest(req, res, 403, 'No tienes permiso (Token faltante)');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return rejectRequest(req, res, 401, 'Token invalido o expirado');
        }

        req.usuario = decoded;
        next();
    });
}

module.exports = { verificarToken };
