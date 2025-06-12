import { z } from 'zod'

export const deleteCarSchema = z.object({
  id: z.string().min(1, 'Id é necessário'),
})

export type DeleteCarSchema = z.infer<typeof deleteCarSchema>
