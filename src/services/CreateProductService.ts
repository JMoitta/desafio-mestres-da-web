import { getCustomRepository, getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Product from "../models/Product";
import ProductVariation from "../models/ProductVariation";
import VariableProduct from "../models/VariableProduct";
import ProductsRepository from "../repositories/ProductsRepository";

interface VariationRequest {
  description: string;
  value: number;
  variation_id: string;
}

interface ProductVariationRequest {
  currentPrice: number;
  sku: string;
  stock: number;
  description: string;
  shortDescription: string;
  variations?: VariationRequest[];
}

interface Request {
  name: string;
  currentPrice: number;
  sku: string;
  stock: number;
  isVariable: boolean;
  description: string;
  shortDescription: string;
  creator_id: string;
  productVariations?: ProductVariationRequest[];
}

class CreateProductService {
  public async execute({
    name,
    currentPrice,
    sku,
    stock,
    isVariable,
    description,
    shortDescription,
    creator_id,
    productVariations = [],
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const findProductInSameSKU = await productsRepository.findBySKU(sku);

    if (findProductInSameSKU) {
      throw new AppError("This product same SKU");
    }

    let product = productsRepository.create({
      name,
      currentPrice,
      sku,
      stock,
      isVariable,
      description,
      shortDescription,
      creator_id,
    });

    product = await productsRepository.save(product);

    if (isVariable) {
      const variableProductRepository = getRepository(VariableProduct);
      const productVariationsRepository = getRepository(ProductVariation);
      const variableProducts = productVariations.map(
        ({
          currentPrice,
          sku,
          stock,
          description,
          shortDescription,
          variations = [],
        }) => {
          const productVariations = variations.map(
            ({ description, value, variation_id }) => {
              return productVariationsRepository.create({
                description,
                value,
                variation_id,
                creator_id,
              });
            }
          );

          const variableProduct = variableProductRepository.create({
            currentPrice,
            sku,
            stock,
            description,
            shortDescription,
            product_origin_id: product.id,
            creator_id,
            productVariations,
          });

          return variableProduct;
        }
      );

      const variableProductsSaved = await variableProductRepository.save(
        variableProducts
      );

      variableProductsSaved.forEach(async (variableProduct) => {
        const productVariations = variableProduct.productVariations.map(
          (productVariation) => {
            productVariation.variable_product_id = variableProduct.id;
            return productVariation;
          }
        );

        variableProduct.productVariations = await productVariationsRepository.save(
          productVariations
        );
      });

      product.variableProducts = variableProductsSaved;
    }

    return product;
  }
}

export default CreateProductService;
