import { prisma } from "../utils/database-util";
import { Prisma } from '../../generated/prisma';
import { CreateRestaurantSchema, UpdateRestaurantSchema, RestaurantIdSchema, RestaurantStatusSchema } from "../validations/restaurant-validation";
import { RestaurantCreateRequest, RestaurantUpdateRequest } from "../models/restaurant-model";
import { Restaurant } from '../../generated/prisma/client';
import { ResponseError } from "../errors/response-error";

export class RestaurantService {
  static async createRestaurant(reqBody: RestaurantCreateRequest) {
    const data = CreateRestaurantSchema.parse(reqBody || {});
    return await prisma.restaurant.create({ data }) as Restaurant;
  }

  static async getRestaurants(status: string) {
    if (typeof status !== "string") {
      return await prisma.restaurant.findMany() as Restaurant[];
    }
    
    status = RestaurantStatusSchema.parse(status);
    return await prisma.restaurant.findMany({ where: { isOpen: status.toLowerCase().trim() === 'opened' }}) as Restaurant[];
  }

  static async getRestaurantById(id: number) {
    id = RestaurantIdSchema.parse(id);
    const restaurant = await prisma.restaurant.findUnique({ where: { id } }) as Restaurant;

    if (!restaurant) {
      throw new ResponseError(404, 'Resource not found.');
    }

    return restaurant;
  }

  static async updateRestaurant(id: number, reqBody: RestaurantUpdateRequest) {
    id = RestaurantIdSchema.parse(id);
    const data = UpdateRestaurantSchema.parse(reqBody || {});
    return await prisma.restaurant.update({ where: { id }, data }) as Restaurant;
  }

  static async deleteRestaurant(id: number) {
    try {
      id = RestaurantIdSchema.parse(id);
      return await prisma.restaurant.delete({ where: { id } }) as Restaurant;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new ResponseError(409, "Cannot delete restaurant because order records exist");
      }
      throw err;
    }
  }
}