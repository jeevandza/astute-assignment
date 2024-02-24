import { Router, Request, Response } from "express";
import { UserControl } from "@PGQuery";

const userRoute = () => {
  const router = Router();

  router.post("/users", async (req: Request, res: Response) => {
    const createUser = await UserControl.createUser(req.body);
    console.log( createUser, 'createuse')
    if (!!createUser) {
      res.send({ status: 200, message: "User created" });
    } else {
      res.send({ status: 400, message: "something went wrong" });
    }
  });

  router.get("/user", async (req: Request, res: Response) => {
    return;
  });

  router.get("/user/:id", (req, res) => {
    // TODO logic for retrieving role
  });

  router.put("/user/:id", (req, res) => {
    // TODO logic for updating role
  });

  router.delete("/user/:id", (req, res) => {
    // TODO logic for deleting role
  });

  return router;
};

export { userRoute };
