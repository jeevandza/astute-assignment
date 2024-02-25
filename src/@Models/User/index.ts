import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "@Database";
import type { UserT } from "@Utils/Types";

export interface UserInput extends Optional<UserT, "id" | "name"> {}
export interface UserOutput extends Required<UserT> {}

class User extends Model<UserT, UserInput> implements UserT {
  public id!: number;
  public name!: string;
  public email!: string;
  public contact!: string;
  public password?: string;
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", 
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default User;
