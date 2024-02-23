import User, { UserInput, UserOutput } from "./User/index.ts";
import Product, { ProductInput, ProductOutput } from "./Product/index.ts";
import PurchaserOrder, {
  PurchaseOrderInput,
  PurchaseOrderOutput,
} from "./PurchaseOrder/index.ts";
import ReturnedOrder, {
  ReturnedOrdersInput,
  ReturnedOrderOutput,
} from "./ReturnedOrder/index.ts";

export {
  /**
   * User
   */
  User,
  UserInput,
  UserOutput,
  /**
   * Product
   */
  Product,
  ProductInput,
  ProductOutput,
  /**
   * Purchase order
   */
  PurchaserOrder,
  PurchaseOrderInput,
  PurchaseOrderOutput,
  /**
   * Return order
   */
  ReturnedOrder,
  ReturnedOrdersInput,
  ReturnedOrderOutput,
};
