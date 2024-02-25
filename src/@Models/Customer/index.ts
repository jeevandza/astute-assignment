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
      allowNull: true,
    },
    returnedOrderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "customers", 
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);


export default Customer;
