import {
  PurchaserOrder,
  PurchaseOrderInput,
  PurchaseOrderOutput,
} from "@Models";
import type { PurchaseOrderFilters } from "@Utils/Types";
import { ENUMS } from "@Utils";

/**
 * To create purchase order
 */
const createPurchaseOrder = async (
  payload: PurchaseOrderInput
): Promise<PurchaseOrderOutput> => {
  const createOrder = await PurchaserOrder.create(payload);
  return createOrder;
};

/**
 * To update purchase order
 */
const updatePurchaseOrder = async (
  id: number,
  payload: PurchaseOrderInput
): Promise<PurchaseOrderOutput> => {
  const findPurchaseOrder = await PurchaserOrder.findByPk(id);
  if (!findPurchaseOrder) {
    throw new Error("Purchase order not found");
  }
  const updatePurchaseOrder = await findPurchaseOrder.update(payload);
  return updatePurchaseOrder;
};

/**
 * Get purchase order by purchase id
 */

const getPurchaseOrderById = async (
  id: number
): Promise<PurchaseOrderOutput> => {
  const findPurchaseOrder = await PurchaserOrder.findByPk(id);
  if (!findPurchaseOrder) {
    throw new Error("Purchase order not found");
  }
  return findPurchaseOrder;
};

/**
 * Delete a purchase order
 */

const deleteAPurchaseOrder = async (id: number): Promise<Boolean> => {
  const findPurchaseOrder = await PurchaserOrder.destroy({
    where: { id },
  });
  return !!findPurchaseOrder;
};

/**
 * Get All purchase order
 */

const getAllPurchaseOrder = async (
  filters?: PurchaseOrderFilters
): Promise<PurchaseOrderOutput[]> => {
  const whereClause: any = {};

  if (filters && filters.status) {
    whereClause.status = ENUMS.ORDER_TRACKING;
  }

  if (filters?.customerId) {
    whereClause.customerId;
  }
  return PurchaserOrder.findAll({
    where: whereClause,
  });
};

export {
  createPurchaseOrder,
  updatePurchaseOrder,
  getPurchaseOrderById,
  deleteAPurchaseOrder,
  getAllPurchaseOrder,
};
