'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const config = require('config');
const mongoose = require('mongoose');

const init = () => {
    const connectionString = 'mongodb://' + config.get('database.host') + ':' + config.get('database.port') + '/' + config.get('database.name');
    mongoose.connect(connectionString).then(async () => {
        console.log(config.get('database.name') + ' DB Connected', 'Status: ' + mongoose.connection.readyState);

        const server = Hapi.server(config.get('service'));
        server.route(routes);
        await server.start();
        console.log('Server running on', server.info.uri);

    }).catch(err => console.log(err));
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();