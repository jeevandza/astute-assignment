import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "@Database";
import type { ProductT } from "@Utils/Types";

export interface ProductInput extends Optional<ProductT, "id" | "name"> {}
export interface ProductOutput extends Required<ProductT> {}

class Product extends Model<ProductT, ProductInput> implements ProductT {
  public id!: number;
  public name!: string;
  public description!: string;
  public typeOfProduct!: string;
  public quantity!: number;
  public price!: number;
  public expiryDate!: Date;
  public netWeight!: string;
  public createdBy!: number;
  public updatedBy!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    netWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "products", 
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Product;
