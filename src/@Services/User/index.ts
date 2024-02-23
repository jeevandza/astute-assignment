import { UserControl } from "@PGQuery";
import { GetAllUserFilters } from "@Utils/Types";
import { UserInput, UserOutput } from "@Models";

const create = (payload: UserInput): Promise<UserOutput> => {
  return UserControl.createUser(payload);
};

export const update = (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  return UserControl.updateUser(id, payload as UserInput);
};

export const getById = (id: number): Promise<UserInput> => {
  return UserControl.getUserByID(id);
};

export const deleteByID = (id: number): Promise<boolean> => {
  return UserControl.deleteUserById(id);
};

export const getAll = (filters: GetAllUserFilters): Promise<UserInput[]> => {
  return UserControl.getAllUsers(filters);
};
