import { prisma } from "../utils/database-util";
import { Prisma } from '../../generated/prisma';
import { Order } from '../../generated/prisma/client';
import { OrderCreateRequest } from "../models/order-model";
import { CreateOrderSchema, OrderIdSchema } from "../validations/order-validation";
import { CustomerIdSchema } from "../validations/customer-validation";
import { RestaurantIdSchema } from "../validations/restaurant-validation";
import { ResponseError } from "../errors/response-error";
import { calculateETA } from "../utils/eta-util";

export class OrderService {
  static async createOrder(reqBody: OrderCreateRequest) {
    try {
      const data = {
        ...CreateOrderSchema.parse(reqBody || {}),
        createdAt: new Date()
      }

      const order = await prisma.order.create({ data }) as Order;

      return { ...order, eta: calculateETA(order) };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const foreignModel = (err as any).meta.constraint.split('_')[1].replace('Id', '');
        throw new ResponseError(404, `${foreignModel} of ${foreignModel}Id not found.`);
      }

      throw err;
    }
  }

  static async getOrderById(orderId: number) {
    orderId = OrderIdSchema.parse(orderId);
    const order = await prisma.order.findFirst({ where: { id: orderId } });

    if (!order) {
      throw new ResponseError(404, 'Resource not found.');
    }

    return {
      ...order,
      eta: calculateETA(order)
    }
  }

  static async getOrders(filters: { customerId?: number; restaurantId?: number }) {
    try {
      let { customerId, restaurantId } = filters;

      if (customerId !== undefined) {
        customerId = CustomerIdSchema.parse(customerId);
      }

      if (restaurantId !== undefined) {
        restaurantId = RestaurantIdSchema.parse(restaurantId);
      }

      if (customerId !== undefined) {
        const customer = await prisma.customer.findUnique({
          where: { id: customerId },
          include: {
            orders: {
              where: restaurantId !== undefined ? { restaurantId } : {},
              orderBy: { createdAt: "asc" }
            }
          }
        });

        if (!customer) {
          throw new ResponseError(404, `Customer of customerId not found.`);
        }

        return customer.orders.map(order => ({
          ...order,
          eta: calculateETA(order),
        }));
      }

      if (restaurantId !== undefined) {
        const restaurant = await prisma.restaurant.findUnique({
          where: { id: restaurantId },
          include: {
            orders: {
              where: customerId !== undefined ? { customerId } : {},
              orderBy: { createdAt: "asc" }
            }
          }
        });

        if (!restaurant) {
          throw new ResponseError(404, `Restaurant of restaurantId not found.`);
        }

        return restaurant.orders.map(order => ({
          ...order,
          eta: calculateETA(order),
        }));
      }

      const restaurants = await prisma.restaurant.findMany({
        include: {
          orders: { orderBy: { createdAt: "asc" } }
        }
      });

      const allOrders = restaurants.flatMap(r => r.orders);

      return allOrders.map(order => ({
        ...order,
        eta: calculateETA(order),
      }));

    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const foreignModel = (err as any).meta.constraint.split("_")[1].replace("Id", "");
        throw new ResponseError(404, `${foreignModel} of ${foreignModel}Id not found.`);
      }
      throw err;
    }
  }
}