const ediService = require('./service');
routes = [
    {
        method: 'GET', path: '/',
        handler: (req, res) => {
            return 'Facial login service is up and running.';
        }
    },
    { method: 'POST', path: '/register', handler: ediService.register },
    { method: 'POST', path: '/login', handler: ediService.login }
];

module.exports = routes;