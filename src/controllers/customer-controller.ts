import { Request, Response, NextFunction } from "express";

import { CustomerService } from "../services/customer-service";

export class CustomerController {
  static async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (err) { next(err) }
  }

  static async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await CustomerService.getAllCustomers();
      res.status(200).json(customers);
    } catch (err) { next(err) }
  }

  static async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.getCustomerById(Number(req.params.id));
      res.status(200).json(customer);
    } catch (err) { next(err) }
  }

  static async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.updateCustomer(Number(req.params.id), req.body);
      res.status(200).json(customer);
    } catch (err) { next(err) } 
  }

  static async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.deleteCustomer(Number(req.params.id));
      res.status(200).json(customer);
    } catch (err) { next(err) }
  }
}