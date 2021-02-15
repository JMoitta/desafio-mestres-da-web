import { Router } from "express";
import { getRepository } from "typeorm";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import Variation from "../models/Variation";
import CreateVariationService from "../services/CreateVariationService";

const variationsRouter = Router();

variationsRouter.use(ensureAuthenticated);

variationsRouter.get("/", async (request, response) => {
  const variationsRepository = getRepository(Variation);
  const variations = await variationsRepository.find();

  return response.json(variations);
});

variationsRouter.post("/", async (request, response) => {
  const {label, description, type} = request.body;

  const createVariation = new CreateVariationService();
  const variation = await createVariation.execute({
    label,
    description,
    type,
    creator_id: request.user.id
  });
  
  return response.json(variation);
});

export default variationsRouter;
