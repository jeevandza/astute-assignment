import { ENUMS } from "@Utils";

/**
 * Common dates updates based on objects created, updated and deleted in the database
 */
export type CommonDatesT = {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

/**
 * Address of a user
 */
export type AddressT = {
  id?: number;
  customerId?: number;
  houseName?: string;
  street?: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
};

/**
 * Structure of a user
 */
export type UserT = CommonDatesT & {
  id: number;
  name: string;
  email: string;
  contact: number;
};

/**
 * User filters
 */
export type GetAllUserFilters = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};

/**
 * Product types schema
 */
export type ProductT = CommonDatesT & {
  id: number;
  name: string;
  description: string;
  type: number;
  quantity: number;
  price: number;
  expiryDate: Date;
  netWeight: string;
  createdBy: number;
  updatedBy?: number;
};

/**
 * Customer types
 */
export type CustomerT = UserT &
  CommonDatesT & {
    customerId: number;
    purchasedProductsId: number;
    returnedOrderId: number;
    address?: AddressT[];
  };

/**
 * Voucher types
 */
export type VoucherOffersT = CommonDatesT & {
  id: number;
  createdByUserID: number;
  expiredAt: Date;
  totalUsage: number;
};

/**
 * Purchased order types
 */
export type PurchaseOrderT = CommonDatesT & {
  id: number;
  customerId: number;
  dateOfOrder: Date;
  orderedItemsId: {
    productId: number;
    totalQuantity: number;
    expectedDeliveryDate: Date;
  }[];
  totalPurchaseAmount: number;
  modeOfPayment: typeof ENUMS.PAYMENT_MODES;
  status: typeof ENUMS.ORDER_TRACKING;
  voucherId?: number;
};

/**
 * Order returned types
 */
export type ReturnedOrders = CommonDatesT & {
  id: number;
  orderId: number;
  dateOfReturn: Date;
  status: typeof ENUMS.RETURN_ORDER_TRACKING;
  returnedProducts: {
    productId: number;
    totalQuantity: number;
    expectedPickupDate: Date;
  }[];
};
