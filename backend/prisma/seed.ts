import fs from 'fs'
import { PrismaClient } from '../src/db/generated/client';

const prisma = new PrismaClient();
const uniqueProductIds: number[] = []
const uniqueCustomerIds: number[] = []

const seed = async () => {
  const data = fs.readFileSync('./prisma/homework_order_lines.csv', 'utf8')
  const lines = data.split('\n')
  const headers = lines[0].split(',')

  for (const line of lines.splice(1)) {
    const properties = line.split(',')

    addProduct(properties, headers)
    addCustomer(properties, headers)
  }

  console.log(uniqueProductIds)
  process.exit();
}

function addProduct(properties: string[], headers: string[]) {
  const idIndex = headers.indexOf('Product ID')
  const nameIndex = headers.indexOf('Product Name')
  const totalPriceIndex = headers.indexOf('Total Price')
  const quantityIndex = headers.indexOf('Quantity')

  const id = parseInt(properties[idIndex])
  const name = properties[nameIndex]?.trim()
  const totalPrice = parseFloat(properties[totalPriceIndex])
  const quantity = parseInt(properties[quantityIndex])

  if (id && !uniqueProductIds.includes(id)) {
    uniqueProductIds.push(id)

    return prisma.product.create({
      data: { id, name, price: totalPrice / quantity }
    })
  }
}

function addCustomer(properties: string[], headers: string[]) {
  const idIndex = headers.indexOf('Customer ID')
  const nameIndex = headers.indexOf('Customer Name')

  const id = parseInt(properties[idIndex])
  const name = properties[nameIndex]?.trim()

  if (id && !uniqueCustomerIds.includes(id)) {
    uniqueCustomerIds.push(id)

    return prisma.customer.create({
      data: { id, name }
    })
  }
}

seed();
