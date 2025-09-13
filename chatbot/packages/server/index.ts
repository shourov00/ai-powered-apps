import type { Request, Response } from 'express'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!')
})

app.get('/api/hello', (req: Request, res: Response) => {
  res.send({ message: 'Hello from the server!' })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
