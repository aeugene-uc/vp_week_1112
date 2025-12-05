
import { Request, Response, NextFunction } from "express";

import { OrderService } from "../services/order-service";

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (err) { next(err) }
  }

  static async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.getOrderById(Number(req.params.id));
      res.status(200).json(order);
    } catch (err) { next(err) }
  }

  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, restaurantId } = req.query;

      const orders = await OrderService.getOrders({
        customerId: customerId ? Number(customerId) : undefined,
        restaurantId: restaurantId ? Number(restaurantId) : undefined,
      });

      res.status(200).json(orders);
    } catch (err) { next(err); }
  }
}