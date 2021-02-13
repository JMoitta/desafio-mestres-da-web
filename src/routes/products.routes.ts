import { Router } from "express";
import { getCustomRepository } from "typeorm";
import Product from "../models/Product";
import ProductsRepository from "../repositories/ProductsRepository";
import CreateProductService from "../services/CreateProductService";

const productsRouter = Router();

productsRouter.get("/",  async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products: Product[] = await productsRepository.find();

  return response.json(products);
});

productsRouter.post("/", async (request, response) => {
  try {
    const {
      name,
      currentPrice,
      sku,
      descrition,
      shortDescription,
      creator_id
    } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      currentPrice,
      sku,
      descrition,
      shortDescription,creator_id
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;
