import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/restaurant-service";

export class RestaurantController {
  static async createRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await RestaurantService.createRestaurant(req.body);
      res.status(201).json(restaurant);
    } catch (err) { next(err) }
  }

  static async getRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurants = await RestaurantService.getRestaurants(req.query.status);
      res.status(200).json(restaurants);
    } catch (err) { next(err) }
  }

  static async getRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await RestaurantService.getRestaurantById(Number(req.params.id));
      res.status(200).json(restaurant);
    } catch (err) { next(err) }
  }

  static async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await RestaurantService.updateRestaurant(Number(req.params.id), req.body);
      res.status(200).json(restaurant);
    } catch (err) { next(err) }
  }

  static async deleteRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await RestaurantService.deleteRestaurant(Number(req.params.id));
      res.status(200).json(restaurant);
    } catch (err) { next(err) }
  }
}