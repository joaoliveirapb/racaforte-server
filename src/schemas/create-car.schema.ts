import { z } from 'zod'

export const createCarSchema = z.object({
  brand: z.string().min(1, 'Marca é necessário'),
  model: z.string().min(1, 'Modelo é necessário'),
  year: z.coerce.number(),
  color: z.string().min(1, 'Cor é necessário'),
})

export type CreateCarSchema = z.infer<typeof createCarSchema>
