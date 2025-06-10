import type { FastifyInstance } from 'fastify'
import { identifyPartController } from './controllers/identify-part.controller'
import { ensureFileUploaded } from './middlewares/ensure-file-uploaded.middleware'
import { validateFileMimetype } from './middlewares/validate-file-mimetype.middleware'

export async function appRoutes(app: FastifyInstance) {
  app.post(
    '/part/identify',
    { preHandler: [ensureFileUploaded, validateFileMimetype] },
    identifyPartController
  )
}
