import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "@Database";
import type { ReturnedOrders } from "@Utils/Types";
import { ENUMS } from "@Utils";

export interface ReturnedOrdersInput extends Optional<ReturnedOrders, "id"> {}
export interface ReturnedOrderOutput extends Required<ReturnedOrders> {}

class ReturnedOrder
  extends Model<ReturnedOrders, ReturnedOrdersInput>
  implements ReturnedOrders
{
  public id!: number;
  public orderId!: number;
  public dateOfReturn!: Date;
  public status!: typeof ENUMS.RETURN_ORDER_TRACKING;
  public returnedProducts!: {
    productId: number;
    totalQuantity: number;
    expectedPickupDate: Date;
  }[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ReturnedOrder.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    dateOfReturn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    returnedProducts: {
      type: DataTypes.JSONB, 
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default ReturnedOrder;
