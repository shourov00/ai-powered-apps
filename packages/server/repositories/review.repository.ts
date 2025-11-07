import { PrismaClient, type Review } from '../generated/prisma/client.ts'

export const reviewRepository = {
  getReviews(productId: number): Promise<Review[]> {
    const prisma = new PrismaClient()

    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    })
  },
}
