import type { FastifyReply, FastifyRequest } from 'fastify'
import { UseCaseFactory } from '../../factories/use-case.factory'

export async function identifyPartController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const files = request.files()

  try {
    const identifyPartUseCase = UseCaseFactory.makeIdentifyPartUseCase()

    const { name, description } = await identifyPartUseCase.execute(files)

    return reply.status(200).send({ name, description })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message })
    }

    return reply.status(500).send({ error: 'Falha ao identificar a peça' })
  }
}
