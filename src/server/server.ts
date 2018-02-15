import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as inert from 'inert';
import { calculateSubranges } from './utils/calculateSubranges';

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 5000 });

server.register(
    [
        {
            register: inert,
            options: {}
        }
    ],
    (error: any) => {
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
            method: 'POST',
            path: '/api/submitFile',
            config: {
                payload: {
                    maxBytes: 999999999999999
                },
                validate: {
                    payload: {
                        values: Joi.string()
                    }
                }
            },
            handler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
                const arr = request.payload.values.split('\n');
                const params = arr[0].split(' ').map((v: string) => +v);
                const data = arr[1].split(' ').map((v: string) => +v);
                const retVal = calculateSubranges(params, data);
                reply({ retVal: retVal });
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
    }
);
