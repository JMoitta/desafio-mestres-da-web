import { Router } from "express";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import Product from "../models/Product";
import ProductsRepository from "../repositories/ProductsRepository";
import CreateProductService from "../services/CreateProductService";

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get("/",  async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products: Product[] = await productsRepository.find();

  return response.json(products);
});

productsRouter.post("/", async (request, response) => {
  const {
    name,
    currentPrice,
    sku,
    descrition,
    shortDescription
  } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    currentPrice,
    sku,
    descrition,
    shortDescription,
    creator_id:request.user.id,
  });

  return response.json(product);
});

export default productsRouter;
