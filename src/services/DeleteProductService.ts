import { DeleteResult, getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import ProductsRepository from "../repositories/ProductsRepository";

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError("Produto não encontrado!");
    }

    product.deleted_at = new Date();

    const deletedProduct = await productsRepository.save(product);
    console.log(deletedProduct)
    return;
  }
}

export default DeleteProductService;
