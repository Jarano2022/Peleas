require('dotenv').config();

const envs = {
    tokenKey: process.env.TOKEN_KEY,
    port: process.env.PORT || 3000
};

module.exports = envs;