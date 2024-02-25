import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "@Database";
import type { PurchaseOrderT } from "@Utils/Types";
import { ENUMS } from "@Utils";

export interface PurchaseOrderInput extends Optional<PurchaseOrderT, "id"> {}
export interface PurchaseOrderOutput extends Required<PurchaseOrderT> {}

class PurchaserOrder
  extends Model<PurchaseOrderT, PurchaseOrderInput>
  implements PurchaseOrderT
{
  public id!: number;
  public customerId!: number;
  public dateOfOrder!: Date;
  public orderedItemsId!: {
    productId: number;
    totalQuantity: number;
    expectedDeliveryDate: Date;
  }[];
  public totalPurchaseAmount!: number;
  public modeOfPayment!: string;
  public status!: string;
  public voucherId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}



PurchaserOrder.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      dateOfOrder: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      orderedItemsId: {
        type: DataTypes.JSONB, 
        allowNull: false,
      },
      totalPurchaseAmount: {
        type: DataTypes.FLOAT, 
        allowNull: false,
      },
      modeOfPayment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      voucherId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tableName: "purchaserOrders", 
      sequelize: sequelizeConnection,
      paranoid: true,
    }
  );
  

  
  export default PurchaserOrder;