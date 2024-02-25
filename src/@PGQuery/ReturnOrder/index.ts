import {
  ReturnedOrder,
  ReturnedOrdersInput,
  ReturnedOrderOutput,
  PurchaserOrder,
} from "@Models";

/**
 * Create new return order
 */
const createReturnOrder = async (
  payload: ReturnedOrdersInput
): Promise<ReturnedOrder> => {
  const newReturnOrder = await ReturnedOrder.create(payload);
  return newReturnOrder;
};

/**
 * Update return order based on the id
 */

const updateReturnOrder = async (
  id: number,
  payload: ReturnedOrdersInput
): Promise<ReturnedOrder> => {
  const findReturnOrder = await ReturnedOrder.findByPk(id);
  if (!findReturnOrder) {
    throw new Error("Invalid return order");
  }
  const returnOrder = await findReturnOrder.update(payload);
  return returnOrder;
};

/**
 * Get return order by Id
 */

const getReturnOrderById = async (id: number): Promise<ReturnedOrder> => {
  const returnOrder = await ReturnedOrder.findByPk(id);
  if (!returnOrder) {
    throw new Error("User not found");
  }
  return returnOrder;
};

/**
 * Delete return order by id
 */

const deleteReturnOrderById = async (id: number): Promise<boolean> => {
  const deleteUser = await ReturnedOrder.destroy({
    where: { id },
  });
  return !!deleteUser;
};

/**
 * To get all the list of return orders along
 */
const getAllReturnOrders = async (): Promise<ReturnedOrder[]> => {
  const whereClause: any = {};
  return ReturnedOrder.findAll({
    where: whereClause,
  });
};

export {
  createReturnOrder,
  updateReturnOrder,
  getAllReturnOrders,
  getReturnOrderById,
  deleteReturnOrderById,
};
