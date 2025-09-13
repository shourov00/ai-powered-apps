import type { Request, Response } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import openai from 'openai'
import z from 'zod'

dotenv.config()

const client = new openai({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!')
})

const conversations = new Map<string, string>()

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required.')
    .max(1000, 'Prompt is too long (max 1000 characters).'),
  conversationId: z.string().uuid(),
})

app.post('/api/chat', async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.format() })
    return
  }

  try {
    const { prompt, conversationId } = req.body
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversations.get(conversationId),
    })

    conversations.set(conversationId, response.id)

    res.json({ message: response.output_text })
  } catch (e) {
    res.status(500).json({ error: 'Failed to generate a response.' })
  }
})

app.get('/api/hello', (req: Request, res: Response) => {
  res.send({ message: 'Hello from the server!' })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
