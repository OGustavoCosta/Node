/* Server feit com node.js nativo */

/* import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.write('Hello Server');

    return response.end();
});

server.listen('3333'); */

/* ========================================================== */
/* Server Utilizando o frameWork Fastify */

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
/* const database = new DatabaseMemory */
const database = new DatabasePostgres

server.post('/videos', async (request, reply)=> {
    /* Create */
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    console.log('Lista de Dados')
    console.log(database.list())

    return reply.status(201).send()
})

server.get('/videos', async (request)=> {
    const search = request.query.search
    const videos = await database.list(search)

    console.log(search)
    console.log(videos)

    return videos
})

server.put('/videos/:id', async (request, reply)=> {
    const videoID = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoID, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply)=> {
    const  videoID = request.params.id

    await database.delete(videoID)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})