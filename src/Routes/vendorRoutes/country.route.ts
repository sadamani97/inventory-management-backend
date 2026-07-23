import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCountrySchema } from "../../Valitations/vendorValidation/vendor.validation.js";
import countriesController from "../../Controllers/vendorControllers/countries.controller.js";

const router = Router();

router.post("/", validate(createCountrySchema), countriesController.create);
router.get("/", countriesController.findAll);
router.get("/:id", countriesController.FindById);
router.put("/:id", countriesController.Update);
router.delete("/:id", countriesController.Delete);

export default router;
