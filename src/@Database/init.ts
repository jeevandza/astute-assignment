import { User } from "@Models";

const isDevelopment = process.env.NODE_ENV === "development";

const dbInit = () => {
  User.sync({ alter: isDevelopment });
};


export default dbInit;