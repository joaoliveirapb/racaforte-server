import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import { appRoutes } from './routes'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 52428800, // 50MB
    files: 5,
  },
})

app.register(appRoutes)

app.get('/health', (_request, reply) => {
  return reply.status(200).send({ message: 'Ok' })
})

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
