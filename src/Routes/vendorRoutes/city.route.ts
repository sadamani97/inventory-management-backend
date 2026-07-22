import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCitySchema } from "../../Valitations/vendorValidation/vendor.validation.js";
import cityController from "../../Controllers/vendorControllers/city.controller.js";

const router = Router();

router.post("/", validate(createCitySchema), cityController.create);
router.get("/", cityController.findAll);
router.get("/:id", cityController.FindById);
router.put("/:id", cityController.Update);
router.delete("/:id", cityController.Delete);

export default router;
