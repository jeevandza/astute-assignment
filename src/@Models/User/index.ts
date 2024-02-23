import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "@Database";

interface UserI {
  id: number;
  name: string;
  email: string;
  contact: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserI, "id" | "name"> {}
export interface UserOutput extends Required<UserI> {}

class User extends Model<UserI, UserInput> implements UserI {
  public id!: number;
  public name!: string;
  public email!: string;
  public contact!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default User;
