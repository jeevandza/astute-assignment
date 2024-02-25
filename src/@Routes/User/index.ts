import { Router, Request, Response } from "express";
import { UserControl } from "@PGQuery";
import { Helpers } from "@Utils";

const userRoute = () => {
  const router = Router();

  /**
   * To create new user
   */
  router.post("/users", async (req: Request, res: Response) => {
    const { password, email, name, contact } = req.body;
    const hashUserPassword = await Helpers.hashPassword(password);

    const createUser = await UserControl.createUser({
      password: hashUserPassword,
      email,
      name,
      contact
    });
    if (!!createUser) {
      res.send({ status: 200, message: "User created" });
    } else {
      res.send({ status: 400, message: "something went wrong" });
    }
  });

  /**
   * To update a user based on id
   */
  router.put("/user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateUser = await UserControl.updateUser(Number(id), req.body);
    if (!!updateUser) {
      res.send({ status: 200, message: "User updated" });
    } else {
      res.send({ status: 400, message: "Something went wrong" });
    }
  });

  /**
   * To get users list
   */
  router.get("/users", async (req: Request, res: Response) => {
    const userList = await UserControl.getAllUsers();
    if (!!userList) {
      return res.send({
        status: 200,
        message: "List of users",
        data: userList,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To get user based on the id
   */
  router.get("/user/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userById = await UserControl.getUserByID(Number(userId));
    if (!!userById) {
      return res.send({
        status: 200,
        message: "Fetch successful",
        data: userById,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To delete a user based on id
   */
  router.delete("/user/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userById = await UserControl.deleteUserById(Number(userId));
    if (!!userById) {
      return res.send({
        status: 200,
        message: "User delete successful",
      });
    } else {
      return res.send({
        status: 400,
        message: "User not found",
      });
    }
  });

  return router;
};

export { userRoute };
