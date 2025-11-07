import { type Review } from '../generated/prisma/client.ts'
import { reviewRepository } from '../repositories/review.repository.ts'
import { llmClient } from '../llm/client.ts'

export const reviewService = {
  getReviews(productId: number): Promise<Review[]> {
    return reviewRepository.getReviews(productId)
  },

  async summarizeReviews(productId: number): Promise<string> {
    // Get the last 10 reviews
    // Send the reviews to a LLM for summarization
    const reviews = await reviewRepository.getReviews(productId, 10)
    const joinedReviews = reviews.map((r) => r.content).join('\n\n')
    const prompt = `
      Summarize the following product reviews into a short paragraph highlighting key themes, both positive and negative:
      
      ${joinedReviews}
    `
    const response = await llmClient.generateText({ prompt })
    return response.text
  },
}
