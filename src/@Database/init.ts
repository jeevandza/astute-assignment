import {
  User,
  Customer,
  Product,
  PurchaserOrder,
  ReturnedOrder,
} from "@Models";

const isDevelopment = process.env.NODE_ENV === "development";

const dbInit = () => {
  User.sync({ alter: isDevelopment });
  Customer.sync({ alter: isDevelopment });
  Product.sync({ alter: isDevelopment });
  PurchaserOrder.sync({ alter: isDevelopment });
  ReturnedOrder.sync({ alter: isDevelopment });
};

export default dbInit;
