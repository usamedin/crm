import { Request, Response, Express } from 'express';
import { handlerMiddleware } from "../utils/RequestMiddleware";
import { getCustomerOrders } from './customerOrders';
import { getAllOrders } from './getAllOrders';

export default function addEndpoints(app: Express) {
  app.get('/api/orders/:customerId', (request: Request, response: Response) =>
    handlerMiddleware(getCustomerOrders, request, response))
    
  app.get('/api/orders', (request: Request, response: Response) =>
    handlerMiddleware(getAllOrders, request, response))
}
