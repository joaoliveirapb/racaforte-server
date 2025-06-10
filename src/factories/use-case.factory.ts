import { openai } from '../lib/openai'
import { AIService } from '../services/ai.service'
import { IdentifyPartUseCase } from '../use-cases/identify-part.use-case'

export class UseCaseFactory {
  static makeIdentifyPartUseCase(): IdentifyPartUseCase {
    const aiService = new AIService(openai)

    const identifyPartUseCase = new IdentifyPartUseCase(aiService)

    return identifyPartUseCase
  }
}
