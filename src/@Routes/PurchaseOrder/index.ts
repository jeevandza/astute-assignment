import { Router, Request, Response } from "express";
import { PurchaseOrderControl } from "@PGQuery";
import { Customer, User } from "@Models";

const purchaseOrderRoute = () => {
  const router = Router();

  /**
   * Create purchase order and create customer if the customer is not added Note user is added to customer table only if he places any oder
   */
  router.post("/purchaseOrder", async (req: Request, res: Response) => {
    try {
      const { userId, ...payload } = req.body;

      const customer = await findOrCreateCustomer(userId);
      const purchaseOrder = await PurchaseOrderControl.createPurchaseOrder(
        payload
      );

      await Customer.update(
        { purchaseOrderId: Number(purchaseOrder.id) },
        {
          where: { id: customer.id },
        }
      );

      res.status(201).json({ message: "Purchase order created successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create purchase order" });
    }
  });

  async function findOrCreateCustomer(userId: string): Promise<Customer> {
    const customer = await Customer.findOne({ where: { id: userId } });
    if (!customer) {
      const user = await User.findByPk(userId);
      return await Customer.create(user!);
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
  router.get("/user/:id", async (req: Request, res: Response) => {
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
  router.delete("/user/:id", async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const purchaseOrder = await PurchaseOrderControl.deleteAPurchaseOrder(
      Number(orderId)
    );
    if (!!purchaseOrder) {
      return res.send({
        status: 200,
        message: "User delete successful",
      });
    } else {
      return res.send({
        status: 400,
        message: "User not found",
      });
    }
  });

  return router;
};

export { purchaseOrderRoute };
