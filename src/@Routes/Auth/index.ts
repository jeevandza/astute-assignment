import { User } from "@Models";
import { UserControl } from "@PGQuery";
import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Helpers } from "@Utils";

const authRoute = () => {
  const router = Router();

  router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      const checkPassword = await Helpers.verifyPassword(
        password,
        findUser.dataValues.password!
      );

      if (checkPassword) {
        const token = jwt.sign(
          {
            id: findUser.id,
            name: findUser.name,
          },
          process.env.JWT_SECRET_KET!,
          {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          }
        );
        return res.send({
          status: 200,
          msg: "Login success",
          data: findUser,
          access_token: token,
        });
      }
      return res.status(400).send({ msg: "Invalid password" });
    } else {
      return res.status(400).send({ msg: "Invalid credentials" });
    }
  });

  router.post("/signup", async (req: Request, res: Response) => {
    const { name, password, email, contact } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      return res.send({
        status: 400,
        msg: "User already exists",
      });
    } else {
      const hashUserPassword = await Helpers.hashPassword(password);
      const newUser = await UserControl.createUser({
        name,
        password: hashUserPassword,
        email,
        contact,
      });
      res.send({
        status: 200,
        msg: "User created successfully",
        user: newUser,
      });
    }
  });

  return router;
};

export { authRoute };
