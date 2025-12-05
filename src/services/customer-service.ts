import { prisma } from "../utils/database-util";
import { Prisma } from '../../generated/prisma';
import { CreateCustomerSchema, UpdateCustomerSchema, CustomerIdSchema } from "../validations/customer-validation";
import { CustomerCreateRequest, CustomerUpdateRequest } from "../models/customer-model";
import { Customer } from '../../generated/prisma/client';
import { ResponseError } from "../errors/response-error";

export class CustomerService {
  static async createCustomer(reqBody: CustomerCreateRequest) {
    const data = CreateCustomerSchema.parse(reqBody || {});
    return await prisma.customer.create({ data }) as Customer;
  }

  static async getAllCustomers() {
    return await prisma.customer.findMany() as Customer[];
  }

  static async getCustomerById(id: number) {
    id = CustomerIdSchema.parse(id);
    const customer = await prisma.customer.findUnique({ where: { id } }) as Customer;

    if (!customer) {
      throw new ResponseError(404, 'Resource not found.');
    }

    return customer;
  }

  static async updateCustomer(id: number, reqBody: CustomerUpdateRequest) {
    id = CustomerIdSchema.parse(id);
    const data = UpdateCustomerSchema.parse(reqBody || {});
    return await prisma.customer.update({ where: { id }, data }) as Customer;
  }

  static async deleteCustomer(id: number) {
    try {
      id = CustomerIdSchema.parse(id);
      return await prisma.customer.delete({ where: { id } }) as Customer;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new ResponseError(409, "Cannot delete customer because order records exist");
      }

      throw err;
    }
  }
}