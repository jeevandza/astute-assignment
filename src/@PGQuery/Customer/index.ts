import { Op } from "sequelize";
import { Customer, CustomerInput, CustomerOutput } from "@Models";

/**
 * Create customer from user id this customer is created whenever user places and order
 */
const createCustomer = async (
  payload: CustomerInput
): Promise<CustomerOutput> => {
  const newCustomer = await Customer.create(payload);
  return newCustomer;
};

/**
 * Update customer by id
 */
const updateCustomer = async (
  id: number,
  payload: CustomerInput
): Promise<CustomerOutput> => {
  const findCustomer = await Customer.findByPk(id);
  if (!findCustomer) {
    throw new Error("Id not found");
  }
  const updateCustomer = await (findCustomer as Customer).update(payload);
  return updateCustomer;
};

/**
 * Customer by id
 */

const getCustomerByID = async (id: number): Promise<CustomerOutput> => {
  const findCustomer = await Customer.findByPk(id);
  if (!findCustomer) {
    throw new Error("Customer not found");
  }
  return findCustomer;
};

/**
 * List all customers
 */
const getAllCustomers = async (): Promise<CustomerOutput[]> => {
  return await Customer.findAll({
    where: {},
  });
};

export { createCustomer, updateCustomer, getCustomerByID, getAllCustomers };
