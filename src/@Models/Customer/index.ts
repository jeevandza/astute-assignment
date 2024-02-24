import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "@Database";
import type { AddressT, CustomerT } from "@Utils/Types";

export interface CustomerInput extends Optional<CustomerT, "id" | "userId"> {}
export interface CustomerOutput extends Required<CustomerT> {}

class Customer extends Model<CustomerT, CustomerInput> implements CustomerT {
  public id!: number;
  public userId!: number;
  public purchaseOrderId!: number;
  public returnedOrderId!: number;
  public address!: AddressT[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}



Customer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    purchaseOrderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    returnedOrderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

//   // Define associations
//   Customer.belongsTo(User, {
//     foreignKey: "userId",
//     as: "user",
//   });

//   Customer.belongsTo(PurchaseOrder, {
//     foreignKey: "purchaseOrderId",
//     as: "purchaseOrder",
//   });

//   Customer.belongsTo(ReturnedOrder, {
//     foreignKey: "returnedOrderId",
//     as: "returnedOrder",
//   });

export default Customer;
