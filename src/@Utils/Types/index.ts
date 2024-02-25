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
 * Pagination keys to show data 10 per page to prevent load
 */
export type PaginationKeys = {
  totalCount: number;
  countPerPage: number;
  totalPages: number;
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
  contact: string;
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
  typeOfProduct: string;
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
export type CustomerT = CommonDatesT & {
  id: number;
  userId: number;
  purchaseOrderId?: number;
  returnedOrderId?: number;
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
  modeOfPayment: string;
  status:string;
  voucherId?: number;
};

/**
 * Filter options to list purchase orders
 */
export type PurchaseOrderFilters = {
  customerId?: number;
  status?: typeof ENUMS.ORDER_TRACKING;
};

/**
 * Order returned types
 */
export type ReturnedOrders = CommonDatesT & {
  id: number;
  orderId: number;
  dateOfReturn: Date;
  status: string;
  returnedProducts: {
    productId: number;
    totalQuantity: number;
    expectedPickupDate: Date;
  }[];
};
