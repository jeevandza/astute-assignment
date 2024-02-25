import { Router, Request, Response } from "express";
import { PurchaseOrderControl, CustomerControl } from "@PGQuery";
import { Customer, User, PurchaserOrder } from "@Models";
import { ENUMS } from "@Utils";

const purchaseOrderRoute = () => {
  const router = Router();

  /**
   * Create purchase order and create customer if the customer is not added Note user is added to customer table only if he places any oder
   */
  router.post("/purchaseOrder", async (req: Request, res: Response) => {
    const { userId, address, ...payload } = req.body;

    const customer = await findOrCreateCustomer(userId);

    console.log(customer.id, "customer");

    const purchaseOrder = await PurchaseOrderControl.createPurchaseOrder({
      customerId: customer.id,
      ...payload,
    });

    console.log

    const purchaseOrderId =   purchaseOrder.id;

    console.log(purchaseOrderId, "purchaseOrderId");

    await CustomerControl.updateCustomer(customer.id, {
      userId,
      address,
      purchaseOrderId,
    });

    res.send({ status: 200, message: "Purchase order created successfully" });
    return res.send({
      status: 500,
      message: "Failed to create purchase order",
    });
  });

  async function findOrCreateCustomer(userId: number) {
    const customer = await Customer.findOne({ where: { userId } });

    if (!customer) {
      const user = await User.findByPk(Number(userId));

      if (user) {
        const customer = await CustomerControl.createCustomer({
          userId,
        });
        return customer;
      } else {
        throw new Error("Failed to create customer");
      }
    }

    return customer;
  }

  /**
   * Update purchase order
   */

  router.put("/purchaseOrder/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const findAndUpdatePurchaseOrder =
      await PurchaseOrderControl.updatePurchaseOrder(Number(id), req.body);

    if (!findAndUpdatePurchaseOrder) {
      return res.send({ status: 400, message: "Purchase order not found" });
    } else {
      return res.send({ status: 200, message: "Purchase order updated" });
    }
  });

  /**
   * To get purchase order list
   */
  router.get("/purchaseOrders", async (req: Request, res: Response) => {
    const purchaseOrderList = await PurchaseOrderControl.getAllPurchaseOrder();
    if (!!purchaseOrderList) {
      return res.send({
        status: 200,
        message: "List of users",
        data: purchaseOrderList,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To get purchase order  on the id
   */
  router.get("/purchaseOrder/:id", async (req: Request, res: Response) => {
    const purchaserOrderId = req.params.id;
    const orderById = await PurchaseOrderControl.getPurchaseOrderById(
      Number(purchaserOrderId)
    );
    if (!!orderById) {
      return res.send({
        status: 200,
        message: "Fetch successful",
        data: orderById,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To delete a purchase order on id
   */
  router.delete("/purchaseOrder/:id", async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const purchaseOrder = await PurchaseOrderControl.deleteAPurchaseOrder(
      Number(orderId)
    );
    if (!!purchaseOrder) {
      return res.send({
        status: 200,
        message: "Purchase order  deleted successful",
      });
    } else {
      return res.send({
        status: 400,
        message: "Purchase order not found",
      });
    }
  });

  return router;
};

export { purchaseOrderRoute };
