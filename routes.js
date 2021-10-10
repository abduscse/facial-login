const azureService = require('./azure-service');
const faceApiJsService = require('./face-api-service');
const joi = require('joi');
routes = [
    {
        method: 'GET', path: '/',
        handler: (req, res) => {
            return 'Facial login service is up and running.';
        }
    },
    {
        method: 'POST', path: '/register', handler: azureService.register,
        options: {
            validate: {
                query: joi.object({
                    email: joi.string().email().required()
                }),
                payload: joi.object().required()
            },
            response: {
                schema: joi.object({
                    email: joi.string().email().required(),
                    message: joi.string().required()
                }).required(),
                failAction: 'log'
            }
        }
    },
    {
        method: 'POST', path: '/login', handler: azureService.login,
        options: {
            validate: {
                query: joi.object({
                    email: joi.string().required()
                }),
                payload: joi.object().required()
            },
            response: {
                schema: joi.object({
                    email: joi.string().required(),
                    message: joi.string().required()
                }).required(),
                failAction: 'log'
            }
        }
    },
    {
        method: 'POST', path: '/face-api-register', handler: faceApiJsService.register,
        options: {
            validate: {
                payload: joi.object({
                    email: joi.string().email().required(),
                    imageElement: joi.object().required()
                }).required()
            },
            response: {
                schema: joi.object({
                    email: joi.string().email().required(),
                    message: joi.string().required()
                }).required(),
                failAction: 'log'
            }
        }
    }
];

module.exports = routes;
