import fs from 'fs'
import { PrismaClient } from '../src/db/generated/client';

const prisma = new PrismaClient();

const seed = async () => {
  const data = fs.readFileSync('./prisma/homework_order_lines.csv', 'utf8')
  const lines = data.split('\n')
  const headers = lines[0].split(',')

  for (const line of lines.splice(1)) {
    const properties = line.split(',')

    const productIdIndex = headers.indexOf('Product ID')
    const productNameIndex = headers.indexOf('Product Name')
    const totalPriceIndex = headers.indexOf('Total Price')
    const quantityIndex = headers.indexOf('Quantity')

    const customerIdIndex = headers.indexOf('Customer ID')
    const customerNameIndex = headers.indexOf('Customer Name')

    const orderIdIndex = headers.indexOf('Order ID')
    const dateIndex = headers.indexOf('Date')

    const orderId = parseInt(properties[orderIdIndex])
    const date = new Date(properties[dateIndex])

    const productId = parseInt(properties[productIdIndex])
    const productName = properties[productNameIndex]?.trim()
    const totalPrice = parseFloat(properties[totalPriceIndex])
    const quantity = parseInt(properties[quantityIndex])
    const customerId = properties[customerIdIndex]
    const customerName = properties[customerNameIndex]?.trim()

    await addProduct(productId, productName, totalPrice, quantity)
    await addCustomer(customerId, customerName)
    await addOrders(orderId, customerId, productId, quantity, totalPrice, date)
  }

  process.exit();
}

async function addProduct(id: number, name: string, totalPrice: number, quantity: number) {
  if (id) {
    try {
      await prisma.product.create({
        data: { id, name, price: totalPrice / quantity }
      })
    } catch (err) { }
  }
}

async function addCustomer(id: string, name: string) {
  try {
    if (id) {
      // console.log('customer', { id, name })
      await prisma.customer.create({
        data: { id, name }
      })
    }
  } catch (err) {
    // console.log('FAILED', { id, name }, err)
  }
}

async function addOrders(id: number, customerId: string, productId: number, quantity: number, totalPrice: number, date: Date) {
  try {
    if (id) {
      await prisma.order.create({
        data: { id, customerId, productId, quantity, totalPrice, date }
      })
    }
  } catch (err) { }
}

seed();
