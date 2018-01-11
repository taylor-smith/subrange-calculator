import * as Hapi from 'hapi';
import * as inert from 'inert';

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 5000});

server.register([
    {
        register: inert,
        options: {}
    }
], (error: any) => {
    if (error) {
        throw error;
    }
    
    server.route({
        method: 'GET',
        path: '/static/{path*}',
        config: {
            auth: false
        },
        handler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
            reply.file(`private/${request.params.path}`);
        }
    });

    server.route({
        method: 'GET',
        path: '/{path*}',
        config: {
            auth: false
        },
        handler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
            reply.file('./index.html');
        }
    });

    server.start((error: any) => {
        if (error) {
            console.error(error);
            process.exit();
        } else {
            console.log(`Started server`);
        }
    });
});