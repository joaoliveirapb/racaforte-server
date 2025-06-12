import { UseCaseFactory } from '@/factories/use-case.factory'
import type { CreateCarSchema } from '@/schemas/create-car.schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createCarController(
  request: FastifyRequest<{ Body: CreateCarSchema }>,
  reply: FastifyReply
) {
  const { brand, model, year, color } = request.body

  try {
    const createCarUseCase = UseCaseFactory.makeCreateCarUseCase()

    const { car } = await createCarUseCase.execute({
      brand,
      model,
      year,
      color,
    })

    return reply.status(201).send({
      car: {
        ...car,
        created_at: undefined,
        updated_at: undefined,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message })
    }

    return reply.status(500).send({ error: 'Falha ao criar um veículo' })
  }
}
