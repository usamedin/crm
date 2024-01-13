import { Request, Response, Express } from 'express';
import { handlerMiddleware } from "../utils/RequestMiddleware";
import { getCustomerOrders } from './customerOrders';

export default function addEndpoints(app: Express) {
  app.get('/api/orders/:customerId', (request: Request, response: Response) => handlerMiddleware(getCustomerOrders, request, response))

}
