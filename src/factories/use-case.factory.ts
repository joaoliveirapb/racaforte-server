import { openai } from '../lib/openai'
import { PrismaCarsRepository } from '../repositories/prisma/prisma-cars.repository'
import { AIService } from '../services/ai.service'
import { CreateCarUseCase } from '../use-cases/create-car.use-case'
import { IdentifyPartUseCase } from '../use-cases/identify-part.use-case'

export class UseCaseFactory {
  static makeIdentifyPartUseCase(): IdentifyPartUseCase {
    const aiService = new AIService(openai)

    const identifyPartUseCase = new IdentifyPartUseCase(aiService)

    return identifyPartUseCase
  }

  static makeCreateCarUseCase(): CreateCarUseCase {
    const carsRepository = new PrismaCarsRepository()

    const createCarUseCase = new CreateCarUseCase(carsRepository)

    return createCarUseCase
  }
}
