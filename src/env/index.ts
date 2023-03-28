import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['develop', 'test', 'prod']).default('develop'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Variaveis de ambiente invalidas! ', _env.error.format())

  throw new Error('Variaveis de ambiente invalidas!')
}

export const env = _env.data
