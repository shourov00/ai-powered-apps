import type { Request, Response } from 'express'
import express from 'express'
import { chatController } from './controllers/chat.controller.ts'
import { reviewController } from './controllers/review.controller.ts'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!')
})

router.get('/api/hello', (req: Request, res: Response) => {
  res.send({ message: 'Hello from the server!' })
})

router.post('/api/chat', chatController.sendMessage)

router.get('/api/products/:id/reviews', reviewController.getReviews)

router.post(
  '/api/products/:id/reviews/summarize',
  reviewController.summarizeReviews
)

export default router
