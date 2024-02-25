import {
  User,
  Customer,
  Product,
  PurchaserOrder,
  ReturnedOrder,
} from "@Models";

const isDevelopment = process.env.NODE_ENV === "development";

const dbInit = async () => {
  try {
    await Promise.all([
      User.sync({ alter: isDevelopment}),
      Customer.sync({ alter: isDevelopment }),
      Product.sync({ alter: isDevelopment}),
      PurchaserOrder.sync({ alter: isDevelopment }),
      ReturnedOrder.sync({ alter: isDevelopment }),
    ]);
    console.log("Database synchronization complete");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

export default dbInit;
