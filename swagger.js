const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Final Project API',
        description: 'CSE 341 Final Project API'
    },
    host: 'cse-341-final-project-r0ix.onrender.com',
    schemes: ['https'],
    securityDefinitions: {
        // Swagger 2.0 only allows apiKey in 'header' or 'query'. The session
        // cookie is sent by the browser automatically, so documenting it as a
        // Cookie header keeps the document valid and the padlocks visible.
        sessionAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Cookie',
            description: 'Passport session cookie created by the GitHub OAuth flow (start at GET /auth/github). Protected routes return 401 without it.'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);