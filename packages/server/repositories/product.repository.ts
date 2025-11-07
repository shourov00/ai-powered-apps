import { PrismaClient } from '../generated/prisma/client.ts'

const prisma = new PrismaClient()

export const productRepository = {
  getProduct(productId: number) {
    return prisma.product.findUnique({ where: { id: productId } })
  },
}
