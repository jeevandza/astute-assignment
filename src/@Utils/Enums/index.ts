/**
 * Payment method enums
 */
export const PAYMENT_MODES = {
    UPI: "upi",
    CASH_ON_DELIVERY: "cash-on-delivery",
    VALET_PAYMENT: "valet-payment",
  } as const;
  
  /**
   * Ordered tracking status
   */
  export const ORDER_TRACKING = {
    PROCESSING: "processing",
    DECLINED: "declined",
    DESPATCHED: "despatched",
    DELIVERED: "delivered",
    RETURNED:"returned"
  } as const;
  
  /**
   * Return order tracking status
   */
  export const RETURN_ORDER_TRACKING = {
    PROCESSING: "processing",
    OUT_FOR_PICKUP: "out-for-pickup",
    RETURNED: "returned-completed",
  } as const;
  