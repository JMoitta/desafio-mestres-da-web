import { getRepository } from "typeorm";
import Variation from "../models/Variation";
import variationsRouter from "../routes/variations.routes";

interface Request {
  label: string;
  description: string;
  type: string;
  creator_id: string;
}

class CreateVariationService {
  public async execute({
    label,
    description,
    type,
    creator_id,
  }: Request): Promise<Variation> {
    const variationsRepository = getRepository(Variation);

    const variation = variationsRepository.create({
      label,
      description,
      type,
      creator_id,
    });

    return await variationsRepository.save(variation);
  }
}

export default CreateVariationService;
