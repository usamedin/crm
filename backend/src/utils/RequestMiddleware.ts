import { Request, Response } from "express";
import { ErrorResponse } from "./ResponseCodes";
import { PrismaClient } from "../db/generated/client";
import { HandlerType } from "../types/Handler";

const prisma = new PrismaClient()

export async function handlerMiddleware(
  handler: HandlerType,
  request: Request,
  response: Response
) {
  try {
    console.log('\nHandler Request:', request.path, request.body)
    let context: any = { prisma }
    const result = await handler(stripRequest(request), context)
    console.log('Handler Response:', result)

    response.send(result)
  } catch (error: any) {
    console.log('Error in HandlerMiddleware', error)

    if (error.statusCode) {
      response.status(error.statusCode).send(error)
    } else {
      const { statusCode, message } = ErrorResponse.INTERNAL_SERVER_ERROR
      response.status(statusCode).send({ message, statusCode })
    }
  }
}

function stripRequest(request: Request) {
  return {
    body: request.body,
    query: request.query,
    headers: request.headers,
    params: request.params,
    userId: (request as any).decodedToken?.userId,
  }
}
