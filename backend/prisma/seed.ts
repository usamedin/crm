import fs from 'fs'
import { PrismaClient } from '../src/db/generated/client';

const prisma = new PrismaClient();
const uniqueProductIds: number[] = []

const seed = async () => {
  const data = fs.readFileSync('./prisma/homework_order_lines.csv', 'utf8')
  const lines = data.split('\n')
  const headers = lines[0].split(',')

  for (const line of lines.splice(1)) {
    const properties = line.split(',')

    addProduct(properties, headers)
  }

  console.log(uniqueProductIds)
  process.exit();
}

function addProduct(properties: string[], headers: string[]) {
  const productIdIndex = headers.indexOf('Product ID')
  const productNameIndex = headers.indexOf('Product Name')

  const productId = parseInt(properties[productIdIndex])
  const productName = properties[productNameIndex]

  if (productId && !uniqueProductIds.includes(productId)) {
    uniqueProductIds.push(productId)

    return prisma.product.create({
      data: {
        id: productId,
        name: productName
      }
    })
  }
}

seed();
