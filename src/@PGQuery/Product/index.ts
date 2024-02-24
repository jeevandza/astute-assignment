import { Op } from "sequelize";
import { Product, ProductInput, ProductOutput } from "@Models";

/**
 * Create new product
 */
const createProduct = async (payload: ProductInput): Promise<ProductOutput> => {
  const newProduct = await Product.create(payload);
  return newProduct;
};

/**
 * Update new product
 */
const updateProduct = async (
  id: number,
  payload: ProductInput
): Promise<ProductOutput> => {
  const findProduct = await Product.findByPk(id);
  if (!findProduct) {
    throw new Error("Product not found");
  }
  const updateProduct = findProduct.update(payload);
  return updateProduct;
};

/**
 * product  by id
 */

const getProductById = async (id: number): Promise<ProductOutput> => {
  const findProduct = await Product.findByPk(id);
  if (!findProduct) {
    throw new Error("Purchase order not found");
  }
  return findProduct;
};

/**
 * Delete a product
 */

const deleteAPurchaseOrder = async (id: number): Promise<Boolean> => {
  const checkStatusOfPurchaseOrder = await Product.findByPk(id);
  if (!checkStatusOfPurchaseOrder) {
    throw new Error("Product not found");
  }
  const removeProduct = await Product.destroy({
    where: { id },
  });
  return !!removeProduct;
};

/**
 * Get all product
 */

const getAllProduct = async (): Promise<ProductOutput[]> => {
  return await Product.findAll({
    where: {},
  });
};

export {
  createProduct,
  updateProduct,
  getProductById,
  deleteAPurchaseOrder,
  getAllProduct,
};
