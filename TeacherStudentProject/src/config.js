//config app
const path = require('path')
const merge = require('lodash/merge')  // biblioteka Lodash: https://lodash.com/

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: 9000,
        ip: '127.0.0.1',
        apiRoot: '/api',
        mongo: {
            options : {
                useCreateIndex: true,        // DeprecationWarning: collection.ensureIndex is deprecated.
                useNewUrlParser: true           // DeprecationWarning: current URL string parser is deprecated
            }
        },

    },
    test: {
        mongo: {
            uri: 'mongodb://localhost:27017/TeacherStudent',
            options: {
                debug: true
            }
        },
        jwtSecret: '4rrfdutpOntGGOVYLdG6hiOQf4v7dY'
    },
    development: {
        mongo: {
            uri: 'mongodb://127.0.0.1:27017/TeacherStudent',
            options: {
                debug: true
            }
        },
        jwtSecret: '48mXwHcnH8qEwWgzo24y5BEIxgAU0a'
    },
    production: {
        ip: process.env.IP || undefined,
        port: process.env.PORT || 8080,
        mongo: {
            uri: '### adres serwera produkcyjnego ###',
        },
        jwtSecret: process.env.SECRET       // Nigdy nie trzymamy hasel do produkcji w konfiguracji!
    }
}

module.exports = merge(config.all, config[config.all.env])
