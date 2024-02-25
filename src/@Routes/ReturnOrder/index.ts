import { Router, Response, Request } from "express";
import { PurchaseOrderControl, ReturnOrderControl } from "@PGQuery";
import { PurchaserOrder } from "@Models";
import { ENUMS } from "@Utils";
import { PurchaseOrderT } from "@Utils/Types";

const returnOrderRoute = () => {
  const router = Router();

  /**
   * Create return order request
   */
  router.post("/returnOrder", async (req: Request, res: Response) => {
    const { orderId } = req.body;
    const findPurchaseOrder = await PurchaserOrder.findByPk(orderId);
    const createNewReturn = await ReturnOrderControl.createReturnOrder(req.body);
    if (!createNewReturn) {
      return res.send({
        status: 400,
        message: "Invalid return request",
      });
    }

    const update = {
      ...findPurchaseOrder,
      status: ENUMS.ORDER_TRACKING.RETURNED,
    };

    const updatePurchaseOrder = await PurchaseOrderControl?.updatePurchaseOrder(
      orderId,
      update as PurchaseOrderT
    );
    return res.send({
      status: 200,
      message: "Your return order confirmed",
      purchaseOrder: updatePurchaseOrder,
      returnOrder: createNewReturn,
    });
  });

  /**
   * Update return order request
   */
  router.put("/returnOrder/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedReturnOrder = await ReturnOrderControl.updateReturnOrder(
      Number(id),
      req.body
    );
    if (!updatedReturnOrder) {
      return res.send({
        status: 400,
        message: "Invalid return order",
      });
    } else {
      return res.send({
        status: 200,
        message: "Return order updates successfully",
      });
    }
  });

  /**
   * To get return order list
   */
  router.get("/returnOrders", async (req: Request, res: Response) => {
    const returnOrderList = await ReturnOrderControl.getAllReturnOrders();
    if (!!returnOrderList) {
      return res.send({
        status: 200,
        message: "List of returned orders",
        data: returnOrderList,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To get return order  on the id
   */
  router.get("/returnOrder/:id", async (req: Request, res: Response) => {
    const returnOrderId = req.params.id;
    const orderById = await ReturnOrderControl.getReturnOrderById(
      Number(returnOrderId)
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
        message: "Something went wrong",
      });
    }
  });

  /**
   * To delete a return order on id
   */
  router.delete("/returnOrder/:id", async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const returnOrder = await ReturnOrderControl.deleteReturnOrderById(
      Number(orderId)
    );
    if (!!returnOrder) {
      return res.send({
        status: 200,
        message: "Return order  deleted successful",
      });
    } else {
      return res.send({
        status: 400,
        message: "Return order not found",
      });
    }
  });

  return router;
};

export { returnOrderRoute };
