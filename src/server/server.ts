import * as Hapi from 'hapi';

const server = new Hapi.Server();

server.connection({ port: 3000 });

server.register([], (error: any) => {
    if (error) {
        throw error;
    }

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
            reply('Hello World');
        }
    });

    server.start((error: any) => {
        if (error) {
            console.error(error);
            process.exit();
        } else {
            console.log(`Started server at http:/localhost:3000`);
        }
    });
});