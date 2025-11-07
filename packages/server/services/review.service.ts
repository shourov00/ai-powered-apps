import { type Review } from '../generated/prisma/client.ts'
import { reviewRepository } from '../repositories/review.repository.ts'

export const reviewService = {
  getReviews(productId: number): Promise<Review[]> {
    return reviewRepository.getReviews(productId)
  },
}
