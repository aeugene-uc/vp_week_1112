import express from 'express';
import { CustomerController } from '../controllers/customer-controller';
import { RestaurantController } from '../controllers/restaurant-controller';
import { routeNotFound } from '../utils/route-util';
import { OrderController } from '../controllers/order-controller';

export const router = express.Router();

// Customer
router.post('/customer', CustomerController.createCustomer);
router.get('/customer', CustomerController.getCustomers);
router.get('/customer/:id', CustomerController.getCustomerById);
router.put('/customer/:id', CustomerController.updateCustomer);
router.delete('/customer/:id', CustomerController.deleteCustomer);

// Restaurant
router.post('/restaurant', RestaurantController.createRestaurant);
router.get('/restaurant', RestaurantController.getRestaurants);
router.get('/restaurant/:id', RestaurantController.getRestaurantById);
router.put('/restaurant/:id', RestaurantController.updateRestaurant);
router.delete('/restaurant/:id', RestaurantController.deleteRestaurant);

// Orders
router.post('/order', OrderController.createOrder);
router.get('/order', OrderController.getOrders);
router.get('/order/:id', OrderController.getOrderById);

router.use(routeNotFound);
