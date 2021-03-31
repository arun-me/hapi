'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
    // When creating a server, you can provide a hostname, IP address, a Unix socket file, or Windows named pipe to bind the server to
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
        // The host property set to localhost is likely the safest choice. In a docker container, however, the localhost may not be accessible outside of the container and using host: '0.0.0.0' may be needed.
    });

    // server.ext('onRequest', function (request, h) {
    //     // What this function will do is reroute all requests to the '/test' route.
    //     request.setUrl('/test');
    //     return h.continue;
    // });
   
    // onRequest, onPreAuth, onCredentials, onPostAuth, onPreHandler, onPostHandler, and onPreResponse.

    // cookie-parser  //To use cookies in hapi, you first configure the cookie with 
    // server.state('data', {
    //     ttl: null,  
    //     isSecure: true,
    //     isHttpOnly: true
    // });


    // server.route({METHOD, PATH, HANDLER})
    server.route({
        method: 'GET', 
        // method: '*'.              // all methods
        //  method: ['PUT', 'POST'],
        //  path: '/hello/{name}', // '/hello/{name?}'
        path: '/test',
        handler: (request, h) => {
            const email = request.payload.email;
            const name = request.params.name; //request.query.
            h.state('data', 'tom');
            // return h.response(request.state.data);
        // return 'Hello ' + name +email;
        return h.redirect('/');
        // hapi has the functionality to respond with JSON data by default
        },
    });
    server.route({
        method: 'GET', 
        path: '/',
        handler: (request, h) => {
        return "fff"
        }
    });
    // server.route({
    //     method: 'GET', 
    //     path: '/test',
    //     handler: (request, h) => {
    //     return "test"
    //     }
    // });
    
    // const getDate = {
    //     name: 'getDate',
    //     version: '1.0.0',
    //     register: async function (server, options) {
    
    //         const currentDate = function() {
    
    //             const date =  options.name +new Date();
    //             return date;
    //         };
    
    //         server.decorate('toolkit', 'getDate', currentDate);
    //     }
    // };
    // // h.getDate()
    // await server.register({  //Loading a Plugin
    //     plugin: getDate,
    //     options: {
    //         name: 'Tom'
    //     }
    // });
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();