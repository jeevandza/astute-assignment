import { Op } from "sequelize";
import { User, UserInput, UserOutput, Customer } from "@Models";
import { GetAllUserFilters } from "@Utils/Types";

/**
 * To create new user
 */
const createUser = async (payload: UserInput): Promise<User> => {
  const newUser = await User.create(payload);
  return newUser;
};

/**
 * Update user based on the ID
 */
const updateUser = async (
  id: number,
  payload: UserInput
): Promise<User> => {
  const findUser = await User.findByPk(id);
  if (!findUser) {
    throw new Error("Id not found");
  }
  const updateUser = await (findUser as User).update(payload);
  return updateUser;
};

/**
 * Get user by Id
 */

const getUserByID = async (id: number): Promise<User> => {
  const findUser = await User.findByPk(id);
  if (!findUser) {
    throw new Error("User not found");
  }
  return findUser;
};

/**
 * Delete user by id
 */

const deleteUserById = async (id: number): Promise<boolean> => {
  const deleteUser = await User.destroy({
    where: { id },
  });
  const findCustomerBasedOnUser = await Customer.findOne({
    where: { userId: id },
  });

  /**
   * If the customer exists
   */
  if (findCustomerBasedOnUser) {
    await Customer.destroy({
      where: { userId: id },
    });
  }

  return !!deleteUser;
};

/**
 * To get all the list of users along with filters
 */
const getAllUsers = async (
  filters?: GetAllUserFilters
): Promise<User[]> => {
  const whereClause: any = {};

  if (filters && filters.isDeleted) {
    whereClause.deletedAt = { [Op.not]: null };
  }

  if (filters?.isDeleted || filters?.includeDeleted) {
    whereClause.paranoid = false;
  }
  return User.findAll({
    where: whereClause,
  });
};

export { createUser, updateUser, getUserByID, deleteUserById, getAllUsers };
