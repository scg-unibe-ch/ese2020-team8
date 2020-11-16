import {Server} from './server';

export const server = new Server();
server.start().catch(err => console.error(err));
