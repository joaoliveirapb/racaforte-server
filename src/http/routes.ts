import type { FastifyInstance } from 'fastify'
import { createCarSchema } from '../schemas/create-car.schema'
import { createCarController } from './controllers/create-car.controller'
import { identifyPartController } from './controllers/identify-part.controller'
import { ensureFileUploaded } from './middlewares/ensure-file-uploaded.middleware'
import { validateFileMimetype } from './middlewares/validate-file-mimetype.middleware'

export async function appRoutes(app: FastifyInstance) {
  app.post(
    '/part/identify',
    { preHandler: [ensureFileUploaded, validateFileMimetype] },
    identifyPartController
  )

  app.post(
    '/car',
    {
      schema: {
        body: createCarSchema,
      },
    },
    createCarController
  )
}
