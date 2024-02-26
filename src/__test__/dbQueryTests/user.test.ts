



// import { test, describe, it } from "node:test";
// import { strict as assert } from "node:assert";

// describe("This will pass", () => {
//   console.log("pass this");
// });
// import {
//   UserControl
// } from '@PGQuery'; 
// import User, { UserInput } from '../../@Models/User';
// import sequelize from "sequelize";
// import {sequelizeConnection} from "@Database"

// describe('User Service Functions', () => {
//   beforeAll(async () => {
//     await sequelizeConnection.authenticate();
//   });

//   afterAll(async () => {
//     await sequelizeConnection.close();
//   });

//   describe('createUser', () => {
//     it('should create a new user', async () => {
//       const payload: UserInput = {
//       };
//       const newUser = await UserControl.createUser(payload)
//       expect(newUser).toBeDefined()
//     });
//   });

//   describe('updateUser', () => {
//     it('should update an existing user', async () => {
//       const userId = 1;
//       const payload: UserInput = {
//       };
//       const updatedUser = await UserControl.updateUser(userId, payload);
//       expect(updatedUser).toBeDefined();
//     });

//     it('should throw an error if user ID does not exist', async () => {
//       // Provide a non-existing user ID
//       const nonExistingUserId = 9999;
//       const payload: UserInput = {
//       };
//       await expect( await UserControl.updateUser(nonExistingUserId, payload)).rejects.toThrow('Id not found');
//     });
//   });

//   describe('getUserByID', () => {
//     it('should retrieve an existing user by ID', async () => {
//       const userId = 1;
//       const user = await UserControl.getUserByID(userId);
//       expect(user).toBeDefined();
//     });

//     it('should throw an error if user ID does not exist', async () => {
//       const nonExistingUserId = 9999;
//       await expect(await UserControl.getUserByID(nonExistingUserId)).rejects.toThrow('User not found');
//     });
//   });

// });
// function beforeAll(arg0: () => Promise<void>) {
//   throw new Error("Function not implemented.");
// }

// function afterAll(arg0: () => Promise<void>) {
//   throw new Error("Function not implemented.");
// }

// function expect(newUser: User) {
//   throw new Error("Function not implemented.");
// }

