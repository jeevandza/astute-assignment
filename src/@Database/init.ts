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
      User.sync({ alter: isDevelopment, force:true }),
      Customer.sync({ alter: isDevelopment, force:true }),
      Product.sync({ alter: isDevelopment }),
      PurchaserOrder.sync({ alter: isDevelopment }),
      ReturnedOrder.sync({ alter: isDevelopment }),
    ]);
    console.log("Database synchronization complete");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

export default dbInit;
