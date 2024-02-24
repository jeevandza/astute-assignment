import { UserControl } from "@PGQuery";
import { GetAllUserFilters } from "@Utils/Types";
import { UserInput, UserOutput } from "@Models";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const now = new Date();
  const payloadWithTimestamps: UserInput = {
    ...payload,
    createdAt: now,
    updatedAt: now,
  };

  return UserControl.createUser(payloadWithTimestamps);
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const now = new Date();
  const payloadWithTimestamps: Partial<UserInput> = {
    ...payload,
    updatedAt: now,
  };

  return UserControl.updateUser(id, payloadWithTimestamps as UserInput);
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
