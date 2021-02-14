import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import Product from "../models/Product";
import ProductsRepository from "../repositories/ProductsRepository";

interface Request {
  name: string;
  currentPrice: number;
  sku: string;
  descrition: string;
  shortDescription: string;
  creator_id: string;
}

class CreateProductService {
  public async execute({
    name,
    currentPrice,
    sku,
    descrition,
    shortDescription,
    creator_id,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    // SKU igual
    const findProductInSameSKU = await productsRepository.findBySKU(sku);

    if (findProductInSameSKU) {
      throw new AppError("This product same SKU");
    }

    const product = productsRepository.create({
      name,
      currentPrice,
      sku,
      descrition,
      shortDescription,
      creator_id
    });

    return await productsRepository.save(product)
  }
}

export default CreateProductService;
