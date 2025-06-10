import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string(),
  HETZNER_S3_ACCESS_KEY: z.string(),
  HETZNER_S3_SECRET_KEY: z.string(),
  HETZNER_S3_ENDPOINT: z.string(),
  HETZNER_S3_BUCKET: z.string(),
  REMOVEBG_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
