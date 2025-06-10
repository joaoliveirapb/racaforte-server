import type OpenAI from 'openai'
import type { Image } from '../use-cases/identify-part.use-case'

interface IdentifyPartResponse {
  name: string
  description: string
}

export class AIService {
  constructor(private ai: OpenAI) {}

  async identifyPart(images: Image[]): Promise<IdentifyPartResponse> {
    const response = await this.ai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
                Identifique a peça de carro na imagem e forneça seu nome e uma descrição detalhada.
                Liste as informações no formato JSON:
                {
                  "name": "nome",
                  "description": "descrição"
                }
              `,
            },
            ...images,
          ],
        },
      ],
    })

    const { name, description } = JSON.parse(response.output_text)

    return { name, description }
  }
}
