import { getCustomRepository } from "typeorm";
import Product from "../models/Product";
import ProductsRepository from "../repositories/ProductsRepository";

interface Request {
  name: string;
  currentPrice: number;
  sku: string;
  descrition: string;
  shortDescription: string;
}

class CreateProductService {
  public async execute({
    name,
    currentPrice,
    sku,
    descrition,
    shortDescription,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    // SKU igual
    const findProductInSameSKU = await productsRepository.findBySKU(sku);

    if (findProductInSameSKU) {
      throw Error("This product same SKU");
    }

    const product = productsRepository.create({
      name,
      currentPrice,
      sku,
      descrition,
      shortDescription,
    });

    return await productsRepository.save(product)
  }
}

export default CreateProductService;
