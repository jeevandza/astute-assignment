import { Router, Request, Response } from "express";
import { ProductControl } from "@PGQuery";

const productRoute = () => {
  const router = Router();

  /**
   * To create new product
   */
  router.post("/products", async (req: Request, res: Response) => {
    const createProduct = await ProductControl.createProduct(req.body);

    if (!!createProduct) {
      res.send({ status: 200, message: "Product created" });
    } else {
      res.send({ status: 400, message: "something went wrong" });
    }
  });

  /**
   * To update a product based on id
   */
  router.put("/product/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateProduct = await ProductControl.updateProduct(
      Number(id),
      req.body
    );
    if (!!updateProduct) {
      res.send({ status: 200, message: "Product updated" });
    } else {
      res.send({ status: 400, message: "Something went wrong" });
    }
  });

  /**
   * To get the list of products
   */
  router.get("/products", async (req: Request, res: Response) => {
    const productList = await ProductControl.getAllProduct();
    if (!!productList) {
      return res.send({
        status: 200,
        message: "List of products",
        data: productList,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To get product by given id
   */
  router.get("/product/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productById = await ProductControl.getProductById(Number(productId));
    if (!!productById) {
      return res.send({
        status: 200,
        message: "Fetch successful",
        data: productById,
      });
    } else {
      return res.send({
        status: 400,
        message: "Fetch failed",
      });
    }
  });

  /**
   * To delete a product as per given id
   */
  router.delete("/product/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productById = await ProductControl.deleteAPurchaseOrder(
      Number(productId)
    );
    if (!!productById) {
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

export { productRoute };
