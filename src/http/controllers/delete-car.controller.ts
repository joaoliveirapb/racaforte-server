import { UseCaseFactory } from '@/factories/use-case.factory'
import type { DeleteCarSchema } from '@/schemas/delete-car.schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteCarController(
  request: FastifyRequest<{ Params: DeleteCarSchema }>,
  reply: FastifyReply
) {
  const { id } = request.params

  try {
    const deleteCarUseCase = UseCaseFactory.makeDeleteCarUseCase()

    await deleteCarUseCase.execute(id)

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message })
    }

    return reply.status(500).send({ error: 'Falha ao deletar um veículo' })
  }
}
