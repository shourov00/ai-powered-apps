import { defineConfig, env } from 'prisma/config'
import { config as loadEnv } from 'dotenv'

// Ensure Prisma CLI loads variables from the local .env file when running via bunx
loadEnv({ path: '.env' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
