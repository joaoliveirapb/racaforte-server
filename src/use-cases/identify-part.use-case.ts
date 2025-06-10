import type { MultipartFile } from '@fastify/multipart'
import type { AIService } from '../services/ai.service'

export interface Image {
  type: 'input_image'
  image_url: string
  detail: 'auto' | 'high' | 'low'
}

interface IdentifyPartUseCaseResponse {
  name: string
  description: string
}

export class IdentifyPartUseCase {
  constructor(private aiService: AIService) {}

  async execute(
    files: AsyncIterableIterator<MultipartFile>
  ): Promise<IdentifyPartUseCaseResponse> {
    const images: Image[] = []

    for await (const file of files) {
      // console.log('[Use Case]:', file)
      const mimetype = file.mimetype
      const buffer = await file.toBuffer()
      const base64 = buffer.toString('base64')

      images.push({
        type: 'input_image',
        image_url: `data:${mimetype};base64,${base64}`,
        detail: 'high',
      })
    }

    const { name, description } = await this.aiService.identifyPart(images)

    return { name, description }
  }
}
